module.exports = {
  extends: ["expo", "plugin:react/recommended"],
  plugins: ["react-hooks", "react"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/no-array-index-key": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-sort-props": "error",
    "react/jsx-no-bind": "error",
  },
};
