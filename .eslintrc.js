module.exports = {
    "parser":        "babel-eslint",
    "env":           {
        "browser":      true,
        "commonjs":     true,
        "es6":          true,
        "node":         true,
        "jest/globals": true
    },
    "extends":       [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion":  2018,
        "sourceType":   "module"
    },
    "plugins":       [
        "react",
        "jest"
    ],
    "rules":         {
        "indent":          [
            "error",
            4,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes":          [
            "error",
            "double"
        ],
        "semi":            [
            "error",
            "always"
        ],
        "key-spacing":     [
            "error",
            {
                "align": "value",
                "mode":  "minimum"
            },
        ],
        "no-console":      [
            0
        ]
    },
    "settings":      {
        "react": {
            "version": "^16.6.3"
        }
    }
};
