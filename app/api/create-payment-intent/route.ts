import Stripe from "stripe";
import prisma from "@/base/lib/prisma/client";
import { CartEntity } from "@/base/types/cart";
import { getUser } from "@/base/actions/getUser";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

function calculateTotalPrice(products: CartEntity[]) {
  const totalPrice = products?.reduce((acc, curr) => {
    const totalAmount = Number(curr.quantity ?? 0) * Number(curr.price);
    return acc + totalAmount;
  }, 0);

  return totalPrice;
}

export async function POST(req: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { products, payment_intent_id } = body;

  const totalPrice =  Math.round(calculateTotalPrice(products) *100); //multiple by a 100 since stripe takes payments in cents

  // order data to be saved in mongodb
  const orderData = {
    user: { connect: { id: user?.id } },
    amount: totalPrice,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products,
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: totalPrice,
        }
      );

      // update order
      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: {
            paymentIntentId: payment_intent_id,
          },
        }),
        prisma.order.update({
          where: {
            paymentIntentId: payment_intent_id,
          },
          data: {
            amount: totalPrice,
            products,
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid payment intent" },
          { status: 400 }
        );
      }

      return NextResponse.json({ paymentIntent: updatedIntent });
    }
  } else {
    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    // create products order
    orderData.paymentIntentId = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }
}
