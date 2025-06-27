# ⚡ GitHub Pages 快速开始指南

## 🎯 5分钟部署到GitHub Pages

### 前提条件
- ✅ GitHub账户
- ✅ Supabase项目（已配置数据）
- ✅ 本地项目代码准备就绪

### 🚀 快速部署步骤

#### 1. 创建GitHub仓库（2分钟）
```bash
# 在GitHub上创建仓库：yourusername.github.io
# 克隆到本地或添加远程仓库
git remote add origin https://github.com/yourusername/yourusername.github.io.git
```

#### 2. 配置环境变量（2分钟）
进入GitHub仓库 → Settings → Secrets and variables → Actions

**必需配置：**
```
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
PUBLIC_SITE_URL=https://yourusername.github.io
PUBLIC_SITE_NAME=Your Name
ADMIN_EMAIL=your@email.com
```

#### 3. 启用GitHub Pages（30秒）
进入仓库 → Settings → Pages → Source选择"GitHub Actions"

#### 4. 推送代码（30秒）
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

#### 5. 等待部署完成（2-5分钟）
进入仓库 → Actions → 查看部署进度

### ✅ 验证部署
```bash
# 检查网站是否可访问
curl -I https://yourusername.github.io

# 或者直接在浏览器中访问
open https://yourusername.github.io
```

## 🔧 常用命令

```bash
# 本地测试GitHub Pages构建
npm run build:github

# 预览GitHub Pages版本
npm run preview:github

# 检查部署前配置
npm run pre-deploy

# 验证环境变量
npm run verify-env

# 验证部署结果
npm run verify-deployment https://yourusername.github.io
```

## 📋 检查清单

部署前确认：
- [ ] 仓库名称正确（yourusername.github.io）
- [ ] 所有必需的Secrets已配置
- [ ] GitHub Pages已启用
- [ ] 代码已推送到main分支
- [ ] Supabase项目正常运行

部署后验证：
- [ ] 网站可以访问
- [ ] 所有页面正常加载
- [ ] 主题切换功能正常
- [ ] 动态内容正确显示
- [ ] 移动端显示正常

## 🆘 快速故障排除

### 部署失败？
1. 检查GitHub Actions日志
2. 运行 `npm run pre-deploy` 检查本地配置
3. 验证所有Secrets是否正确配置

### 网站无法访问？
1. 确认GitHub Pages已启用
2. 等待DNS传播（最多10分钟）
3. 检查是否有CNAME文件冲突

### 功能不正常？
1. 检查浏览器控制台错误
2. 验证Supabase连接
3. 确认环境变量配置

## 📚 详细文档

- 📖 [完整部署指南](GITHUB_PAGES_DEPLOYMENT.md)
- 🔧 [故障排除指南](TROUBLESHOOTING.md)
- 🔐 [环境变量配置](GITHUB_SECRETS_SETUP.md)

## 🎉 部署成功！

恭喜！你的Astro个人网站现在已经部署到GitHub Pages了！

**你的网站地址：** `https://yourusername.github.io`

### 下一步可以做什么：
1. 🎨 自定义网站内容和样式
2. 📝 添加更多页面和功能
3. 📊 配置Google Analytics
4. 🌐 设置自定义域名
5. 🔄 设置自动化内容更新

---

**需要帮助？** 查看 [故障排除指南](TROUBLESHOOTING.md) 或提交Issue。
