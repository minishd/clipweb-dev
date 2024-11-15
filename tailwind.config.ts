import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"OpenSans"'],
      },
      fontSize: {
        xs: "0.7rem",
        sm: "0.8rem",
        md: "0.83rem",
        "2md": "0.9rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      aspectRatio: {
        "16/9": "16 / 9",
      },
    },
  },
  plugins: [typography, aspectRatio],
} satisfies Config;
