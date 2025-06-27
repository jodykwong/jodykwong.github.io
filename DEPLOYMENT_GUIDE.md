# 部署指南

## 概述

本指南将帮助你将个人网站和后台管理系统部署到生产环境。

## 部署前准备

### 1. 完成本地设置

确保以下步骤已完成：

- ✅ Supabase 项目已创建并配置
- ✅ 运行了所有数据库迁移
- ✅ 设置了管理员账户
- ✅ 测试了所有功能
- ✅ 添加了基本内容

### 2. 准备生产环境变量

创建生产环境的环境变量：

```env
# 生产环境变量
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 推荐部署平台

### 🚀 Vercel (推荐)

Vercel 是部署 Astro 应用的最佳选择：

#### 优势：
- 自动 CI/CD
- 全球 CDN
- 零配置部署
- 免费 SSL
- 环境变量管理

#### 部署步骤：

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Complete website with admin system"
   git push origin main
   ```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账户登录
   - 点击 "New Project"
   - 选择你的仓库

3. **配置项目**
   - Framework Preset: Astro
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **设置环境变量**
   在 Vercel 项目设置中添加：
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成

### 🌐 Netlify

另一个优秀的选择：

#### 部署步骤：

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署到 Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 拖拽 `dist` 文件夹到部署区域
   - 或连接 GitHub 仓库

3. **配置环境变量**
   在 Netlify 项目设置中添加环境变量

### ☁️ 其他平台

- **Cloudflare Pages** - 全球 CDN，快速部署
- **GitHub Pages** - 免费，适合静态站点
- **DigitalOcean App Platform** - 简单易用
- **AWS Amplify** - AWS 生态系统

## 部署后配置

### 1. 更新 Supabase 设置

在 Supabase 项目中：

1. **更新 URL 配置**
   - 进入 Authentication > URL Configuration
   - 添加你的生产域名到 Site URL
   - 添加到 Redirect URLs

2. **检查 RLS 策略**
   - 确认所有策略在生产环境正常工作
   - 测试权限控制

### 2. 测试生产环境

部署完成后，测试以下功能：

- ✅ 前台网站所有页面
- ✅ 管理员登录
- ✅ 文章创建和编辑
- ✅ 项目管理
- ✅ 邮件订阅
- ✅ 指标更新
- ✅ 个人资料管理

### 3. 设置自定义域名

如果使用自定义域名：

1. **在部署平台添加域名**
2. **配置 DNS 记录**
3. **更新 Supabase URL 配置**
4. **测试 SSL 证书**

## 性能优化

### 1. 图片优化

- 压缩头像和其他图片
- 使用现代图片格式 (WebP)
- 设置适当的图片尺寸

### 2. 缓存策略

- 配置静态资源缓存
- 设置 CDN 缓存规则
- 优化字体加载

### 3. 监控设置

- 设置错误监控 (如 Sentry)
- 配置性能监控
- 设置正常运行时间监控

## 安全检查清单

### 部署前安全检查

- [ ] 环境变量安全存储
- [ ] 管理员账户使用强密码
- [ ] RLS 策略正确配置
- [ ] 敏感信息未暴露在代码中
- [ ] HTTPS 已启用
- [ ] 定期备份数据库

### 生产环境安全

- [ ] 定期更新依赖
- [ ] 监控异常登录
- [ ] 设置访问日志
- [ ] 配置防火墙规则
- [ ] 定期安全审计

## 维护和更新

### 1. 内容更新

通过管理后台：
- 定期发布新文章
- 更新项目信息
- 更新指标数据
- 管理订阅者

### 2. 系统维护

- 定期检查系统性能
- 更新依赖包
- 备份重要数据
- 监控错误日志

### 3. 功能扩展

可以考虑添加：
- 评论系统
- 搜索功能
- 标签系统
- RSS 订阅
- 社交分享
- 分析统计

## 故障排除

### 常见部署问题

1. **构建失败**
   - 检查依赖版本
   - 确认环境变量
   - 查看构建日志

2. **环境变量问题**
   - 确认变量名正确
   - 检查值是否有效
   - 重新部署应用

3. **数据库连接问题**
   - 验证 Supabase URL
   - 检查 API 密钥
   - 确认网络连接

4. **权限问题**
   - 检查 RLS 策略
   - 验证管理员设置
   - 测试认证流程

## 备份策略

### 1. 数据库备份

Supabase 自动备份，但建议：
- 定期导出重要数据
- 保存本地备份
- 测试恢复流程

### 2. 代码备份

- 使用 Git 版本控制
- 定期推送到远程仓库
- 标记重要版本

### 3. 配置备份

- 保存环境变量配置
- 记录部署设置
- 文档化自定义配置

## 总结

按照本指南，你可以成功将个人网站和管理系统部署到生产环境。记住：

1. **测试优先** - 在生产环境彻底测试
2. **安全第一** - 确保所有安全措施到位
3. **监控重要** - 设置适当的监控和警报
4. **备份关键** - 定期备份重要数据

部署完成后，你将拥有一个功能完整、专业级别的个人网站！
