
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';




export default defineConfig({
  plugins: [
    vue(),
    vueJsx(), // 添加 JSX/TSX 支持
  ]
})
