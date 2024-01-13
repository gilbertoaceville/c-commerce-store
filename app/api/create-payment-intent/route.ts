import Stripe from "stripe";
import prisma from "@/base/lib/prisma/client";
import { CartEntity } from "@/base/types/cart";
import { getUser } from "@/base/actions/getUser";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

function calculateTotalPrice(products: CartEntity[]) {
  const totalPrice = products.reduce((acc, curr) => {
    const totalAmount = (curr.quantity ?? 0) * curr.price;
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

  const totalPrice = calculateTotalPrice(products) * 100; //multiple by a 100 since stripe takes payments in cents

  // order data to be saved in mongodb
  const orderData = {
    user: { connect: { id: user.id } },
    amount: totalPrice,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products,
  };

  if(payment_intent_id) {
    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
    })

    // create products order
  }
}
