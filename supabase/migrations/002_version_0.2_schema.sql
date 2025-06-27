-- 版本 0.2 数据库迁移脚本
-- 创建日期: 2025-06-27
-- 描述: 为版本 0.2 新功能创建数据库表和配置

-- =====================================================
-- 1. 博客文章管理系统
-- =====================================================

-- 博客分类表
CREATE TABLE blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#0ea5e9', -- 十六进制颜色代码
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 博客文章表
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES profiles(id),
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER DEFAULT 0, -- 预计阅读时间（分钟）
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 文章分类关联表
CREATE TABLE blog_post_categories (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- =====================================================
-- 2. 项目详情扩展
-- =====================================================

-- 扩展现有 projects 表
ALTER TABLE projects ADD COLUMN IF NOT EXISTS detailed_description TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS screenshots TEXT[] DEFAULT '{}'; -- 截图 URL 数组
ALTER TABLE projects ADD COLUMN IF NOT EXISTS demo_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}'; -- 功能特性数组
ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenges TEXT; -- 开发挑战
ALTER TABLE projects ADD COLUMN IF NOT EXISTS lessons_learned TEXT; -- 经验总结
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_timeline JSONB; -- 项目时间线
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE; -- URL slug

-- 为现有项目生成 slug（如果不存在）
UPDATE projects 
SET slug = LOWER(REPLACE(REPLACE(title, ' ', '-'), '''', ''))
WHERE slug IS NULL;

-- =====================================================
-- 3. 多语言支持
-- =====================================================

-- 多语言内容表
CREATE TABLE content_translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type VARCHAR(50) NOT NULL, -- 'personal_info', 'blog_post', 'project', 'social_link'
  content_id UUID NOT NULL,
  language_code VARCHAR(5) NOT NULL, -- 'zh-CN', 'en-US'
  field_name VARCHAR(100) NOT NULL, -- 'title', 'description', 'content'
  translated_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(content_type, content_id, language_code, field_name)
);

-- =====================================================
-- 4. SEO 优化
-- =====================================================

-- SEO 元数据表
CREATE TABLE seo_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_type VARCHAR(50) NOT NULL, -- 'home', 'blog_post', 'project', 'about'
  page_id UUID, -- 关联的内容 ID（可为空，用于静态页面）
  title VARCHAR(255),
  description TEXT,
  keywords TEXT[],
  og_title VARCHAR(255),
  og_description TEXT,
  og_image_url TEXT,
  twitter_title VARCHAR(255),
  twitter_description TEXT,
  twitter_image_url TEXT,
  canonical_url TEXT,
  robots VARCHAR(100) DEFAULT 'index,follow',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_type, page_id)
);

-- =====================================================
-- 5. 创建索引
-- =====================================================

-- 博客文章索引
CREATE INDEX idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- 博客分类索引
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX idx_blog_categories_sort ON blog_categories(sort_order);

-- 项目索引
CREATE INDEX idx_projects_slug ON projects(slug);

-- 多语言内容索引
CREATE INDEX idx_content_translations_lookup ON content_translations(content_type, content_id, language_code);

-- SEO 元数据索引
CREATE INDEX idx_seo_metadata_page ON seo_metadata(page_type, page_id);

-- =====================================================
-- 6. 行级安全策略 (RLS)
-- =====================================================

-- 启用 RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;

-- 博客分类策略
CREATE POLICY "Allow public read access to blog categories" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage blog categories" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- 博客文章策略
CREATE POLICY "Allow public read access to published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Allow authenticated users to manage blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- 文章分类关联策略
CREATE POLICY "Allow public read access to blog post categories" ON blog_post_categories
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage blog post categories" ON blog_post_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- 多语言内容策略
CREATE POLICY "Allow public read access to translations" ON content_translations
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage translations" ON content_translations
  FOR ALL USING (auth.role() = 'authenticated');

-- SEO 元数据策略
CREATE POLICY "Allow public read access to seo metadata" ON seo_metadata
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage seo metadata" ON seo_metadata
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 7. 插入默认数据
-- =====================================================

-- 默认博客分类
INSERT INTO blog_categories (name, slug, description, color, sort_order) VALUES
('技术分享', 'tech', '技术相关的文章和教程', '#0ea5e9', 1),
('产品开发', 'product', '产品开发经验和思考', '#8b5cf6', 2),
('创业心得', 'startup', '创业过程中的经验分享', '#ec4899', 3),
('生活感悟', 'life', '生活中的思考和感悟', '#10b981', 4);

-- 默认 SEO 元数据
INSERT INTO seo_metadata (page_type, title, description, keywords, og_title, og_description) VALUES
('home', 'Jody Kwong - Full-Stack Developer & Entrepreneur', 'Personal website of Jody Kwong, a full-stack developer and entrepreneur sharing insights on technology, product development, and startup journey.', ARRAY['Jody Kwong', 'Full-Stack Developer', 'Entrepreneur', 'Technology', 'Startup'], 'Jody Kwong - Developer & Entrepreneur', 'Explore the journey of a full-stack developer and entrepreneur'),
('blog', 'Blog - Jody Kwong', 'Read articles about technology, product development, and entrepreneurship insights.', ARRAY['Blog', 'Technology', 'Development', 'Startup', 'Programming'], 'Blog - Tech & Startup Insights', 'Latest articles on technology and entrepreneurship'),
('projects', 'Projects - Jody Kwong', 'Explore the projects and products built by Jody Kwong.', ARRAY['Projects', 'Portfolio', 'Development', 'Products'], 'Projects Portfolio', 'Discover innovative projects and products'),
('about', 'About - Jody Kwong', 'Learn more about Jody Kwong, full-stack developer and entrepreneur.', ARRAY['About', 'Biography', 'Experience', 'Skills'], 'About Jody Kwong', 'Full-stack developer and entrepreneur story');

-- =====================================================
-- 8. 触发器和函数
-- =====================================================

-- 更新时间戳触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为新表添加更新时间戳触发器
CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_translations_updated_at BEFORE UPDATE ON content_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_seo_metadata_updated_at BEFORE UPDATE ON seo_metadata FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 自动生成 slug 函数
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN LOWER(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                TRIM(input_text),
                '[^a-zA-Z0-9\u4e00-\u9fff\s-]', '', 'g'
            ),
            '\s+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- 博客文章 slug 自动生成触发器
CREATE OR REPLACE FUNCTION auto_generate_blog_post_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.title);
        
        -- 确保 slug 唯一性
        WHILE EXISTS (SELECT 1 FROM blog_posts WHERE slug = NEW.slug AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)) LOOP
            NEW.slug = NEW.slug || '-' || EXTRACT(EPOCH FROM NOW())::INTEGER;
        END LOOP;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_generate_blog_post_slug_trigger
    BEFORE INSERT OR UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION auto_generate_blog_post_slug();

-- =====================================================
-- 9. 视图创建
-- =====================================================

-- 博客文章详情视图（包含分类信息）
CREATE VIEW blog_posts_with_categories AS
SELECT 
    bp.*,
    COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', bc.id,
                'name', bc.name,
                'slug', bc.slug,
                'color', bc.color
            )
        ) FILTER (WHERE bc.id IS NOT NULL),
        '[]'::json
    ) as categories
FROM blog_posts bp
LEFT JOIN blog_post_categories bpc ON bp.id = bpc.post_id
LEFT JOIN blog_categories bc ON bpc.category_id = bc.id
GROUP BY bp.id;

-- 项目详情视图（包含翻译信息）
CREATE VIEW projects_with_translations AS
SELECT 
    p.*,
    COALESCE(
        JSON_OBJECT_AGG(
            ct.language_code,
            JSON_BUILD_OBJECT(
                ct.field_name, ct.translated_content
            )
        ) FILTER (WHERE ct.id IS NOT NULL),
        '{}'::json
    ) as translations
FROM projects p
LEFT JOIN content_translations ct ON p.id = ct.content_id AND ct.content_type = 'project'
GROUP BY p.id;

-- =====================================================
-- 迁移完成
-- =====================================================

-- 记录迁移版本
INSERT INTO schema_migrations (version, applied_at) VALUES ('002_version_0.2_schema', NOW())
ON CONFLICT (version) DO NOTHING;
