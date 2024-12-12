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
    })
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['solid-js']
    }
  },
});
