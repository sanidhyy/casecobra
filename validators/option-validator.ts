// !! Needed for the support of dynamic tailwindcss classnames.
// Don't forget to add color here as a comment after adding it in `COLORS` array.
// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950

export const COLORS = [
  {
    label: "Black",
    value: "black",
    tw: "zinc-900",
  },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-950",
  },
  {
    label: "Rose",
    value: "rose",
    tw: "rose-950",
  },
] as const;
