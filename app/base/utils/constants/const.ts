import { AiFillPhone, AiOutlineDesktop, AiOutlineLaptop } from "react-icons/ai";
import { MdOutlineKeyboard, MdStorefront, MdTv, MdWatch } from "react-icons/md";

export const cacheKey = "cubeCartProducts";
export const cachePaymentIntent = "cPI";
export const MAX_CART_PRODUCT = 80;
export const ALL = "All";

export const productCategories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Phone",
    icon: AiFillPhone,
  },
  {
    label: "Laptop",
    icon: AiOutlineLaptop,
  },
  {
    label: "Desktop",
    icon: AiOutlineDesktop,
  },
  {
    label: "Watch",
    icon: MdWatch,
  },
  {
    label: "TV",
    icon: MdTv,
  },
  {
    label: "Accessories ",
    icon: MdOutlineKeyboard,
  },
];

export const productAttributes = [
  {
    color: "Black",
    colorCode: "#000000",
    image: null,
  },
  {
    color: "White",
    colorCode: "#FFFFFF",
    image: null,
  },
  {
    color: "Gray",
    colorCode: "#808080",
    image: null,
  },
  {
    color: "Silver",
    colorCode: "#C0C0C0",
    image: null,
  },
  {
    color: "Blue",
    colorCode: " #0000FF",
    image: null,
  },
  {
    color: "Red",
    colorCode: "#FF0000",
    image: null,
  },
  {
    color: "Graphite",
    colorCode: " #383838",
    image: null,
  },
];
