# 版本 0.2 开发计划

## 开发环境设置

### Git 分支管理
- **稳定版本**: `main` 分支 (版本 0.1)
- **开发分支**: `version-0.2-dev` 分支 (当前分支)
- **保护策略**: 版本 0.1 保持稳定，新功能在开发分支中实现

### 开发环境配置
```bash
# 当前开发分支
git branch: version-0.2-dev

# 项目根目录
/Users/jodykwong/Documents/AI/VScode-learn/

# 数据库连接
Supabase 项目: jodykwong's Project (mcfrfutbunhccwfotjfa)
区域: us-east-2
```

## 版本 0.2 功能规划

### 1. 博客文章管理系统 🔥
**优先级**: 高
**预计工期**: 2-3 天

#### 1.1 数据库设计
```sql
-- 博客文章表
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES profiles(id),
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER, -- 预计阅读时间（分钟）
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 博客分类表
CREATE TABLE blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7), -- 十六进制颜色代码
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 文章分类关联表
CREATE TABLE blog_post_categories (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);
```

#### 1.2 功能特性
- ✅ 富文本编辑器（Markdown 支持）
- ✅ 文章分类和标签系统
- ✅ 草稿和发布状态管理
- ✅ 特色图片上传
- ✅ SEO 友好的 URL slug
- ✅ 阅读时间估算
- ✅ 文章搜索和过滤

#### 1.3 页面结构
```
/writing                    # 博客文章列表页
/writing/[slug]            # 单篇文章详情页
/writing/category/[slug]   # 分类文章列表
/admin/posts              # 文章管理后台
/admin/categories         # 分类管理后台
```

### 2. 项目详情页面 🚀
**优先级**: 中
**预计工期**: 1-2 天

#### 2.1 功能特性
- ✅ 项目详细介绍和截图展示
- ✅ 技术栈详细说明
- ✅ 开发过程和挑战记录
- ✅ 在线演示和源码链接
- ✅ 项目时间线和版本历史

#### 2.2 数据库扩展
```sql
-- 扩展现有 projects 表
ALTER TABLE projects ADD COLUMN detailed_description TEXT;
ALTER TABLE projects ADD COLUMN screenshots TEXT[]; -- 截图 URL 数组
ALTER TABLE projects ADD COLUMN demo_url TEXT;
ALTER TABLE projects ADD COLUMN features TEXT[]; -- 功能特性数组
ALTER TABLE projects ADD COLUMN challenges TEXT; -- 开发挑战
ALTER TABLE projects ADD COLUMN lessons_learned TEXT; -- 经验总结
ALTER TABLE projects ADD COLUMN project_timeline JSONB; -- 项目时间线
```

#### 2.3 页面结构
```
/projects              # 项目列表页（已存在）
/projects/[slug]       # 项目详情页（新增）
```

### 3. 图片编辑功能 🖼️
**优先级**: 中
**预计工期**: 2-3 天

#### 3.1 功能特性
- ✅ 图片裁剪和调整大小
- ✅ 基础滤镜效果
- ✅ 图片压缩和优化
- ✅ 多格式支持（JPG, PNG, WebP）
- ✅ 拖拽上传界面

#### 3.2 技术实现
- 前端：Canvas API 或 Fabric.js
- 后端：Supabase Storage + 图片处理
- 组件：ImageEditor.astro

### 4. 多语言支持基础架构 🌍
**优先级**: 低
**预计工期**: 3-4 天

#### 4.1 功能特性
- ✅ 中英文双语支持
- ✅ 动态语言切换
- ✅ 内容本地化管理
- ✅ URL 路由本地化

#### 4.2 数据库设计
```sql
-- 多语言内容表
CREATE TABLE content_translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type VARCHAR(50) NOT NULL, -- 'personal_info', 'blog_post', 'project'
  content_id UUID NOT NULL,
  language_code VARCHAR(5) NOT NULL, -- 'zh-CN', 'en-US'
  field_name VARCHAR(100) NOT NULL, -- 'title', 'description', 'content'
  translated_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(content_type, content_id, language_code, field_name)
);
```

### 5. SEO 优化功能 📈
**优先级**: 中
**预计工期**: 1-2 天

#### 5.1 功能特性
- ✅ 动态 meta 标签生成
- ✅ Open Graph 和 Twitter Card 支持
- ✅ 结构化数据（JSON-LD）
- ✅ XML 站点地图生成
- ✅ 页面性能优化

#### 5.2 实现方案
- 组件：SEOHead.astro
- 工具：@astrojs/sitemap
- 数据：动态 meta 信息管理

## 开发时间线

### 第一阶段（第1-3天）
- [x] 创建开发分支和环境设置
- [ ] 博客文章管理系统数据库设计
- [ ] 博客文章 CRUD API 实现
- [ ] 博客管理后台界面

### 第二阶段（第4-6天）
- [ ] 博客文章前台展示页面
- [ ] 项目详情页面设计和实现
- [ ] SEO 优化基础功能

### 第三阶段（第7-10天）
- [ ] 图片编辑功能实现
- [ ] 多语言支持基础架构
- [ ] 功能测试和优化

### 第四阶段（第11-12天）
- [ ] 版本 0.2 功能集成测试
- [ ] 文档更新和完善
- [ ] 准备合并到主分支

## 技术要求

### 设计一致性
- 保持 Apple glassmorphism 设计风格
- 使用现有的 GlassCard 和 GlassButton 组件
- 响应式设计适配

### 代码质量
- TypeScript 类型安全
- 组件化和可重用性
- 错误处理和用户反馈
- 性能优化

### 数据安全
- 继续使用 Supabase RLS 策略
- 管理员权限控制
- 数据验证和清理

## 风险评估

### 技术风险
- **图片编辑功能复杂性**: 可能需要额外的学习时间
- **多语言架构设计**: 需要仔细规划数据结构
- **性能影响**: 新功能可能影响页面加载速度

### 缓解策略
- 分阶段实现，优先核心功能
- 充分测试每个功能模块
- 保持与版本 0.1 的兼容性

## 成功标准

### 功能完整性
- [ ] 所有规划功能正常工作
- [ ] 管理后台和前台展示完整
- [ ] 数据流和权限控制正确

### 用户体验
- [ ] 界面设计一致性
- [ ] 响应式设计适配
- [ ] 加载性能优化

### 技术质量
- [ ] 代码质量和可维护性
- [ ] 错误处理和边界情况
- [ ] 文档完整性

---

**开发开始日期**: 2025-06-27
**预计完成日期**: 2025-07-08
**当前状态**: 🚀 开发环境已设置，准备开始第一阶段开发
