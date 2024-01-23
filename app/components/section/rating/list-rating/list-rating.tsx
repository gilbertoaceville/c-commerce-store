import moment from "moment";
import Subject from "@/components/element/subject/subject";

import locale from "./locale/en.json";
import { ListRatingProps } from "./types";
import { Rating } from "@mui/material";
import Avatar from "@/components/element/avatar/avatar";

export default function ListRating({ product }: ListRatingProps) {
  if (!product.reviews || product.reviews.length === 0) return null;
  return (
    <div>
      <Subject title={locale.title} />
      <div className="text-sm mt-2">
        {(product.reviews || []).map((review, i) => (
          <div key={`${review.id}-${i}`} className="max-w-[300px]">
            <div className="flex gap-2 items-center">
              <Avatar src={review.user.image} />
              <div className="font-semibold">{review.user.name}</div>
              <div className="font-light">
                {moment(review.createdDate).fromNow()}
              </div>
            </div>
            <div className="mt-2">
              <Rating value={review.rating} readOnly />
              <div className="ml-1">{review.comment}</div>
              <hr className="my-4 border-transparent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
