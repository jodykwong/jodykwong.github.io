import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('开始设置存储桶...');

    // 1. 检查现有存储桶
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('获取存储桶列表失败:', listError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: `获取存储桶列表失败: ${listError.message}` 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('现有存储桶:', buckets);

    // 2. 检查 images 存储桶是否存在
    const imagesBucket = buckets.find(bucket => bucket.name === 'images');
    
    if (imagesBucket) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'images 存储桶已存在',
        bucket: imagesBucket
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. 创建 images 存储桶
    console.log('创建 images 存储桶...');
    const { data: newBucket, error: createError } = await supabase.storage.createBucket('images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      fileSizeLimit: 2097152 // 2MB
    });

    if (createError) {
      console.error('创建存储桶失败:', createError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: `创建存储桶失败: ${createError.message}` 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('存储桶创建成功:', newBucket);

    // 4. 测试上传
    const testContent = 'test';
    const testFile = new Blob([testContent], { type: 'text/plain' });
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload('test/test.txt', testFile);

    if (uploadError) {
      console.warn('测试上传失败:', uploadError);
      return new Response(JSON.stringify({ 
        success: true, 
        message: '存储桶创建成功，但测试上传失败',
        bucket: newBucket,
        uploadError: uploadError.message
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 删除测试文件
    await supabase.storage.from('images').remove(['test/test.txt']);

    return new Response(JSON.stringify({ 
      success: true, 
      message: '存储桶创建并测试成功',
      bucket: newBucket
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('设置存储桶时发生错误:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: `设置存储桶时发生错误: ${error.message}` 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
