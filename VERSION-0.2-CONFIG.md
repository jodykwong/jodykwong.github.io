# 版本 0.2 开发配置

## 环境配置

### Git 分支管理
```bash
# 当前开发分支
git branch: version-0.2-dev

# 分支保护策略
main 分支: 版本 0.1 稳定版本（受保护）
version-0.2-dev 分支: 版本 0.2 开发版本（当前）

# 分支切换命令
git checkout main              # 切换到稳定版本
git checkout version-0.2-dev   # 切换到开发版本
```

### 项目版本信息
```json
{
  "name": "personal-website",
  "version": "0.2.0-dev",
  "description": "Personal website with blog and advanced features",
  "branch": "version-0.2-dev",
  "baseVersion": "0.1.0"
}
```

### 数据库配置

#### Supabase 项目信息
- **项目名称**: jodykwong's Project
- **项目ID**: mcfrfutbunhccwfotjfa
- **区域**: us-east-2
- **数据库**: PostgreSQL with RLS

#### 版本 0.2 新增表
```sql
-- 博客系统
blog_categories          # 博客分类
blog_posts              # 博客文章
blog_post_categories    # 文章分类关联

-- 多语言支持
content_translations    # 多语言内容

-- SEO 优化
seo_metadata            # SEO 元数据

-- 扩展现有表
projects                # 新增详情字段
```

#### 数据隔离策略
- **开发数据**: 使用表前缀 `v2_` 区分版本数据（可选）
- **测试数据**: 在开发分支中使用测试数据
- **生产数据**: 保持版本 0.1 数据不变

### 开发工具配置

#### VS Code 配置
```json
{
  "astro.typescript.enabled": true,
  "astro.format.enable": true,
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "files.associations": {
    "*.astro": "astro"
  }
}
```

#### 推荐扩展
- Astro
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Supabase

### 构建配置

#### Astro 配置 (astro.config.mjs)
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  build: {
    format: 'directory'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'blog': ['./src/lib/blog.ts'],
            'seo': ['./src/lib/seo.ts']
          }
        }
      }
    }
  }
});
```

#### Tailwind 配置 (tailwind.config.mjs)
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'primary': '#0ea5e9',
        'secondary': '#71717a',
        'accent': {
          'purple': '#8b5cf6',
          'pink': '#ec4899',
          'orange': '#f97316',
          'green': '#10b981',
        }
      },
      // 版本 0.2 新增样式配置
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--text-primary)',
            a: {
              color: 'var(--color-primary)',
              '&:hover': {
                color: 'var(--color-primary)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    // 版本 0.2 可能需要的插件
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ],
}
```

## 开发规范

### 代码组织结构
```
src/
├── components/
│   ├── blog/              # 博客相关组件
│   │   ├── BlogEditor.astro
│   │   ├── BlogCard.astro
│   │   └── CategoryTag.astro
│   ├── seo/               # SEO 相关组件
│   │   ├── SEOHead.astro
│   │   └── StructuredData.astro
│   ├── image/             # 图片处理组件
│   │   └── ImageEditor.astro
│   └── i18n/              # 多语言组件
│       └── LanguageSwitch.astro
├── lib/
│   ├── blog.ts            # 博客相关 API
│   ├── seo.ts             # SEO 相关功能
│   ├── image.ts           # 图片处理功能
│   └── i18n.ts            # 多语言功能
├── pages/
│   ├── blog/              # 博客页面
│   │   ├── index.astro    # 博客列表
│   │   ├── [slug].astro   # 博客详情
│   │   └── category/
│   │       └── [slug].astro
│   ├── projects/
│   │   └── [slug].astro   # 项目详情页
│   └── admin/
│       ├── blog/          # 博客管理
│       └── seo/           # SEO 管理
└── styles/
    ├── blog.css           # 博客样式
    └── editor.css         # 编辑器样式
```

### 命名规范

#### 文件命名
- **组件**: PascalCase (BlogEditor.astro)
- **页面**: kebab-case ([blog-slug].astro)
- **工具函数**: camelCase (blogUtils.ts)
- **样式文件**: kebab-case (blog-editor.css)

#### 数据库命名
- **表名**: snake_case (blog_posts)
- **字段名**: snake_case (created_at)
- **索引名**: idx_table_field (idx_blog_posts_slug)

#### API 函数命名
```typescript
// 博客相关
getBlogPosts()
getBlogPostBySlug()
createBlogPost()
updateBlogPost()
deleteBlogPost()

// SEO 相关
generateSEOMetadata()
updateSEOMetadata()

// 多语言相关
getTranslations()
setTranslation()
```

### 类型定义

#### 博客相关类型
```typescript
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  published: boolean;
  published_at?: string;
  author_id: string;
  tags: string[];
  reading_time: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
```

#### SEO 相关类型
```typescript
export interface SEOMetadata {
  id: string;
  page_type: string;
  page_id?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  og_title?: string;
  og_description?: string;
  og_image_url?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image_url?: string;
  canonical_url?: string;
  robots: string;
  created_at: string;
  updated_at: string;
}
```

## 测试配置

### 测试环境
- **单元测试**: Vitest
- **组件测试**: @astro/testing
- **E2E 测试**: Playwright (可选)

### 测试数据
```sql
-- 测试博客分类
INSERT INTO blog_categories (name, slug, description, color) VALUES
('测试分类', 'test-category', '用于测试的分类', '#ff0000');

-- 测试博客文章
INSERT INTO blog_posts (title, slug, content, published, author_id) VALUES
('测试文章', 'test-post', '这是一篇测试文章', true, 'test-author-id');
```

## 部署配置

### 开发环境部署
- **分支**: version-0.2-dev
- **自动部署**: 推送到开发分支时自动构建
- **预览URL**: 开发环境预览地址

### 生产环境准备
- **合并条件**: 所有功能测试通过
- **数据迁移**: 运行生产环境数据库迁移
- **回滚计划**: 保持版本 0.1 可快速回滚

## 监控和日志

### 开发监控
- **构建状态**: GitHub Actions 构建监控
- **错误追踪**: 浏览器控制台错误监控
- **性能监控**: Lighthouse 性能评分

### 日志配置
```typescript
// 开发环境日志
const isDev = import.meta.env.DEV;
const logger = {
  info: (message: string) => isDev && console.log(`[INFO] ${message}`),
  error: (message: string) => console.error(`[ERROR] ${message}`),
  warn: (message: string) => isDev && console.warn(`[WARN] ${message}`)
};
```

---

**配置创建日期**: 2025-06-27
**配置版本**: 0.2.0-dev
**最后更新**: 2025-06-27
**维护者**: 开发团队
