import { resolve } from 'path';

import DotenvPlugin from 'dotenv-webpack';

import HTMLWebpackPlugin from 'html-webpack-plugin';

const webpackSettings = (_, argv) => {
	const isDev = argv['mode'] === 'development';

	const filename = (ext) => (isDev ? `bundle.${ ext }` : `bundle.[hash].${ ext }`);

	return {
		entry: './index.tsx',
		target: 'web',
		mode: argv['mode'],
		context: resolve('src'),
		output: {
			publicPath: '/',
			filename: filename('js'),
			path: resolve('dist'),
		},
		devtool: isDev ? 'source-map' : false,
		devServer: {
			host: process.env.HOST || 'localhost',
			port: process.env.PORT || 3000,
			open: argv['open'] || false,
			historyApiFallback: true,
		},
		resolve: {
			extensions: [ '.ts', '.tsx', '.js', '.jsx', '.scss', '.css', '.png' ],
			alias: {
				'@pages': resolve('src/pages'),
				'@components': resolve('src/components'),
				'@interfaces': resolve('src/interfaces'),
				'@router': resolve('src/router'),
				'@socket-namespaces': resolve('src/socket-namespaces'),
				'@store': resolve('src/store'),
				'@store/*': resolve('src/store/*'),
				'@reducers': resolve('src/store/reducers'),
				'@hooks': resolve('src/hooks'),
				'@utils': resolve('src/utils'),
				'@stylesheets': resolve('src/stylesheets'),
				'@assets/*': resolve('public/assets/*'),
			},
		},
		plugins: [
			new DotenvPlugin({ path: './.env' }),
			new HTMLWebpackPlugin({
				template: resolve('public/index.html'),
				favicon: resolve('public/favicon.ico'),
				inject: true,
				minify: {
					removeComments: !isDev,
					collapseWhitespace: !isDev,
				},
			}),
		],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				}, {
					test: /\.s[ac]ss$/i,
					use: [
						'style-loader',
						'css-modules-typescript-loader',
						{
							loader: 'css-loader',
							options: {
								modules: true,
							},
						},
						'sass-loader',
					],
				}, {
					test: /\.(png|jpe?g|gif)$/i,
					use: [
						{
							loader: 'file-loader',
						},
					],
				}, {
					test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
					use: [
						{
							loader: 'file-loader?name=./assets/fonts/FlowExt/[name].[ext]'
						},
					]
				}
			],
		},
	};
};

export default webpackSettings;
