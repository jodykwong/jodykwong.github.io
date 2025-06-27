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
