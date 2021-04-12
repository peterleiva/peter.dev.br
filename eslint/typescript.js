const { resolve } = require("path");

module.exports = {
	extends: ["airbnb-typescript/base"],

	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		tsconfigRootDir: resolve(__dirname, "../packages"),
		project: ["./*/tsconfig.json"],
	},
};
