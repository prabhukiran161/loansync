export const formatPaise = (paiseString: string | number): string => {
  if (!paiseString) return "₹0.00";

  const paiseBigInt = BigInt(paiseString);

  const mainUnit = Number(paiseBigInt) / 100;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(mainUnit);
};
