import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

export default defineConfig({
  root: 'resources',
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, 'resources/js/locales/**')
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'resources/js'),
      Store: path.join(__dirname, 'resources/js/stores'),
      Use: path.join(__dirname, 'resources/js/uses'),
      Util: path.join(__dirname, 'resources/js/util'),
      View: path.join(__dirname, 'resources/js/views'),
    },
  },
  build: {
    manifest: true,
    emptyOutDir: true,
    outDir: '../../../public/vendor/{{ name }}',
    rollupOptions: {
      input: '/js/main.js',
    }
  }
})
