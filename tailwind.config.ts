import type { Config } from "tailwindcss";
const { mauve, violet } = require("@radix-ui/colors");
const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			// background: {
			// 	background:
			// 		"linear-gradient(300deg,#141c3a,#5be9b9,#7427f7,#5be9b9,#141c3a)",
			// 	"background-size": "300% 300%",
			// 	animation: "gradient-animation 30s ease infinite",
			// 	keyframes: {
			// 		wave: {
			// 			"0%": { "background-position": "0% 50%" },
			// 			"50%": { "background-position": "100% 50%" },
			// 			"100%": { "background-position": "0% 50%" },
			// 		},
			// 	},
			// },
			colors: {
				"custom-white": "#ffffff",
				"custom-teal": {
					"100": "#cef8ea",
					"200": "#adf4dc",
					"300": "#8cf0ce",
					"400": "#5be9b9",
					"500": "#49ba94",
					"600": "#40a382",
				},
				"custom-purple": {
					"100": "#f0edfc",
					"200": "#b7abe7",
					"300": "#8b78d9",
					"400": "#6e56cf",
					"500": "#7427f7",
					"600": "#5842d9",
				},
				"custom-dark": "#141c3a",
				...mauve,
				...violet,
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
