import { useEffect, useState } from "react";

import Button from "@/components/element/button/button";
import locale from "@/components/section/admin/form/locale/en.json";

import { AddAttributeProps } from "../../types";
import AddImageToAttribute from "../add-image/add-image-attribute";

export default function AddProductColor({
  attribute,
  isProductCreated,
  addAttributeToState,
  removeAttributeFromState,
}: AddAttributeProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  /**
   * 
   * @param file 
   * @function handleFileChange selects file from device 
   * updates the product attributes state (see add-product.tsx) with file selected
   * for the attribute property
   */
  function handleFileChange(file: File) {
    setFile(file);
    addAttributeToState({ ...attribute, image: file });
  }

  function removeFile() {
    setFile(null);
    removeAttributeFromState(attribute);
  }

  // if checkbox is unselected, remove the selected file from device
  // remove attribute added to state (see add-product.tsx)
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsSelected(e.target.checked);

    if (!e.target.checked) {
      removeFile();
    }
  }

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  return (
    <div className="grid grid-cols-1 overflow-y-auto border-b-[1.2px] border-transparent items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <input
          id={attribute.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleInputChange}
          className="cursor-pointer"
        />
        <label htmlFor={attribute.color} className="cursor-pointer font-medium">
          {attribute.color}
        </label>
        <div
          className={`w-5 h-5 rounded border-slate-500 bg-[${attribute.colorCode}]`}
        />
      </div>
      <>
        {!file && <div className="text-center col-span-2">
          <AddImageToAttribute
            attribute={attribute}
            isInputChecked={isSelected && !file}
            handleFileChange={handleFileChange}
          />
        </div>}

        {file && (
          <div className="flex flex-row gap-2 text-sm  col-span-2 items-center justify-between">
            <p>{file.name}</p>
            <div className="w-[70px]">
              <Button label={locale.cancel} small outline onClick={removeFile} />
            </div>
          </div>
        )}
      </>
    </div>
  );
}
