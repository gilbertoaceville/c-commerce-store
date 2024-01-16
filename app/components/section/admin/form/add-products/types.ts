import { AttributesEntity } from "@/base/types/product";
import { IconType } from "react-icons";

export interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (label: string) => void;
}

export interface AddProductCategoryProps {
  category?: string;
  setCustomCategory?: (id: string, category: string) => void;
}

export interface AttributeImageType extends Omit<AttributesEntity, "image"> {
  image: File | null;
}

export interface AddProductAttributeProps {
  addAttributeToState: (attribute: AttributeImageType) => void;
  removeAttributeFromState: (attribute: AttributeImageType) => void;
  isProductCreated: boolean;
}

export interface AddAttributeProps
  extends Omit<AddImageToAttributeProps, "handleFileChange">, AddProductAttributeProps {}

export interface AddImageToAttributeProps {
  attribute: AttributeImageType;
  isInputChecked?: boolean;
  handleFileChange: (file: File) => void;
}
