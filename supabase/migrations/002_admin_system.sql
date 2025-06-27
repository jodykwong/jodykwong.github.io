-- Add admin role to profiles table
ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;

-- Create metrics table for dashboard data
CREATE TABLE metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month_year TEXT NOT NULL, -- Format: "2024-01"
  revenue INTEGER DEFAULT 0,
  users INTEGER DEFAULT 0,
  expenses INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(month_year)
);

-- Create profile_content table for managing about page content
CREATE TABLE profile_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL, -- 'bio', 'background', 'skills', etc.
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section)
);

-- Create admin_logs table for audit trail
CREATE TABLE admin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL, -- 'create', 'update', 'delete'
  table_name TEXT NOT NULL,
  record_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_metrics_month_year ON metrics(month_year);
CREATE INDEX idx_profile_content_section ON profile_content(section);
CREATE INDEX idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_created_at ON admin_logs(created_at DESC);

-- Enable RLS on new tables
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Create admin check function
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id AND is_admin = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update existing RLS policies for admin access

-- Posts: Admins can do everything, others can only read published posts
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON posts;
CREATE POLICY "Posts are viewable by everyone or admin" ON posts 
  FOR SELECT USING (published = true OR is_admin(auth.uid()));

CREATE POLICY "Admins can insert posts" ON posts 
  FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update posts" ON posts 
  FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete posts" ON posts 
  FOR DELETE USING (is_admin(auth.uid()));

-- Projects: Admins can manage, others can only read
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON projects;
CREATE POLICY "Projects are viewable by everyone" ON projects 
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert projects" ON projects 
  FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update projects" ON projects 
  FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete projects" ON projects 
  FOR DELETE USING (is_admin(auth.uid()));

-- Newsletter subscribers: Admins can read all, anyone can subscribe
CREATE POLICY "Admins can view all subscribers" ON newsletter_subscribers 
  FOR SELECT USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete subscribers" ON newsletter_subscribers 
  FOR DELETE USING (is_admin(auth.uid()));

-- Metrics: Only admins can access
CREATE POLICY "Admins can view metrics" ON metrics 
  FOR SELECT USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert metrics" ON metrics 
  FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update metrics" ON metrics 
  FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete metrics" ON metrics 
  FOR DELETE USING (is_admin(auth.uid()));

-- Profile content: Admins can manage, everyone can read
CREATE POLICY "Profile content is viewable by everyone" ON profile_content 
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert profile content" ON profile_content 
  FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update profile content" ON profile_content 
  FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete profile content" ON profile_content 
  FOR DELETE USING (is_admin(auth.uid()));

-- Admin logs: Only admins can read their own logs
CREATE POLICY "Admins can view admin logs" ON admin_logs 
  FOR SELECT USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert admin logs" ON admin_logs 
  FOR INSERT WITH CHECK (is_admin(auth.uid()));

-- Create trigger for updated_at on new tables
CREATE TRIGGER update_metrics_updated_at BEFORE UPDATE ON metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profile_content_updated_at BEFORE UPDATE ON profile_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default profile content
INSERT INTO profile_content (section, content) VALUES
('bio', 'I''m a software developer and entrepreneur. I also write occasionally.'),
('background', 'I started my career as a software developer over a decade ago...'),
('current_focus', 'These days I mostly work on building products and helping other entrepreneurs...'),
('skills_frontend', 'React, Vue.js, Astro, TypeScript, JavaScript, Tailwind CSS, Next.js, Nuxt.js'),
('skills_backend', 'Node.js, Python, Go, PostgreSQL, MongoDB, Express, FastAPI, Gin, REST APIs, GraphQL'),
('skills_devops', 'Docker, Kubernetes, AWS, Google Cloud, GitHub Actions, CI/CD, Monitoring & Analytics'),
('skills_other', 'Product Management, Team Leadership, System Architecture, Technical Writing'),
('personal', 'When I''m not coding or writing, you can find me hiking, reading, or experimenting with new technologies...')
ON CONFLICT (section) DO NOTHING;

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS TRIGGER AS $$
BEGIN
  IF is_admin(auth.uid()) THEN
    INSERT INTO admin_logs (admin_id, action, table_name, record_id, details)
    VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      COALESCE(NEW.id, OLD.id),
      CASE 
        WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD)
        ELSE to_jsonb(NEW)
      END
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for admin logging
CREATE TRIGGER log_posts_changes AFTER INSERT OR UPDATE OR DELETE ON posts
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER log_projects_changes AFTER INSERT OR UPDATE OR DELETE ON projects
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER log_metrics_changes AFTER INSERT OR UPDATE OR DELETE ON metrics
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();
