import { defineConfig } from "vite";
import suidPlugin from "@suid/vite-plugin";
import solidPlugin from "vite-plugin-solid";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    suidPlugin(),
    solidPlugin(),
    dtsPlugin({
      rollupTypes: true,
      outDir: 'dist'
    }),
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
