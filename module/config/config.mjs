export const ATOW = {
  skillTNs: {
    "sb": 7,
    "sa": 8,
    "cb": 8,
    "ca": 9,
  },
  complexityRatings: {
    sb: "SB",
    sa: "SA",
    cb: "CB",
    ca: "CA",
  },
  stats: Object.fromEntries(
      ["str", "bod", "rfl", "dex", "int", "wil", "cha", "edg"]
          .map((a) => [a, a.toUpperCase()])),
};
