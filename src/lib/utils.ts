import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isOverflowing(child: HTMLElement, parent: HTMLElement) {
  const childRect = child.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  return (
    childRect.top < parentRect.top ||
    childRect.bottom > parentRect.bottom ||
    childRect.left < parentRect.left ||
    childRect.right > parentRect.right
  );
}