#!/usr/bin/env node

/**
 * 部署前检查脚本
 * 验证环境变量、构建配置和关键文件
 */

import fs from 'fs';
import path from 'path';

const requiredEnvVars = [
  'PUBLIC_SUPABASE_URL',
  'PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'ADMIN_EMAIL',
  'PUBLIC_SITE_URL',
  'PUBLIC_SITE_NAME'
];

const requiredFiles = [
  'astro.config.mjs',
  'package.json',
  'src/layouts/Layout.astro',
  'src/styles/glassmorphism.css',
  '.env.example',
  '.github/workflows/deploy.yml',
  '.gitignore'
];

function checkEnvironmentVariables() {
  console.log('🔍 检查环境变量...');
  
  const envFile = '.env';
  if (!fs.existsSync(envFile)) {
    console.error('❌ .env 文件不存在');
    return false;
  }

  const envContent = fs.readFileSync(envFile, 'utf8');
  const missingVars = [];

  requiredEnvVars.forEach(varName => {
    if (!envContent.includes(varName) || envContent.includes(`${varName}=your_`)) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    console.error('❌ 缺少或未配置的环境变量:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    return false;
  }

  console.log('✅ 环境变量检查通过');
  return true;
}

function checkRequiredFiles() {
  console.log('🔍 检查必需文件...');
  
  const missingFiles = [];

  requiredFiles.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
      missingFiles.push(filePath);
    }
  });

  if (missingFiles.length > 0) {
    console.error('❌ 缺少必需文件:');
    missingFiles.forEach(filePath => console.error(`   - ${filePath}`));
    return false;
  }

  console.log('✅ 必需文件检查通过');
  return true;
}

function checkPackageJson() {
  console.log('🔍 检查 package.json...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (!packageJson.scripts || !packageJson.scripts.build) {
      console.error('❌ package.json 缺少 build 脚本');
      return false;
    }

    if (!packageJson.dependencies || !packageJson.dependencies.astro) {
      console.error('❌ package.json 缺少 Astro 依赖');
      return false;
    }

    console.log('✅ package.json 检查通过');
    return true;
  } catch (error) {
    console.error('❌ package.json 格式错误:', error.message);
    return false;
  }
}

function checkBuildOutput() {
  console.log('🔍 检查构建输出...');
  
  const distPath = 'dist';
  if (!fs.existsSync(distPath)) {
    console.warn('⚠️  dist 目录不存在，请先运行 npm run build');
    return true; // 不是致命错误
  }

  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ 构建输出缺少 index.html');
    return false;
  }

  console.log('✅ 构建输出检查通过');
  return true;
}

function checkGitHubPagesConfig() {
  console.log('🔍 检查GitHub Pages配置...');

  try {
    const astroConfig = fs.readFileSync('astro.config.mjs', 'utf8');

    if (!astroConfig.includes('output: \'static\'')) {
      console.error('❌ astro.config.mjs 必须设置 output: "static" 用于GitHub Pages');
      return false;
    }

    if (!astroConfig.includes('site:') && !astroConfig.includes('base:')) {
      console.warn('⚠️  建议在 astro.config.mjs 中配置 site 和 base 选项');
    }

    const workflowExists = fs.existsSync('.github/workflows/deploy.yml');
    if (!workflowExists) {
      console.error('❌ 缺少 GitHub Actions 工作流文件');
      return false;
    }

    console.log('✅ GitHub Pages 配置检查通过');
    return true;
  } catch (error) {
    console.error('❌ GitHub Pages 配置检查失败:', error.message);
    return false;
  }
}

function main() {
  console.log('🚀 开始部署前检查...\n');

  const checks = [
    checkRequiredFiles,
    checkPackageJson,
    checkEnvironmentVariables,
    checkGitHubPagesConfig,
    checkBuildOutput
  ];

  let allPassed = true;

  for (const check of checks) {
    if (!check()) {
      allPassed = false;
    }
    console.log('');
  }

  if (allPassed) {
    console.log('🎉 所有检查通过！可以开始部署。');
    console.log('\n📝 下一步：');
    console.log('1. 提交所有更改到Git');
    console.log('2. 推送到GitHub仓库的main分支');
    console.log('3. 在GitHub仓库设置中启用GitHub Pages');
    console.log('4. 配置必要的Secrets');
    process.exit(0);
  } else {
    console.log('❌ 部署前检查失败，请修复上述问题后重试。');
    process.exit(1);
  }
}

main();
