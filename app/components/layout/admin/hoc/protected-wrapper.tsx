import React from "react";

export default function ProtectedWrapper({ title }: { title: string }) {
  return (
    <div className="w-full p-8 flex items-center justify-center text-xl md:text-2xl">
      <p className="font-medium">{title}</p>
    </div>
  );
}
