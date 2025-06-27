import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  author_id: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  github_url?: string;
  status: 'active' | 'maintained' | 'archived';
  technologies: string[];
  created_at: string;
  updated_at: string;
  // 版本 0.2 新增字段
  slug?: string;
  detailed_description?: string;
  screenshots?: string[];
  demo_url?: string;
  features?: string[];
  challenges?: string;
  lessons_learned?: string;
  project_timeline?: any; // JSONB 类型
}

export interface Metrics {
  id: string;
  month_year: string;
  revenue: number;
  users: number;
  expenses: number;
  created_at: string;
  updated_at: string;
}

export interface ProfileContent {
  id: string;
  section: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PersonalInfo {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminLog {
  id: string;
  admin_id: string;
  action: string;
  table_name: string;
  record_id?: string;
  details?: any;
  created_at: string;
}

// Helper functions for common operations
export async function getPublishedPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data as Post[];
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data as Post;
}

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data as Project[];
}

export async function subscribeToNewsletter(email: string) {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }]);

  if (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Admin authentication functions
export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', data.user.id)
    .single();

  if (!profile?.is_admin) {
    await supabase.auth.signOut();
    return { success: false, error: 'Access denied. Admin privileges required.' };
  }

  return { success: true, data };
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  return { success: !error, error: error?.message };
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function isCurrentUserAdmin() {
  const user = await getCurrentUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  return profile?.is_admin || false;
}

// Admin CRUD functions for posts
export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }

  return data as Post[];
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function updatePost(id: string, updates: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Admin CRUD functions for projects
export async function getAllProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }

  return data as Project[];
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Newsletter subscribers management
export async function getAllSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscribers:', error);
    return [];
  }

  return data;
}

export async function deleteSubscriber(id: string) {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting subscriber:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Metrics management
export async function getAllMetrics() {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .order('month_year', { ascending: false });

  if (error) {
    console.error('Error fetching metrics:', error);
    return [];
  }

  return data as Metrics[];
}

export async function getLatestMetrics() {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .order('month_year', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching latest metrics:', error);
    return null;
  }

  return data as Metrics;
}

export async function upsertMetrics(metrics: Omit<Metrics, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('metrics')
    .upsert([metrics], { onConflict: 'month_year' })
    .select()
    .single();

  if (error) {
    console.error('Error upserting metrics:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Profile content management
export async function getAllProfileContent() {
  const { data, error } = await supabase
    .from('profile_content')
    .select('*')
    .order('section');

  if (error) {
    console.error('Error fetching profile content:', error);
    return [];
  }

  return data as ProfileContent[];
}

export async function getProfileContentBySection(section: string) {
  const { data, error } = await supabase
    .from('profile_content')
    .select('*')
    .eq('section', section)
    .single();

  if (error) {
    console.error('Error fetching profile content:', error);
    return null;
  }

  return data as ProfileContent;
}

export async function upsertProfileContent(content: Omit<ProfileContent, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('profile_content')
    .upsert([content], { onConflict: 'section' })
    .select()
    .single();

  if (error) {
    console.error('Error upserting profile content:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Personal info management
export async function getPersonalInfo() {
  const { data, error } = await supabase
    .from('personal_info')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching personal info:', error);
    return null;
  }

  if (!data || data.length === 0) {

    return null;
  }

  return data[0] as PersonalInfo;
}

export async function upsertPersonalInfo(info: Omit<PersonalInfo, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('personal_info')
      .upsert([info])
      .select()
      .single();

    if (error) {
      console.error('Error upserting personal info:', error);
      return {
        success: false,
        error: error.message || 'Failed to update personal info. Please check if the personal_info table exists.'
      };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error in upsertPersonalInfo:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An unexpected error occurred while updating personal info.'
    };
  }
}

// Avatar upload function
export async function uploadAvatar(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `avatar-${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    console.error('Error uploading avatar:', error);
    return { success: false, error: error.message };
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return { success: true, data: { path: filePath, url: publicUrl } };
}

// Delete old avatar
export async function deleteAvatar(path: string) {
  const { error } = await supabase.storage
    .from('images')
    .remove([path]);

  if (error) {
    console.error('Error deleting avatar:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Social Links Types and Functions
export interface SocialLink {
  id: string;
  platform: string;
  url: string | null;
  display_name: string | null;
  is_enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Get all social links
export async function getSocialLinks() {
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .eq('is_enabled', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching social links:', error);
    return [];
  }

  return data as SocialLink[];
}

// Get all social links for admin (including disabled)
export async function getAllSocialLinks() {
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching all social links:', error);
    return [];
  }

  return data as SocialLink[];
}

// Update social link
export async function updateSocialLink(id: string, updates: Partial<SocialLink>) {
  const { data, error } = await supabase
    .from('social_links')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating social link:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// =====================================================
// 博客文章管理系统 (版本 0.2)
// =====================================================

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  published: boolean;
  published_at?: string;
  author_id: string;
  tags: string[];
  reading_time: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPostWithCategories extends BlogPost {
  categories: BlogCategory[];
}

// 获取所有博客分类
export async function getBlogCategories(): Promise<BlogCategory[]> {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }

  return data as BlogCategory[];
}

// 获取单个博客分类
export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching blog category:', error);
    return null;
  }

  return data as BlogCategory;
}

// 创建博客分类
export async function createBlogCategory(category: Omit<BlogCategory, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('blog_categories')
    .insert([category])
    .select()
    .single();

  if (error) {
    console.error('Error creating blog category:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// 更新博客分类
export async function updateBlogCategory(id: string, updates: Partial<BlogCategory>) {
  const { data, error } = await supabase
    .from('blog_categories')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating blog category:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// 删除博客分类
export async function deleteBlogCategory(id: string) {
  const { error } = await supabase
    .from('blog_categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog category:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// 获取已发布的博客文章（前台使用）
export async function getPublishedBlogPosts(limit?: number): Promise<BlogPostWithCategories[]> {
  let query = supabase
    .from('blog_posts_with_categories')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching published blog posts:', error);
    return [];
  }

  return data as BlogPostWithCategories[];
}

// 获取所有博客文章（管理后台使用）
export async function getAllBlogPosts(): Promise<BlogPostWithCategories[]> {
  const { data, error } = await supabase
    .from('blog_posts_with_categories')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }

  return data as BlogPostWithCategories[];
}

// 根据 slug 获取博客文章
export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithCategories | null> {
  const { data, error } = await supabase
    .from('blog_posts_with_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }

  // 增加浏览量
  await incrementBlogPostViewCount(data.id);

  return data as BlogPostWithCategories;
}

// 根据分类获取博客文章
export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPostWithCategories[]> {
  const { data, error } = await supabase
    .from('blog_posts_with_categories')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }

  // 过滤包含指定分类的文章
  const filteredPosts = (data as BlogPostWithCategories[]).filter(post =>
    post.categories.some(category => category.slug === categorySlug)
  );

  return filteredPosts;
}

// 搜索博客文章
export async function searchBlogPosts(query: string): Promise<BlogPostWithCategories[]> {
  const { data, error } = await supabase
    .from('blog_posts_with_categories')
    .select('*')
    .eq('published', true)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,tags.cs.{${query}}`)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error searching blog posts:', error);
    return [];
  }

  return data as BlogPostWithCategories[];
}

// 创建博客文章
export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'view_count'>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{
      ...post,
      view_count: 0
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// 更新博客文章
export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating blog post:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// 删除博客文章
export async function deleteBlogPost(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// 增加博客文章浏览量
export async function incrementBlogPostViewCount(id: string) {
  const { error } = await supabase.rpc('increment_blog_post_view_count', {
    post_id: id
  });

  if (error) {
    console.error('Error incrementing view count:', error);
  }
}

// 设置文章分类关联
export async function setBlogPostCategories(postId: string, categoryIds: string[]) {
  // 先删除现有关联
  await supabase
    .from('blog_post_categories')
    .delete()
    .eq('post_id', postId);

  // 添加新关联
  if (categoryIds.length > 0) {
    const associations = categoryIds.map(categoryId => ({
      post_id: postId,
      category_id: categoryId
    }));

    const { error } = await supabase
      .from('blog_post_categories')
      .insert(associations);

    if (error) {
      console.error('Error setting blog post categories:', error);
      return { success: false, error: error.message };
    }
  }

  return { success: true };
}

// =====================================================
// 项目详情管理 (版本 0.2)
// =====================================================

// 根据 slug 获取项目详情
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }

  return data as Project;
}

// 获取相关项目（相同技术栈）
export async function getRelatedProjects(projectId: string, technologies: string[], limit: number = 3): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .neq('id', projectId)
    .overlaps('technologies', technologies)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related projects:', error);
    return [];
  }

  return data as Project[];
}

// 更新项目详情
export async function updateProjectDetails(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project details:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
