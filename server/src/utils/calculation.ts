const currentPrice = (basePrice: number, discount: number) => {
  const price = basePrice - Math.floor((basePrice * discount) / 100);

  return price;
}

export {
  currentPrice
}