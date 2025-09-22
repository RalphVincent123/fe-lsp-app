import { ReturnButtonProps } from "@/model/ReturnButton.interface";
import Link from "next/link";

export const ReturnButton = ({ href, label }: ReturnButtonProps) => {
  return (
    <button>
      <Link href={href}>{label}</Link>
    </button>
  );
};
