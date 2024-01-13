"use client";

import Link from "next/link";
import { useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { signOut } from "next-auth/react";

import useToggle from "@/base/hooks/useToggle";
import Avatar from "@/components/element/avatar/avatar";
import { useOnClickOutside } from "@/base/hooks/useOnClickOutside";

import locale from "../locale/en.json";
import { MenuItemProps, MenuProps } from "./types";

export default function Menu({ currentUser }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { isOn, toggle, setOff } = useToggle();

  useOnClickOutside(menuRef, setOff);

  function MenuItem({ children, onClick }: MenuItemProps) {
    return (
      <div
        className="px-4 py-3 transition text-secondary hover:bg-neutral-100"
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="relative z-30">
      {isOn && (
        <div className="z-20 bg-tertiary opacity-60 w-screen h-screen fixed top-0 left-0" />
      )}
      <div ref={menuRef}>
        <div
          className="p-2 border-[1px] border-primary flex justify-between items-center gap-1 rounded-full cursor-pointer transition hover:shadow-md text-primary"
          onClick={toggle}
        >
          <Avatar src={currentUser?.image || ""} />
          <AiFillCaretDown />
        </div>
        {isOn && (
          <div className="absolute z-30 rounded-md shadow-md w-[170px] bg-primary overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenuItem onClick={setOff}>{locale.ordersText}</MenuItem>
                </Link>
                {/* <Link href="/admin">
              <MenuItem onClick={toggleMenu}>{locale.admin}</MenuItem>
            </Link> */}
                <hr />
                <MenuItem onClick={signOut}>{locale.logout}</MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/signin">
                  <MenuItem onClick={setOff}>{locale.signin}</MenuItem>
                </Link>
                <Link href="/signup">
                  <MenuItem onClick={setOff}>{locale.signup}</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
