module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-styled-components',
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@hooks': './src/hooks',
            '@context': './src/context',
            '@utils': './src/utils',
            '@assets': './src/assets',
            '@realmDB': './src/realmDB',
          },
        },
      ],
    ],
  };
};
