// https://michalzalecki.com/nominal-typing-in-typescript/#approach-4-intersection-types-and-brands
type Brand<K, T> = K & { __brand: T };

type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

const usd = 10 as USD;
const eur = 10 as EUR;

function gross(net: USD, tax: USD): USD {
  return (net + tax) as USD;
}

gross(usd, usd); // ok
gross(eur, usd); // Type '"EUR"' is not assignable to type '"USD"'.
