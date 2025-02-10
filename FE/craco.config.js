const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less']
      }
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // Example: Customize Ant Design theme
              '@primary-color': '#1DA57A'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
