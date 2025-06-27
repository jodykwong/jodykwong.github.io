-- Supabase 存储桶设置脚本
-- 请在 Supabase 控制台的 SQL 编辑器中运行此脚本

-- 1. 创建 images 存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'images',
    'images',
    true,
    2097152, -- 2MB
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. 启用存储对象的行级安全
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. 删除现有策略（如果存在）
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update" ON storage.objects;

-- 4. 创建公开访问策略（允许所有人查看图片）
CREATE POLICY "Public Access" ON storage.objects
    FOR SELECT USING (bucket_id = 'images');

-- 5. 创建上传策略（允许认证用户上传）
CREATE POLICY "Admin Upload" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'images' AND
        auth.uid() IS NOT NULL
    );

-- 6. 创建删除策略（允许认证用户删除）
CREATE POLICY "Admin Delete" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'images' AND
        auth.uid() IS NOT NULL
    );

-- 7. 创建更新策略（允许认证用户更新）
CREATE POLICY "Admin Update" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'images' AND
        auth.uid() IS NOT NULL
    );

-- 8. 验证设置
SELECT 
    'Storage bucket setup completed!' as status,
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
FROM storage.buckets 
WHERE id = 'images';

-- 9. 显示策略
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';
