import { productAttributes } from "@/base/utils/constants/const";
import locale from "@/components/section/admin/form/locale/en.json";
import AddProductColor from "../color/color";
import { AddProductAttributeProps } from "../../types";

export default function AddProductAttributes({
  addAttributeToState,
  removeAttributeFromState,
  isProductCreated,
}: AddProductAttributeProps) {
  return (
    <div className="w-full flex flex-col flex-wrap gap-4">
      <div>
        <div className="font-bold">{locale.attributesTitle}</div>
        <div className="text-sm text-rose-400">{locale.attributesText}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {productAttributes.map((attribute, index) => {
          return (
            <AddProductColor
              key={`${attribute.color}-${index}`}
              attribute={attribute}
              addAttributeToState={addAttributeToState}
              removeAttributeFromState={removeAttributeFromState}
              isProductCreated={isProductCreated}
            />
          );
        })}
      </div>
    </div>
  );
}
