import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          background: '#27253b',
          border: '#12111c',
          text: '#413a87',
        }
      },
      dropShadow: {
        custom: "0 4px 0px var(--tw-shadow-color)",
        black: "0 2px 1px rgb(0, 0, 0)",
      },
      backgroundImage: {
        'nighttime': "url('/homepage/bg_nighttime.png')",
      },
      keyframes: {
        backgroundMove: {
          '0%': { backgroundPosition: "0 0" },
          '100%': { backgroundPosition: "1920px 0" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        bob: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        textFlash: {
          "0%": { opacity: "0" },
          "49%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
        gearTilt: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
      },
      animation: {
        backgroundMove: "backgroundMove 240s linear infinite",
        slideUpAndFade: "slideUpAndFade 1s cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade: "slideRightAndFade 1s cubic-bezier(0.16, 1, 0.3, 1)",
        fadeIn: "fadeIn 1s ease-in-out",
        bob: "bob 3s ease-in-out infinite",
        slideUpAndFadeAndBob: "slideUpAndFade 1s cubic-bezier(0.16, 1, 0.3, 1), bob 3s ease-in-out 1s infinite",
        textFlash: "textFlash 1s infinite",
        gearTilt: "gearTilt 1s",
      },
    },
  },
  plugins: [],
};

export default config;
