import { ReviewsEntity } from "@/base/types/product";

export function getProductRating(reviews: ReviewsEntity[]) {
  const reviewsRating = reviews?.reduce((acc, curr) => {
    return curr?.rating + acc;
  }, 0);

  const reviewLength = reviews?.length;
  const reviewTextEnd = reviewLength === 1 ? "" : "s";

  return {
    productRating: reviewsRating / reviews?.length,
    reviewLength,
    reviewTextEnd,
  };
}
