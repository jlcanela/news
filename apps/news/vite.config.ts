import { defineConfig } from "vite";
import suidPlugin from "@suid/vite-plugin";
import solidPlugin from "vite-plugin-solid";
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/news/'
    : '/',
  plugins: [
    suidPlugin(),
    solidPlugin(),
    federation({
      name: 'host',
      remotes: {
        local: {
					type: 'module',
					name: 'local',
					entry: 'http://localhost:4174/remoteEntry.js',
					shareScope: 'default',
				},
        remote: {
          type: "module",
          name: "remote",
          entry: 'http://localhost:5001/remoteEntry.js',
          shareScope: 'default',
        }
      },
      filename: 'remoteEntry.js',
      shared: {
        'solid-js': {
          requiredVersion: dependencies['solid-js'],
          singleton: true,
        },
      },
    })
  ],
  optimizeDeps: {
    needsInterop: ['@module-federation/runtime']
  },
  build: {
    target: "esnext",
  },
},
);
