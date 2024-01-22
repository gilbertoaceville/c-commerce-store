import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

import NotFoundData from "@/components/element/not-found/not-found";

import { IWithProtector } from "./types";

export default function withProtector<T extends IWithProtector>(
  Component: React.ComponentType<T>
) {
  const WrappedComponent = (props: T) => {
    useEffect(() => {
      if (!props.currentUser || props.currentUser.role !== "ADMIN") {
        toast.error(props.title || "", { id: "admin-id" });
        redirect("/");
      }
    }, [props.currentUser]);

    if (!props.currentUser || props.currentUser.role !== "ADMIN") {
      return <NotFoundData title={props.title || ""} />;
    }

    return <Component {...props} />;
  };

  // Display name for the component
  WrappedComponent.displayName = `WithProtector(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
}
