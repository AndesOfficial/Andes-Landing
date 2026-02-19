module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2022,
    },
    extends: [
        "eslint:recommended",
        "google",
    ],
    rules: {
        "quotes": ["error", "double"],
        "linebreak-style": "off",
        "indent": "off",
        "object-curly-spacing": "off",
        "comma-dangle": "off",
        "max-len": "off",
        "require-jsdoc": "off",
    },
};
