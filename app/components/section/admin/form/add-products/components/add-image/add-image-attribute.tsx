"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

import locale from "@/components/section/admin/form/locale/en.json";

import { AddImageToAttributeProps } from "../../types";

export default function AddImageToAttribute({
  attribute,
  isInputChecked,
  handleFileChange,
}: AddImageToAttributeProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if input is checked (or in this case not checked due to "!")
  // user cannot drop file or select file from device
  // toast error message to display intention
  function handleClick() {
    if (!isInputChecked) {
      toast.error(`${locale.selectboxText} for ${attribute.color}`, { id: "select-checkbox" });
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".webp", ".jpeg"] },
    disabled: !isInputChecked,
  });
  return (
    <div onClick={handleClick}>
      <div
        {...getRootProps()}
        className="border-2 border-slate-500 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-500 flex items-center justify-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>{locale.dropText}</p> : <p>+ {attribute.color}</p>}
      </div>
    </div>
  );
}
