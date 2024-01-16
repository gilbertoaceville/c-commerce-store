"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";

import Subject from "@/components/element/subject/subject";
import withProtector from "@/components/layout/admin/hoc/with-protector";
import FormContainer from "@/components/section/form/container";
import Input from "@/components/element/input/input";
import Checkbox from "@/components/element/input/checkbox";
import Button from "@/components/element/button/button";
import { AttributesEntity, ProductsEntity } from "@/base/types/product";
import fireBaseApp from "@/base/lib/firebase/config";

import locale from "../locale/en.json";
import AddProductCategory from "./components/category/category";
import AddProductAttributes from "./components/attributes/attributes";
import { AttributeImageType } from "./types";

function AddProductsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [productAttributes, setProductAttributes] = useState<
    AttributeImageType[]
  >([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      inStock: false,
      stock: "",
      attributes: [],
    },
  });

  const category = watch("category");

  /**
   *
   * @param id refers to form value to be updated
   * @param value refers to value that updates the form value
   */
  function setCustomValue(id: string, value: any) {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  // basically adds attribute selected (see color.tsx) to state
  // form value (attribute) gets updated with this attributes via "setCustomValue"
  const addAttributeToState = useCallback((attribute: AttributeImageType) => {
    setProductAttributes((prevState) => {
      return prevState ? [...prevState, attribute] : [attribute];
    });
  }, []);

  // basically removes attribute selected (see color.tsx) to state
  // form value (attribute) gets updated with this attributes via "setCustomValue"
  const removeAttributeFromState = useCallback(
    (attribute: AttributeImageType) => {
      setProductAttributes((prevState) => {
        return prevState
          ? prevState?.filter((item) => item.color !== attribute.color)
          : prevState;
      });
    },
    []
  );

  // upload image to firebase storage
  async function handleImageUploads(data: FieldValues) {
    toast(locale.createProductText, { id: "create-product" });

    let uploadedAttributes: AttributesEntity[] = [];
    try {
      for (const attribute of data.attributes) {
        if (attribute?.image) {
          const id = uuidv4();
          const fileName = `${id}-${attribute.image.name}`;

          const storage = getStorage(fireBaseApp);
          const storageRef = ref(storage, `products/${fileName}`);

          const uploadTask = uploadBytesResumable(storageRef, attribute.image);

          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                }
              },
              (error) => {
                console.error(`Error uploading images: ${error}`);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                    console.log("File available at", downloadURL);

                    uploadedAttributes.push({
                      ...attribute,
                      image: downloadURL,
                    });

                    resolve();
                  })
                  .catch((error) => {
                    console.error(`Error getting download URL: ${error}`);
                    reject(error);
                  });
              }
            );
          });
        }
      }
      return uploadedAttributes;
    } catch (error) {
      console.error(`Error uploading images: ${error}`);
      setIsLoading(false);
      return toast.error(locale.imageUploadError);
    }
  }

  async function onSubmit(data: ProductsEntity | FieldValues) {
    setIsLoading(true);

    if (!data.category) {
      setIsLoading(false);
      return toast.error(locale.categoryTextError);
    }

    if (!data.attributes || data.attributes.length === 0) {
      setIsLoading(false);
      return toast.error(locale.attributesTextError);
    }

    try {
      // upload images to firebase
      const uploadedAttributes = await handleImageUploads(data);
      const product = { ...data, attributes: uploadedAttributes };

      // push product to db
      const response = await axios.post("/api/product", product);
      if (response.status >= 200 && response.status < 300) {
        setIsProductCreated(true);
        toast.success(locale.productCreatedText, { id: "create-product" });
        router.refresh();
      }else {
        console.log(response)
      }
    } catch (error) {
      console.error(locale.productCreatedError, error);
      toast.error(locale.productCreatedError, { id: "create-product" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setCustomValue("attributes", productAttributes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productAttributes]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setIsProductCreated(false);
      setProductAttributes([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductCreated]);

  const buttonText = isLoading ? locale.loading : locale.addProduct;

  return (
    <FormContainer>
      <Subject title={locale.addAProduct} />
      <Input
        id="name"
        label="Name"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="brand"
        label="Brand"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="price"
        label="Price"
        required
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="stock"
        label="Total Stock Available"
        required
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="description"
        label="Description"
        required
        type="textarea"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Checkbox id="inStock" register={register} label={locale.checkboxLabel} />
      <AddProductCategory
        category={category}
        setCustomCategory={setCustomValue}
      />
      <AddProductAttributes
        isProductCreated={isProductCreated}
        addAttributeToState={addAttributeToState}
        removeAttributeFromState={removeAttributeFromState}
      />
      <Button
        label={buttonText}
        type="submit"
        onClick={handleSubmit(onSubmit)}
      />
    </FormContainer>
  );
}

export default withProtector(AddProductsForm);
