import type { APIRoute } from 'astro';
import { uploadAvatar, deleteAvatar, upsertPersonalInfo } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('avatar') as File;
    const oldAvatarPath = formData.get('oldAvatarPath') as string;

    if (!file) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'No file provided' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'File must be an image' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'File size must be less than 2MB' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete old avatar if exists and is not default
    if (oldAvatarPath && oldAvatarPath !== '/images/avatar.jpg') {
      try {
        const pathToDelete = oldAvatarPath.includes('/storage/v1/object/public/images/') 
          ? oldAvatarPath.replace('/storage/v1/object/public/images/', '')
          : oldAvatarPath;
        await deleteAvatar(pathToDelete);
      } catch (error) {
        console.warn('Failed to delete old avatar:', error);
      }
    }

    // Upload new avatar
    const uploadResult = await uploadAvatar(file);
    
    if (!uploadResult.success) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: uploadResult.error 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: uploadResult.data 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Avatar upload error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { avatarPath } = await request.json();

    if (!avatarPath || avatarPath === '/images/avatar.jpg') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'No custom avatar to delete' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pathToDelete = avatarPath.includes('/storage/v1/object/public/images/') 
      ? avatarPath.replace('/storage/v1/object/public/images/', '')
      : avatarPath;

    const result = await deleteAvatar(pathToDelete);
    
    if (!result.success) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: result.error 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Avatar delete error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
