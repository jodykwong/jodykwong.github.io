-- 检查和设置管理员账户的完整 SQL 脚本
-- 在 Supabase SQL Editor 中运行

-- 1. 检查所有必要的表是否存在
SELECT 
    table_name,
    CASE 
        WHEN table_name IN ('profiles', 'posts', 'projects', 'newsletter_subscribers', 'metrics', 'profile_content', 'admin_logs') 
        THEN '✅ 必需表'
        ELSE '❓ 其他表'
    END as status
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. 检查 profiles 表结构
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- 3. 检查是否存在管理员用户
SELECT 
    p.id,
    p.email,
    p.is_admin,
    p.created_at,
    au.email_confirmed_at,
    au.created_at as auth_created_at
FROM profiles p
LEFT JOIN auth.users au ON p.id = au.id
WHERE p.email = '149018385@qq.com';

-- 4. 如果用户不存在，显示创建指南
-- 注意：用户必须先在 Authentication > Users 中创建，然后运行下面的 SQL

-- 5. 设置管理员权限（如果用户已存在）
UPDATE profiles 
SET is_admin = true 
WHERE email = '149018385@qq.com';

-- 6. 验证管理员设置
SELECT 
    p.id,
    p.email,
    p.is_admin,
    p.created_at,
    'Admin user setup complete' as status
FROM profiles p
WHERE p.email = '149018385@qq.com' AND p.is_admin = true;

-- 7. 检查 RLS 策略是否正确设置
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename IN ('profiles', 'posts', 'projects', 'newsletter_subscribers', 'metrics', 'profile_content', 'admin_logs')
ORDER BY tablename, policyname;

-- 8. 测试管理员权限函数
SELECT is_admin(
    (SELECT id FROM profiles WHERE email = '149018385@qq.com')
) as admin_check;

-- 如果上面的查询返回 true，说明管理员设置成功
-- 如果返回 false 或 null，说明需要检查用户创建和权限设置
