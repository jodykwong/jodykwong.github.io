# 🔧 GitHub Pages 部署故障排除指南

## 🚨 常见问题及解决方案

### 1. 部署失败问题

#### ❌ GitHub Actions 构建失败

**症状：** Actions标签显示红色❌，构建过程中断

**可能原因：**
- Node.js版本不兼容
- 依赖安装失败
- 环境变量缺失
- 构建脚本错误

**解决方案：**
```bash
# 1. 检查本地构建是否正常
npm run build:github

# 2. 检查package.json中的脚本
npm run pre-deploy

# 3. 验证环境变量
npm run verify-env
```

**详细排查：**
1. 查看Actions日志中的具体错误信息
2. 确保所有必需的Secrets都已配置
3. 检查astro.config.mjs配置是否正确

#### ❌ 权限错误

**症状：** `Error: Resource not accessible by integration`

**解决方案：**
1. 进入仓库 `Settings` > `Actions` > `General`
2. 在 "Workflow permissions" 部分选择 "Read and write permissions"
3. 勾选 "Allow GitHub Actions to create and approve pull requests"

#### ❌ Pages部署失败

**症状：** 构建成功但Pages部署失败

**解决方案：**
1. 确保仓库设置中Pages源设置为 "GitHub Actions"
2. 检查是否有CNAME文件冲突
3. 验证dist目录是否正确生成

### 2. 网站访问问题

#### ❌ 404 页面未找到

**症状：** 访问网站显示404错误

**可能原因：**
- GitHub Pages未正确启用
- 部署未完成
- 路径配置错误

**解决方案：**
```bash
# 检查部署状态
npm run verify-deployment https://yourusername.github.io

# 检查仓库Pages设置
# Settings > Pages > Source应该是"GitHub Actions"
```

#### ❌ 子页面404错误

**症状：** 首页正常，子页面（如/about）显示404

**原因：** 静态站点路由问题

**解决方案：**
1. 确保astro.config.mjs中设置了 `output: 'static'`
2. 检查页面文件是否正确生成在dist目录中
3. 验证路由配置是否正确

#### ❌ 资源加载失败

**症状：** 页面显示但样式丢失，图片无法加载

**原因：** 静态资源路径配置错误

**解决方案：**
1. 检查astro.config.mjs中的base配置
2. 确保所有资源使用相对路径
3. 验证public目录中的文件是否正确复制

### 3. 功能问题

#### ❌ Supabase连接失败

**症状：** 页面显示但动态内容无法加载

**排查步骤：**
```bash
# 1. 检查环境变量
echo $PUBLIC_SUPABASE_URL
echo $PUBLIC_SUPABASE_ANON_KEY

# 2. 验证Supabase项目状态
# 登录Supabase控制台检查项目是否正常运行

# 3. 检查网络请求
# 在浏览器开发者工具中查看Network标签
```

**解决方案：**
1. 验证Supabase URL和密钥是否正确
2. 检查Supabase项目是否暂停（免费版有限制）
3. 确认RLS策略是否正确配置

#### ❌ 主题切换不工作

**症状：** 点击主题切换按钮无反应

**解决方案：**
1. 检查浏览器控制台是否有JavaScript错误
2. 验证主题切换脚本是否正确加载
3. 确认CSS变量是否正确定义

#### ❌ 环境变量未生效

**症状：** 网站显示默认值而不是配置的值

**排查：**
```bash
# 检查构建日志中的环境变量
# 在GitHub Actions日志中查找环境变量相关信息
```

**解决方案：**
1. 确认Secrets名称完全匹配（区分大小写）
2. 检查是否有多余的空格
3. 验证PUBLIC_前缀是否正确使用

### 4. 性能问题

#### ⚠️ 网站加载缓慢

**优化方案：**
1. 启用图片压缩（已在配置中）
2. 检查是否有大文件未优化
3. 使用浏览器开发者工具分析性能

#### ⚠️ 移动端显示问题

**解决方案：**
1. 测试响应式设计
2. 检查viewport meta标签
3. 验证触摸交互功能

### 5. 部署流程问题

#### ❌ 自动部署未触发

**症状：** 推送代码后没有自动部署

**检查项：**
1. 确认推送到了main分支
2. 检查.github/workflows/deploy.yml文件是否存在
3. 验证工作流语法是否正确

#### ❌ 部署时间过长

**症状：** 部署超过10分钟仍未完成

**解决方案：**
1. 检查依赖安装是否卡住
2. 优化构建脚本
3. 考虑使用缓存策略

## 🔍 调试工具和方法

### 本地调试
```bash
# 模拟GitHub Pages环境
GITHUB_ACTIONS=true npm run build:github

# 本地预览
npm run preview:github

# 检查构建输出
ls -la dist/
```

### 在线调试工具
- [GitHub Pages Health Check](https://github.com/github/pages-health-check)
- [GTmetrix](https://gtmetrix.com/) - 性能分析
- [Google PageSpeed Insights](https://pagespeed.web.dev/) - 性能优化建议

### 日志分析
1. **GitHub Actions日志**
   - 点击失败的工作流查看详细日志
   - 查找错误关键词：Error、Failed、Exception

2. **浏览器控制台**
   - F12打开开发者工具
   - 查看Console标签的错误信息
   - 检查Network标签的请求状态

3. **Supabase日志**
   - 登录Supabase控制台
   - 查看API使用情况和错误日志

## 📞 获取帮助

### 社区资源
- [Astro Discord](https://astro.build/chat)
- [GitHub Community](https://github.community/)
- [Supabase Discord](https://discord.supabase.com/)

### 官方文档
- [GitHub Pages文档](https://docs.github.com/en/pages)
- [Astro部署指南](https://docs.astro.build/en/guides/deploy/)
- [Supabase文档](https://supabase.com/docs)

### 报告问题
如果遇到无法解决的问题，请提供：
1. 错误信息的完整截图
2. GitHub Actions的日志链接
3. 浏览器控制台的错误信息
4. 操作系统和浏览器版本

---

**提示：** 大多数问题都可以通过仔细检查配置和日志来解决。保持耐心，逐步排查！
