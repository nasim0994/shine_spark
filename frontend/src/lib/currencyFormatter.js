const bdRate = 121.39;

export const currencyFormatter = (value) => {
  const countryCode = localStorage.getItem("countryCode");

  let currency = countryCode === "BD" ? "BDT" : "USD";
  let formattedValue = currency === "BDT" ? value * bdRate : value;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(formattedValue);
};
