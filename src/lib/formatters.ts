import numeral from "numeral-es6";

numeral.register("locale", "es", {
  delimiters: {
    thousands: ".",
    decimal: ","
  },
  currency: {
    symbol: "€"
  },
  abbreviations: {
    thousand: "k",
    million: "m",
    billion: "b",
    trillion: "t"
  },
  ordinal: function(number: any) {
    return "";
  }
});

numeral.locale("es");

export const formatCurrency = (amount: number): string => {
  return numeral(amount).format("0,0[.]00 $");
};

export const formatUnit = (amount: number): string => {
  return numeral(amount).format();
};
