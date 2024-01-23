import { getUser } from "@/base/actions/getUser";
import prisma from "@/base/lib/prisma/client";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "User is not found",
      },
      { status: 404 }
    );
  }

  const { comment, rating, product, userId } = await req.json();

  // users can only post a review/rating if orders are delivered
  // find the particular product that is to be reviewed and check order status
  const isOrderDelivered = user.orders.some(
    (order) =>
      order.products.find((prod) => prod.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  //user can only review/rate a product once
  const isReviewed = product.reviews.find(
    (review: Review) => review.userId === user.id
  );

  if (isReviewed || !isOrderDelivered) {
    return NextResponse.json(
      {
        message: "You can only review a product once",
      },
      { status: 403 }
    );
  }

  const review = await prisma.review.create({
    data: {
      comment,
      rating,
      userId,
      productId: product.id,
    },
  });

  return NextResponse.json(review);
}
