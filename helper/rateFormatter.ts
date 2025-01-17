import { Rating } from "@prisma/client";

const rateFormatter = (ratings: Rating[]) =>
  ratings.length === 0
    ? "0.00"
    : (
        ratings.reduce((acc, curr) => acc + curr.rate, 0) / ratings.length
      ).toFixed(2);

export default rateFormatter;
