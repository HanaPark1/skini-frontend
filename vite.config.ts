import * as path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(),],
	base: '/skini-frontend/',
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://54.180.161.176:8080',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ''), // 프록시 경로 조정
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});