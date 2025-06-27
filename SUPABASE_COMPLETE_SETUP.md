# Supabase 完整配置指南

## 问题诊断

如果无法登录管理后台，通常是因为：
1. ❌ 没有创建 Supabase 项目
2. ❌ 没有配置环境变量
3. ❌ 没有运行数据库迁移
4. ❌ 没有创建管理员账户

让我们一步步解决这些问题。

## 第一步：创建 Supabase 项目

### 1. 注册 Supabase 账户
1. 访问 [supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 使用 GitHub、Google 或邮箱注册

### 2. 创建新项目
1. 登录后点击 "New Project"
2. 选择组织（如果是第一次使用，会自动创建）
3. 填写项目信息：
   - **Project name**: `personal-website` (或你喜欢的名字)
   - **Database Password**: 设置一个强密码（记住这个密码！）
   - **Region**: 选择离你最近的地区（如 `Southeast Asia (Singapore)`）
4. 点击 "Create new project"
5. 等待项目创建完成（通常需要 1-2 分钟）

## 第二步：获取项目凭据

项目创建完成后：

### 1. 获取 API 凭据
1. 在项目仪表板中，点击左侧的 **Settings** ⚙️
2. 选择 **API** 选项卡
3. 你会看到以下信息：

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. 复制这些值
- **Project URL**: 以 `https://` 开头，以 `.supabase.co` 结尾
- **anon public key**: 很长的字符串，以 `eyJ` 开头
- **service_role key**: 另一个长字符串，以 `eyJ` 开头

## 第三步：配置环境变量

### 1. 创建 .env 文件
在项目根目录创建 `.env` 文件：

```bash
# 在项目根目录运行
cp .env.example .env
```

### 2. 编辑 .env 文件
用你的实际值替换以下内容：

```env
# Supabase Configuration
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: For server-side operations
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**重要**: 
- 替换 `your-project-id` 为你的实际项目 ID
- 替换 `eyJ...` 为你的实际 API 密钥
- 不要在密钥周围添加引号

## 第四步：运行数据库迁移

### 1. 运行基础迁移
1. 在 Supabase Dashboard 中，点击左侧的 **SQL Editor**
2. 点击 **New query**
3. 复制 `supabase/migrations/001_initial_schema.sql` 的全部内容
4. 粘贴到编辑器中
5. 点击 **Run** 按钮

### 2. 运行管理系统迁移
1. 创建另一个新查询
2. 复制 `supabase/migrations/002_admin_system.sql` 的全部内容
3. 粘贴并运行

### 3. 验证迁移
运行以下查询检查表是否创建成功：

```sql
-- 检查所有表
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

你应该看到这些表：
- `profiles`
- `posts`
- `projects`
- `newsletter_subscribers`
- `metrics`
- `profile_content`
- `admin_logs`

## 第五步：创建管理员账户

### 方法 1: 在 Supabase Dashboard 创建

1. **创建用户**
   - 在 Supabase Dashboard 中，点击 **Authentication** > **Users**
   - 点击 **Add user** 按钮
   - 填写信息：
     ```
     Email: 149018385@qq.com
     Password: admin123
     Auto Confirm User: ✅ (必须勾选)
     ```
   - 点击 **Create user**

2. **设置管理员权限**
   - 回到 **SQL Editor**
   - 运行以下 SQL：
   ```sql
   UPDATE profiles 
   SET is_admin = true 
   WHERE email = '149018385@qq.com';
   ```

3. **验证设置**
   ```sql
   SELECT id, email, is_admin, created_at
   FROM profiles 
   WHERE email = '149018385@qq.com';
   ```

## 第六步：重启开发服务器

配置完成后，必须重启开发服务器：

```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
npm run dev
```

## 第七步：测试登录

1. **访问管理登录页面**
   ```
   http://localhost:4321/admin/login
   ```

2. **使用凭据登录**
   - 邮箱: `149018385@qq.com`
   - 密码: `admin123`

3. **检查浏览器控制台**
   - 按 F12 打开开发者工具
   - 查看 Console 选项卡是否有错误

## 故障排除

### 问题 1: "Missing Supabase environment variables"

**解决方案:**
- 检查 `.env` 文件是否存在
- 确认环境变量名称正确（必须以 `PUBLIC_` 开头）
- 重启开发服务器

### 问题 2: "Invalid API key"

**解决方案:**
- 重新复制 API 密钥，确保完整
- 检查是否有多余的空格或换行
- 确认使用的是 `anon public` 密钥

### 问题 3: "User not found" 或 "Access denied"

**解决方案:**
```sql
-- 检查用户是否存在
SELECT * FROM auth.users WHERE email = '149018385@qq.com';

-- 检查 profile 是否存在
SELECT * FROM profiles WHERE email = '149018385@qq.com';

-- 如果 profile 不存在，手动创建
INSERT INTO profiles (id, email, is_admin)
SELECT id, email, true
FROM auth.users 
WHERE email = '149018385@qq.com';
```

### 问题 4: 网络连接错误

**解决方案:**
- 检查网络连接
- 确认 Supabase 项目状态为 "Active"
- 尝试在浏览器中直接访问 Supabase URL

## 验证清单

完成配置后，检查以下项目：

- [ ] Supabase 项目已创建并处于活跃状态
- [ ] `.env` 文件已创建并包含正确的凭据
- [ ] 所有数据库迁移已运行
- [ ] 管理员用户已创建
- [ ] `is_admin` 权限已设置
- [ ] 开发服务器已重启
- [ ] 可以访问 `/admin/login` 页面
- [ ] 可以成功登录管理后台

如果所有步骤都完成但仍无法登录，请提供：
1. 浏览器控制台的错误信息
2. Supabase 项目的状态
3. `.env` 文件的内容（隐藏敏感信息）
