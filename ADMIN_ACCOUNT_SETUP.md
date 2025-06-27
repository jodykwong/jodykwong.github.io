# 管理员账户设置指南

## 目标
设置 `149018385@qq.com` 为管理员账户，密码为 `admin123`

## 方法一：使用创建工具（推荐）

1. **打开创建工具**
   - 在浏览器中打开 `create_admin_user.html` 文件
   - 或者将文件内容复制到一个 HTML 文件中打开

2. **获取 Supabase 凭据**
   - 登录 [Supabase Dashboard](https://supabase.com/dashboard)
   - 选择你的项目
   - 进入 Settings > API
   - 复制 Project URL 和 anon public key

3. **填写信息**
   - Supabase URL: `https://your-project-id.supabase.co`
   - Supabase Anon Key: `your-anon-key`
   - 管理员邮箱: `149018385@qq.com`
   - 密码: `admin123`

4. **创建账户**
   - 点击"创建管理员账户"按钮
   - 等待创建完成

## 方法二：手动创建（备选）

### 步骤 1: 在 Supabase Dashboard 创建用户

1. 登录 Supabase Dashboard
2. 进入 Authentication > Users
3. 点击 "Add user"
4. 填写信息：
   - Email: `149018385@qq.com`
   - Password: `admin123`
   - Auto Confirm User: ✅ (勾选)
5. 点击 "Create user"

### 步骤 2: 设置管理员权限

1. 进入 SQL Editor
2. 运行以下 SQL：

```sql
-- 设置管理员权限
UPDATE profiles 
SET is_admin = true 
WHERE email = '149018385@qq.com';

-- 验证设置
SELECT id, email, is_admin, created_at
FROM profiles 
WHERE email = '149018385@qq.com';
```

## 方法三：通过网站注册（如果启用了注册功能）

1. 访问你的网站
2. 如果有注册页面，使用以下信息注册：
   - 邮箱: `149018385@qq.com`
   - 密码: `admin123`
3. 注册成功后，在 Supabase SQL Editor 中运行：

```sql
UPDATE profiles 
SET is_admin = true 
WHERE email = '149018385@qq.com';
```

## 验证设置

### 1. 检查数据库

在 Supabase SQL Editor 中运行：

```sql
SELECT 
    id,
    email,
    is_admin,
    created_at,
    updated_at
FROM profiles 
WHERE email = '149018385@qq.com';
```

应该看到 `is_admin` 字段为 `true`。

### 2. 测试登录

1. 访问 `http://localhost:4321/admin/login`
2. 使用以下凭据登录：
   - 邮箱: `149018385@qq.com`
   - 密码: `admin123`
3. 如果登录成功，会重定向到管理仪表板

## 故障排除

### 问题 1: 用户创建失败

**可能原因:**
- 邮箱已存在
- 密码不符合要求
- Supabase 配置错误

**解决方案:**
- 检查用户是否已存在
- 确认密码符合 Supabase 密码策略
- 验证 Supabase 项目配置

### 问题 2: 权限设置失败

**可能原因:**
- 数据库迁移未运行
- profiles 表不存在
- RLS 策略阻止更新

**解决方案:**
```sql
-- 检查 profiles 表是否存在
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'profiles';

-- 检查 is_admin 列是否存在
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'profiles' AND column_name = 'is_admin';

-- 如果列不存在，添加它
ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
```

### 问题 3: 登录失败

**可能原因:**
- 密码错误
- 用户未确认邮箱
- 管理员权限未设置

**解决方案:**
```sql
-- 检查用户状态
SELECT 
    au.email,
    au.email_confirmed_at,
    au.created_at as auth_created,
    p.is_admin,
    p.created_at as profile_created
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE au.email = '149018385@qq.com';

-- 如果需要，手动确认邮箱
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = '149018385@qq.com';
```

## 安全建议

1. **更改默认密码**
   - 首次登录后立即更改密码
   - 使用强密码

2. **启用两步验证**（如果 Supabase 支持）
   - 增加账户安全性

3. **定期检查权限**
   - 定期审查管理员账户
   - 移除不需要的权限

## 完成确认

设置完成后，你应该能够：

- ✅ 使用 `149018385@qq.com` 和 `admin123` 登录
- ✅ 访问管理仪表板
- ✅ 管理文章、项目等内容
- ✅ 查看所有管理功能

如果遇到问题，请检查：
1. 数据库迁移是否完成
2. 环境变量是否正确配置
3. Supabase 项目是否正常运行
