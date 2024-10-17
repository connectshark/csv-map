import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'
import { writeFileSync } from 'fs'


const fetchStaticData = () => {
  return {
    name: 'json',
    async buildEnd () {
      const fetch_response = await fetch('https://cdn.jsdelivr.net/gh/connectshark/studio-portfolio@latest/brands.json')
      const data = await fetch_response.json()
      writeFileSync('./public/brands.json', JSON.stringify(data))
    }
  }
}

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [vue(), VueRouter(), VueDevTools(), fetchStaticData()],
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
