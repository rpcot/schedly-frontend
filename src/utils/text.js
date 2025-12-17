export function pluralize(value, [form1, form2, form3]) {
  const absValue = Math.abs(value);
  if (absValue % 100 >= 11 && absValue % 100 <= 19) {
    return form3;
  }
  const lastDigit = absValue % 10;
  if (lastDigit === 1) {
    return form1;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return form2;
  }
  return form3;
}