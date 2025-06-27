#!/usr/bin/env node

/**
 * Supabase 存储桶设置脚本
 * 用于创建和配置图片存储桶
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 手动读取 .env 文件
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};

    envContent.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
      }
    });

    return envVars;
  } catch (error) {
    console.error('无法读取 .env 文件:', error.message);
    return {};
  }
}

const env = loadEnv();

const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 缺少 Supabase 配置信息');
  console.error('请确保 .env 文件中包含：');
  console.error('- PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY 或 PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupStorage() {
  console.log('🚀 开始设置 Supabase 存储桶...\n');

  try {
    // 1. 检查现有存储桶
    console.log('📋 检查现有存储桶...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ 获取存储桶列表失败:', listError.message);
      return;
    }

    console.log('现有存储桶:', buckets.map(b => b.name));

    // 2. 检查 images 存储桶是否存在
    const imagesBucket = buckets.find(bucket => bucket.name === 'images');
    
    if (imagesBucket) {
      console.log('✅ images 存储桶已存在');
    } else {
      // 3. 创建 images 存储桶
      console.log('📦 创建 images 存储桶...');
      const { data: newBucket, error: createError } = await supabase.storage.createBucket('images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 2097152 // 2MB
      });

      if (createError) {
        console.error('❌ 创建存储桶失败:', createError.message);
        return;
      }

      console.log('✅ images 存储桶创建成功');
    }

    console.log('✅ 存储桶设置完成，策略将通过 SQL 脚本设置');

    // 5. 测试上传
    console.log('🧪 测试文件上传...');
    
    // 创建一个测试文件
    const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload('test/test.txt', testFile);

    if (uploadError) {
      console.warn('⚠️  测试上传失败:', uploadError.message);
    } else {
      console.log('✅ 测试上传成功');
      
      // 删除测试文件
      await supabase.storage.from('images').remove(['test/test.txt']);
      console.log('🗑️  测试文件已清理');
    }

    console.log('\n🎉 存储桶设置完成！');
    console.log('\n📝 接下来的步骤：');
    console.log('1. 重新访问 /admin/profile 页面');
    console.log('2. 尝试上传头像图片');
    console.log('3. 如果仍有问题，请检查浏览器控制台错误');

  } catch (error) {
    console.error('❌ 设置过程中发生错误:', error);
  }
}

// 运行设置
setupStorage();
