import { defineConfig } from "vite";
import suidPlugin from "@suid/vite-plugin";
import solidPlugin from "vite-plugin-solid";
import dtsPlugin from "vite-plugin-dts";
import federationPlugin from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    suidPlugin(),
    solidPlugin(),
    dtsPlugin({
      rollupTypes: true,
      outDir: 'dist'
    }),
    federationPlugin({
      name: 'news-mailing',
      filename: 'remoteEntry.js',
      exposes: {
        './Mailing': './src/index.tsx'
      },
      // shared: ['solid-js', '@suid/material'] enable use with non solid-js apps
    })
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['solid-js', '@suid/material'],
      output: {
        minifyInternalExports: false
      }
    },
    cssCodeSplit: true
  }
});
