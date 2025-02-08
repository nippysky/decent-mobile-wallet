// FUNCTION TO FORMAT NUMBERS
export function formatNumberCustom(number: number) {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  return formattedNumber.replace(/,/g, ",").replace(/\./g, ".");
}

// FUNCTION TO SHORTEN WALLET ADDRESS
export function shortenAddress(address: string) {
  if (address.length < 10) {
    return address;
  }

  const start = address.slice(0, 4);
  const end = address.slice(-4);

  return `${start}...${end}`;
}
