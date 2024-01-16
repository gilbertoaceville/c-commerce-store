import { ALL, productCategories } from "@/base/utils/constants/const";
import locale from "@/components/section/admin/form/locale/en.json";
import { AddProductCategoryProps, CategoryInputProps } from "../../types";
import clsx from "clsx";

export default function AddProductCategory({
  category,
  setCustomCategory,
}: AddProductCategoryProps) {
  function CategoryInput({
    selected,
    icon: Icon,
    label,
    onClick,
  }: CategoryInputProps) {
    return (
      <div
        className={clsx(
          "rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-500 border-primary transition cursor-pointer",
          selected ? "border-slate-500" : "border-primary"
        )}
        onClick={() => onClick(label)}
      >
        <Icon size={30} />
        <div className="font-medium">{label}</div>
      </div>
    );
  }

  return (
    <div className="w-full font-medium">
      <div className="mb-2 font-semibold">{locale.categoryText}</div>
      <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] gap-3 overflow-y-auto">
        {productCategories.map((cat, index) => {
          if (cat.label === ALL) {
            return null;
          }

          return (
            <div key={`${cat.label}-${index}`} className="col-span">
              <CategoryInput
                onClick={(category) =>
                  setCustomCategory?.("category", category)
                }
                selected={category === cat.label}
                label={cat.label}
                icon={cat.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
