import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { configuredTwMerge } from "./configuredTwMerge";

export default function (...inputs) {
  return configuredTwMerge(clsx(...inputs));
}
