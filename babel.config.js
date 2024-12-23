module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module:react-native-dotenv",
                {
                    moduleName: "@env",
                    path: ".env",
                },
            ],
            "babel-plugin-styled-components",
            "react-native-reanimated/plugin",
            [
                "module-resolver",
                {
                    alias: {
                        "@components": "./src/components",
                        "@screens": "./src/screens",
                        "@hooks": "./src/hooks",
                        "@context": "./src/context",
                        "@utils": "./src/utils",
                        "@assets": "./src/assets",
                    },
                },
            ],
        ],
    };
};
