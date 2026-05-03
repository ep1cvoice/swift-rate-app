export function convert(amount, rate) {
  if (typeof amount !== "number" || typeof rate !== "number") {
    return 0;
  }

  return amount * rate;
}