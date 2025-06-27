-- 个人网站数据库迁移脚本
-- 运行此脚本来设置个人信息和头像管理功能

-- 1. 创建个人信息表
CREATE TABLE IF NOT EXISTS personal_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title TEXT,
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为 personal_info 表创建触发器
DROP TRIGGER IF EXISTS update_personal_info_updated_at ON personal_info;
CREATE TRIGGER update_personal_info_updated_at
    BEFORE UPDATE ON personal_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 为 profile_content 表创建触发器（如果还没有的话）
DROP TRIGGER IF EXISTS update_profile_content_updated_at ON profile_content;
CREATE TRIGGER update_profile_content_updated_at
    BEFORE UPDATE ON profile_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 3. 创建存储桶（如果还没有的话）
-- 注意：这需要在 Supabase 控制台中手动创建，或者使用 Supabase CLI
-- 存储桶名称：images
-- 公开访问：是
-- 允许的文件类型：image/*

-- 4. 插入默认个人信息（如果表为空）
INSERT INTO personal_info (name, title, bio, avatar_url)
SELECT 
    'Your Name',
    'Full-Stack Developer, Maker of Products, and Solopreneur',
    'I''m a software developer and entrepreneur. I also write occasionally.',
    '/images/avatar.jpg'
WHERE NOT EXISTS (SELECT 1 FROM personal_info);

-- 5. 插入默认内容部分（如果不存在）
INSERT INTO profile_content (section, content)
VALUES 
    ('current_focus', 'These days I mostly work on <a href="#" class="text-primary hover:underline font-medium">My SaaS Product: the amazing boilerplate</a>. I also made <a href="#" class="text-primary hover:underline font-medium">My Cool App</a>—what I hope is the best way to solve a specific problem on the internet.')
ON CONFLICT (section) DO NOTHING;

INSERT INTO profile_content (section, content)
VALUES 
    ('writing_sharing', 'This site originated during a six-month sabbatical I took from my day job where I tried to launch a profitable product. I <a href="/writing" class="text-primary hover:underline font-medium">documented that journey here</a>. I also write occasionally <a href="/software" class="text-primary hover:underline font-medium">about building software</a>.')
ON CONFLICT (section) DO NOTHING;

INSERT INTO profile_content (section, content)
VALUES 
    ('experience', 'From 2015-2023 I served as CTO of <a href="#" class="text-primary hover:underline font-medium">Amazing Company</a> and led the team that builds its flagship product: <a href="#" class="text-primary hover:underline font-medium">Awesome Product</a>. I''m now an advisor to the organization.')
ON CONFLICT (section) DO NOTHING;

INSERT INTO profile_content (section, content)
VALUES 
    ('background', 'I started my career as a software developer over a decade ago, working with various technologies and learning the ins and outs of building scalable web applications. Over the years, I''ve had the opportunity to work with startups, established companies, and everything in between.')
ON CONFLICT (section) DO NOTHING;

INSERT INTO profile_content (section, content)
VALUES 
    ('skills_frontend', '• React, Vue.js, Astro
• TypeScript, JavaScript
• Tailwind CSS, Styled Components
• Next.js, Nuxt.js')
ON CONFLICT (section) DO NOTHING;

INSERT INTO profile_content (section, content)
VALUES 
    ('skills_backend', '• Node.js, Python, Go
• PostgreSQL, MongoDB
• Express, FastAPI, Gin
• REST APIs, GraphQL')
ON CONFLICT (section) DO NOTHING;

INSERT INTO profile_content (section, content)
VALUES 
    ('skills_devops', '• Docker, Kubernetes
• AWS, Google Cloud
• GitHub Actions, CI/CD
• Monitoring & Analytics')
ON CONFLICT (section) DO NOTHING;

INSERT INTO profile_content (section, content)
VALUES 
    ('skills_other', '• Product Management
• Team Leadership
• System Architecture
• Technical Writing')
ON CONFLICT (section) DO NOTHING;

INSERT INTO profile_content (section, content)
VALUES 
    ('personal', 'When I''m not coding or writing, you can find me hiking, reading, or experimenting with new technologies. I''m based in [Your City] and love the local tech community here. I''m always up for a coffee chat about technology, startups, or anything interesting.')
ON CONFLICT (section) DO NOTHING;

-- 6. 设置行级安全策略（RLS）
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_content ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取个人信息（公开展示）
CREATE POLICY "Allow public read access to personal_info" ON personal_info
    FOR SELECT USING (true);

-- 只允许管理员修改个人信息
CREATE POLICY "Allow admin update access to personal_info" ON personal_info
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = true
        )
    );

-- 允许所有人读取内容
CREATE POLICY "Allow public read access to profile_content" ON profile_content
    FOR SELECT USING (true);

-- 只允许管理员修改内容
CREATE POLICY "Allow admin update access to profile_content" ON profile_content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = true
        )
    );

-- 完成提示
SELECT 'Database migration completed successfully!' as status;
