import Image from "next/image";
import React from "react";

export default function Avatar({ src }: { src?: string }) {
  return (
    <Image
      src={src || "/profile.png"}
      alt="profile"
      className="rounded-full"
      height={30}
      width={30}
    />
  );
}
