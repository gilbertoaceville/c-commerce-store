import { CurrentUserProps } from "@/base/types/user";
import { Order, Product, Review } from "@prisma/client";

export interface AddRatingProps extends CurrentUserProps<{ orders?: Order[] }> {
  product: Product & {
    reviews: Review[];
  };
}
