import { ReviewsEntity } from "@/base/types/product";

export function getProductRating(reviews: ReviewsEntity[]) {
  const reviewsRating = reviews?.reduce((acc, curr) => {
    return curr?.rating + acc;
  }, 0);

  console.log(reviewsRating);

  return reviewsRating / reviews?.length;
}
