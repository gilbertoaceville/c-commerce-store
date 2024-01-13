import { useState } from "react";

export default function useToggle(init?: "on" | "off") {
  const [toggleState, setToggle] = useState(init || "off");

  function setOn() {
    setToggle("on");
  }

  function setOff() {
    if (toggleState === "on") return setToggle("off");
  }

  function toggle() {
    if (toggleState === "off") setOn();
    else setOff();
  }

  return {
    isOn: toggleState === "on",
    isOff: toggleState === "off",
    setOn,
    setOff,
    toggle,
  };
}
