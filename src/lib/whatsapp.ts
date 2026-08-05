import type { CartLine } from "@/types";
import { CAFE } from "@/lib/constants";
import { formatINR } from "@/lib/utils";

interface BuildOrderMessageArgs {
  customerName: string;
  customerPhone: string;
  lines: CartLine[];
}

export function buildOrderMessage({ customerName, customerPhone, lines }: BuildOrderMessageArgs): string {
  const itemRows = lines
    .map((line) => {
      const lineTotal = line.item.price * line.quantity;
      return `${line.quantity} x ${line.item.name} - ${formatINR(lineTotal)}`;
    })
    .join("\n");

  const total = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);

  return [
    "Hello Yumazing",
    "",
    "I would like to place an order.",
    "",
    "Customer Details",
    `Name: ${customerName}`,
    `Phone: ${customerPhone}`,
    "",
    "Order Items",
    "",
    itemRows,
    "",
    "------------------------",
    `Total Amount: ${formatINR(total)}`,
    "",
    "Please confirm my order.",
    "",
    "Thank you.",
  ].join("\n");
}

export function buildWhatsAppOrderUrl(args: BuildOrderMessageArgs): string {
  const message = buildOrderMessage(args);
  return `https://wa.me/${CAFE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppChatUrl(prefill?: string): string {
  const text = prefill ? `?text=${encodeURIComponent(prefill)}` : "";
  return `https://wa.me/${CAFE.whatsappNumber}${text}`;
}
