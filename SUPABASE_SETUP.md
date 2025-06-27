# Supabase 设置指南

## 1. 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com) 并注册账户
2. 点击 "New Project" 创建新项目
3. 选择组织，输入项目名称和数据库密码
4. 选择地区（建议选择离你最近的地区）
5. 点击 "Create new project"

## 2. 获取项目凭据

项目创建完成后：

1. 在项目仪表板中，点击左侧的 "Settings" 
2. 选择 "API" 选项卡
3. 复制以下信息：
   - **Project URL** (类似: `https://xxxxx.supabase.co`)
   - **anon public** key (以 `eyJ` 开头的长字符串)

## 3. 配置环境变量

1. 在项目根目录创建 `.env` 文件：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，填入你的 Supabase 凭据：
```env
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. 设置数据库

1. 在 Supabase 仪表板中，点击左侧的 "SQL Editor"
2. 点击 "New query"
3. 复制 `supabase/migrations/001_initial_schema.sql` 文件的内容
4. 粘贴到 SQL 编辑器中
5. 点击 "Run" 执行 SQL

这将创建以下表：
- `profiles` - 用户资料
- `posts` - 博客文章
- `projects` - 项目展示
- `newsletter_subscribers` - 邮件订阅者

## 5. 验证设置

重启开发服务器：
```bash
npm run dev
```

如果一切设置正确，网站应该能够正常运行，并且可以：
- 显示项目列表（从 `projects` 表）
- 显示博客文章（从 `posts` 表）
- 接收邮件订阅（存储到 `newsletter_subscribers` 表）

## 6. 添加示例数据（可选）

你可以在 Supabase 仪表板的 "Table Editor" 中手动添加一些示例数据：

### 添加项目数据
在 `projects` 表中添加：
```sql
INSERT INTO projects (title, description, url, status, technologies) VALUES
('我的第一个项目', '这是一个很棒的项目描述', 'https://example.com', 'active', ARRAY['React', 'Node.js']),
('开源库', '一个有用的开源工具', 'https://github.com/username/repo', 'maintained', ARRAY['TypeScript', 'Jest']);
```

### 添加博客文章
在 `posts` 表中添加：
```sql
INSERT INTO posts (title, slug, content, excerpt, published) VALUES
('我的第一篇文章', 'my-first-post', '这是文章的完整内容...', '这是文章摘要', true),
('技术分享', 'tech-sharing', '分享一些技术心得...', '技术心得分享', true);
```

## 7. 部署注意事项

部署到生产环境时，确保：
1. 在部署平台（如 Vercel、Netlify）中设置相同的环境变量
2. 在 Supabase 项目设置中配置正确的域名（Authentication > URL Configuration）
3. 根据需要调整 RLS（行级安全）策略

## 故障排除

### 常见问题：

1. **环境变量未生效**
   - 确保 `.env` 文件在项目根目录
   - 重启开发服务器
   - 检查变量名是否以 `PUBLIC_` 开头

2. **数据库连接失败**
   - 检查 Project URL 和 API Key 是否正确
   - 确保 Supabase 项目状态为 "Active"

3. **SQL 执行失败**
   - 检查 SQL 语法是否正确
   - 确保按顺序执行迁移文件

如果遇到其他问题，请查看 Supabase 文档或联系支持。
