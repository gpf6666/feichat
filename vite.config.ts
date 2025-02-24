import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import Components from 'unplugin-vue-components/vite'
// import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/chat': {
  //       target: 'https://smart-soft-stallion.glitch.me/chat', // 目标服务器
  //       changeOrigin: true, // 允许跨域
  //       rewrite: (path) => path.replace(/^\/chat/, ''), // 重写路径，去掉 /api
  //     },
  //   },
  // },
  plugins: [
    vue(),
    // Components({
    //   resolvers: [NaiveUiResolver()],
    //   dts: 'src/type/components.d.ts',
    // }),
  ],
  build: {
    outDir: 'docs', // 将构建输出文件夹设置为 build（默认为 dist）
  },
   base: './'
})
