import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';


const federationPlugin = federation({
  name: 'remote',
  filename: 'remoteEntry.js',
  exposes: {
    './Mailing': './src/Mailing.tsx'
  },
  shared: {
    'solid-js': {
      singleton: true,
      requiredVersion: dependencies['solid-js'],
    }
  }
});

export default defineConfig({
  plugins: [
    solidPlugin(),
    suidPlugin(),
    federationPlugin
  ],
  optimizeDeps: {
    needsInterop: ['@module-federation/runtime']
  },
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'esm'
      }
    }
  },
  server: {
    port: 5001,
    strictPort: true
  }
});
