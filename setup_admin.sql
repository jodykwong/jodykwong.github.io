-- 设置管理员账户的 SQL 脚本
-- 邮箱: 149018385@qq.com
-- 密码: admin123

-- 方法1: 如果用户已经通过注册流程创建了账户
-- 直接将现有用户设置为管理员
UPDATE profiles 
SET is_admin = true 
WHERE email = '149018385@qq.com';

-- 方法2: 如果需要直接在数据库中创建用户（不推荐，建议通过注册流程）
-- 注意：这种方法需要手动处理密码哈希，建议使用 Supabase Auth 注册流程

-- 检查用户是否已存在
SELECT id, email, is_admin 
FROM profiles 
WHERE email = '149018385@qq.com';

-- 如果用户不存在，需要先通过以下方式之一创建：
-- 1. 访问网站注册页面（如果有）
-- 2. 使用 Supabase Dashboard 的 Authentication 面板手动创建
-- 3. 使用以下临时注册脚本（需要在客户端运行）

-- 验证管理员设置是否成功
SELECT 
    p.id,
    p.email,
    p.is_admin,
    p.created_at
FROM profiles p
WHERE p.email = '149018385@qq.com' AND p.is_admin = true;
