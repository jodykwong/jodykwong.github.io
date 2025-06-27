# 部署指南

## 生产环境部署步骤

### 1. 环境准备

1. 复制环境变量文件：
   ```bash
   cp .env.example .env
   ```

2. 配置环境变量：
   - `PUBLIC_SUPABASE_URL`: Supabase 项目 URL
   - `PUBLIC_SUPABASE_ANON_KEY`: Supabase 匿名密钥
   - `SUPABASE_SERVICE_ROLE_KEY`: Supabase 服务角色密钥
   - `ADMIN_EMAIL`: 管理员邮箱
   - `PUBLIC_SITE_URL`: 网站域名
   - `PUBLIC_SITE_NAME`: 网站名称

### 2. 构建项目

```bash
# 安装依赖
npm install

# 生产环境构建
npm run build:prod

# 预览构建结果
npm run preview:prod
```

### 3. 部署选项

#### 选项 1: Vercel 部署

1. 安装 Vercel CLI：
   ```bash
   npm i -g vercel
   ```

2. 部署：
   ```bash
   vercel --prod
   ```

#### 选项 2: Netlify 部署

1. 构建设置：
   - Build command: `npm run build:prod`
   - Publish directory: `dist`

2. 环境变量：在 Netlify 控制台中配置所有环境变量

#### 选项 3: 自托管

1. 构建项目：
   ```bash
   npm run build:prod
   ```

2. 将 `dist` 目录内容上传到服务器

3. 配置 Web 服务器（Nginx/Apache）

### 4. 数据库设置

1. 在 Supabase 中创建必要的表结构
2. 运行初始化脚本设置存储桶
3. 配置 Row Level Security (RLS) 策略

### 5. 域名和 SSL

1. 配置域名 DNS 记录
2. 启用 HTTPS/SSL 证书
3. 更新环境变量中的 `PUBLIC_SITE_URL`

### 6. 性能优化

- 启用 CDN
- 配置缓存策略
- 监控网站性能

### 7. 安全检查

- 验证所有敏感信息已从代码中移除
- 确认环境变量正确配置
- 测试管理员登录功能
- 验证 RLS 策略正常工作

## 故障排除

### 常见问题

1. **构建失败**：检查 Node.js 版本和依赖
2. **Supabase 连接失败**：验证环境变量配置
3. **管理员无法登录**：检查 ADMIN_EMAIL 配置
4. **图片上传失败**：验证存储桶配置

### 日志查看

- 浏览器控制台错误
- 服务器日志
- Supabase 日志

## 维护

### 定期任务

1. 更新依赖包
2. 备份数据库
3. 监控性能指标
4. 检查安全更新

### 更新部署

```bash
# 拉取最新代码
git pull origin main

# 安装新依赖
npm install

# 构建并部署
npm run build:prod
```
