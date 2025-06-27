# 🚀 GitHub Pages 部署完整指南

## 📋 部署步骤总览

### 1️⃣ 创建GitHub仓库

#### 选项A：主域名部署 (推荐)
- 仓库名称：`yourusername.github.io`
- 访问地址：`https://yourusername.github.io`

#### 选项B：子路径部署
- 仓库名称：任意名称（如 `personal-website`）
- 访问地址：`https://yourusername.github.io/repository-name`

### 2️⃣ 配置GitHub仓库设置

1. **启用GitHub Pages**
   - 进入仓库 `Settings` > `Pages`
   - Source 选择 `GitHub Actions`

2. **配置环境变量**
   - 进入 `Settings` > `Secrets and variables` > `Actions`
   - 添加必需的Repository Secrets（详见下方列表）

### 3️⃣ 推送代码到GitHub

```bash
# 初始化Git仓库（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Setup GitHub Pages deployment"

# 推送到main分支
git push -u origin main
```

### 4️⃣ 监控部署过程

1. 进入仓库的 `Actions` 标签
2. 查看 "Deploy Astro site to GitHub Pages" 工作流
3. 等待部署完成（通常需要2-5分钟）

## 🔑 必需的环境变量

在GitHub仓库的Secrets中配置以下变量：

### Supabase配置
```
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 站点配置
```
PUBLIC_SITE_URL=https://yourusername.github.io
PUBLIC_SITE_NAME=Your Name
ADMIN_EMAIL=your_email@example.com
```

### 可选配置
```
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## 🛠️ 本地测试命令

```bash
# 检查环境变量配置
npm run verify-env

# 部署前检查
npm run pre-deploy

# 构建GitHub Pages版本
npm run build:github

# 本地预览GitHub Pages版本
npm run preview:github

# 验证部署结果
npm run verify-deployment https://yourusername.github.io
```

## 🔄 自动部署流程

每次推送到 `main` 分支时，会自动触发以下流程：

1. **代码检出** - 获取最新代码
2. **环境设置** - 安装Node.js和依赖
3. **构建项目** - 使用Astro构建静态文件
4. **部署到Pages** - 将构建结果部署到GitHub Pages

## 📊 部署状态检查

### GitHub Actions状态
- ✅ 绿色：部署成功
- ❌ 红色：部署失败
- 🟡 黄色：部署进行中

### 网站访问测试
```bash
# 检查网站是否可访问
curl -I https://yourusername.github.io

# 检查特定页面
curl -I https://yourusername.github.io/about
```

## 🎯 验证部署成功

部署完成后，验证以下功能：

- [ ] 网站可以正常访问
- [ ] 所有页面都能正确加载
- [ ] 主题切换功能正常
- [ ] 社交媒体链接正确
- [ ] Supabase数据正确显示
- [ ] 响应式设计在移动端正常

## 📱 移动端测试

使用以下工具测试移动端兼容性：
- Chrome DevTools 设备模拟
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- 实际移动设备测试

## 🔧 性能优化

部署后可以进行的优化：

1. **启用CDN**（GitHub Pages自动提供）
2. **图片优化**（已在构建中配置）
3. **缓存策略**（GitHub Pages自动处理）
4. **压缩资源**（已在构建中配置）

## 📈 监控和分析

### Google Analytics（可选）
如果配置了 `PUBLIC_GOOGLE_ANALYTICS_ID`，网站会自动包含分析代码。

### GitHub Pages 统计
GitHub提供基本的流量统计，可在仓库的 `Insights` > `Traffic` 中查看。

## 🔄 更新网站

要更新网站内容：

1. 在本地修改代码
2. 提交更改：`git commit -am "Update content"`
3. 推送到GitHub：`git push origin main`
4. GitHub Actions会自动重新部署

## 🌐 自定义域名（可选）

如果你有自己的域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为你的域名（如 `example.com`）
3. 在域名提供商处配置DNS记录指向GitHub Pages

## 📞 获取帮助

如果遇到问题：

1. 查看本文档的故障排除部分
2. 检查GitHub Actions的详细日志
3. 参考 [GitHub Pages官方文档](https://docs.github.com/en/pages)
4. 参考 [Astro部署文档](https://docs.astro.build/en/guides/deploy/github/)

---

**下一步：** 查看 `TROUBLESHOOTING.md` 了解常见问题的解决方案。
