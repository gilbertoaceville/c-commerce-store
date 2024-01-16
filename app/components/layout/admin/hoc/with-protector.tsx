import { redirect, useRouter } from "next/navigation";
import ProtectedWrapper from "./protected-wrapper";
import { IWithProtector } from "./types";
import { useEffect } from "react";
import toast from "react-hot-toast";

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
      return <ProtectedWrapper title={props.title || ""} />;
    }

    return <Component {...props} />;
  };

  // Display name for the component
  WrappedComponent.displayName = `WithProtector(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
}
