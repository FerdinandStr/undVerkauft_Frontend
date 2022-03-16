//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//INFO: Um EsLint (und Prettier) korrekt einzurichten,
//      müssen nur die entsprechenden Abhängigkeiten installiert werden => npm i
//      VSCode Plugins werden keine benötigt, außer ESLint (solange nicht local auf der Maschine vorhanden)
//
//      Danach werden nur noch, falls erwünscht, die entsprechenen VSCode Settings zum automatischen speichern benötigt:
//      =>  strg+shift+p => nach "settings" suchen => "Preferences: Open Settings (JSON)" auswählen => folgende Config hinzufügen:
//
//      "editor.formatOnSave": true,
//      "eslint.autoFixOnSave": true,
//      "eslint.alwaysShowStatus": true,
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:prettier/recommended"],
    settings: {
        react: {
            version: "detect",
        },
    },
    parser: "@babel/eslint-parser",
    rules: {
        "no-unused-vars": ["warn"],
        "react-hooks/rules-of-hooks": "warn", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
        "react/prop-types": 0,
        "prettier/prettier": [
            "warn",
            {
                trailingComma: "es5",
                endOfLine: "auto",
            },
        ],
    },
}
