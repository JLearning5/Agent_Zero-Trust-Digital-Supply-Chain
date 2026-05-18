import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

const htmlEntries = [
  'index.html',
  'principles.html',
  'architecture.html',
  'pillars.html',
  'supply-chain.html',
  'framework.html',
  'implementation-lab.html',
  'case-studies.html',
  'solarwinds.html',
  'kaseya.html',
  'codecov.html',
  'best-practices.html',
  'resources.html',
]

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(htmlEntries.map((file) => [file.replace('.html', ''), path.resolve(__dirname, file)])),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
