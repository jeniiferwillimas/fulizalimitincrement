export interface IncrementDetails {
  fee: number;
  rate: number;
  termDays: number;
}

const FEE_TABLE: Record<number, number> = {
  3000: 80,
  4000: 199,
  5000: 199,
  8000: 213,
  10000: 349,
  11000: 293,
  13000: 346,
  15000: 449,
  20000: 549,
  23000: 612,
  25000: 649,
  30000: 799,
  38000: 1011,
  40000: 999,
  45000: 1197,
  50000: 1299,
  60000: 1596,
  75000: 1799,
  100000: 2499,
  150000: 3990,
  200000: 5320,
  300000: 7980,
  400000: 10640,
  500000: 13300,
  750000: 19950,
  1000000: 26600,
  1500000: 39900,
  2000000: 53200,
  2500000: 66500,
  3000000: 79800,
  4000000: 106400,
  5000000: 133000,
  7500000: 199500,
  10000000: 266000,
  15000000: 399000,
};

export function getFeeAndRate(amount: number): IncrementDetails {
  const fee = FEE_TABLE[amount] ?? Math.round(amount * 0.0266);
  return { fee, rate: 0.088, termDays: 180 };
}
