import type { APIRoute } from 'astro';
import { deleteBlogPost } from '../../../lib/supabase';

export const DELETE: APIRoute = async ({ request }) => {
  try {
    // 解析请求体
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: '缺少文章 ID' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // 删除博客文章
    const result = await deleteBlogPost(id);

    if (result.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: '文章删除成功' 
        }),
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: result.error || '删除失败' 
        }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('删除博客文章 API 错误:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: '服务器内部错误' 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

// 预检请求处理
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
