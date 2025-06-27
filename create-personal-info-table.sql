-- 创建 personal_info 表
-- 在 Supabase SQL 编辑器中运行此脚本

-- 1. 创建 personal_info 表
CREATE TABLE IF NOT EXISTS public.personal_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 启用行级安全 (RLS)
ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;

-- 3. 创建更新时间触发器函数（如果不存在）
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. 创建更新时间触发器
DROP TRIGGER IF EXISTS handle_personal_info_updated_at ON public.personal_info;
CREATE TRIGGER handle_personal_info_updated_at
    BEFORE UPDATE ON public.personal_info
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 5. 创建 RLS 策略

-- 删除现有策略（如果存在）
DROP POLICY IF EXISTS "Enable read access for all users" ON public.personal_info;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.personal_info;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.personal_info;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.personal_info;

-- 允许所有人读取个人信息（公开信息）
CREATE POLICY "Enable read access for all users" ON public.personal_info
    FOR SELECT USING (true);

-- 只允许认证用户插入
CREATE POLICY "Enable insert for authenticated users only" ON public.personal_info
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 只允许认证用户更新
CREATE POLICY "Enable update for authenticated users only" ON public.personal_info
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- 只允许认证用户删除
CREATE POLICY "Enable delete for authenticated users only" ON public.personal_info
    FOR DELETE USING (auth.uid() IS NOT NULL);

-- 6. 插入默认数据（如果表为空）
INSERT INTO public.personal_info (name, title, bio, avatar_url)
SELECT 
    'Your Name',
    'Your Title',
    'Your bio goes here...',
    NULL
WHERE NOT EXISTS (SELECT 1 FROM public.personal_info);

-- 7. 验证表创建
SELECT 
    'personal_info table created successfully!' as status,
    COUNT(*) as record_count
FROM public.personal_info;

-- 8. 显示表结构
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'personal_info' 
AND table_schema = 'public'
ORDER BY ordinal_position;
