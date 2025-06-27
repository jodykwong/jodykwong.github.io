import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// GitHub Pages 部署配置
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

// 根据部署环境确定 site 和 base
const site = isGitHubPages
  ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
  : 'http://localhost:4322';

const base = isGitHubPages && process.env.GITHUB_REPOSITORY !== `${process.env.GITHUB_REPOSITORY_OWNER}/${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
  ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1]}`
  : '';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages 配置
  site: site,
  base: base,

  integrations: [tailwind()],

  // 静态站点生成
  output: 'static',

  build: {
    // 启用资源内联优化
    inlineStylesheets: 'auto',
    // 生成静态文件
    format: 'directory'
  },

  vite: {
    build: {
      // 启用CSS压缩
      cssCodeSplit: true,
      // 优化chunk大小
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro']
          }
        }
      }
    }
  }
});
