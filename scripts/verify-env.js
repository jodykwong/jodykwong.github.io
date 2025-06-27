#!/usr/bin/env node

/**
 * 环境变量验证脚本
 * 用于验证GitHub Pages部署所需的环境变量是否正确配置
 */

const requiredEnvVars = [
  'PUBLIC_SUPABASE_URL',
  'PUBLIC_SUPABASE_ANON_KEY',
  'PUBLIC_SITE_URL',
  'PUBLIC_SITE_NAME'
];

const optionalEnvVars = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'ADMIN_EMAIL',
  'PUBLIC_GOOGLE_ANALYTICS_ID'
];

function validateUrl(url, name) {
  try {
    new URL(url);
    return true;
  } catch {
    console.error(`❌ ${name} 不是有效的URL: ${url}`);
    return false;
  }
}

function validateEmail(email, name) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error(`❌ ${name} 不是有效的邮箱地址: ${email}`);
    return false;
  }
  return true;
}

function checkEnvironmentVariables() {
  console.log('🔍 检查环境变量配置...\n');
  
  let allValid = true;
  const missingRequired = [];
  const missingOptional = [];

  // 检查必需的环境变量
  console.log('📋 必需的环境变量:');
  requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (!value) {
      missingRequired.push(varName);
      console.log(`❌ ${varName}: 未设置`);
      allValid = false;
    } else {
      console.log(`✅ ${varName}: 已设置`);
      
      // 特殊验证
      if (varName.includes('URL') && !validateUrl(value, varName)) {
        allValid = false;
      }
    }
  });

  console.log('\n📋 可选的环境变量:');
  optionalEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (!value) {
      missingOptional.push(varName);
      console.log(`⚠️  ${varName}: 未设置（可选）`);
    } else {
      console.log(`✅ ${varName}: 已设置`);
      
      // 特殊验证
      if (varName === 'ADMIN_EMAIL' && !validateEmail(value, varName)) {
        // 邮箱格式错误不影响部署，只是警告
        console.warn(`⚠️  ${varName} 格式可能不正确`);
      }
    }
  });

  // 检查GitHub Pages特定配置
  console.log('\n📋 GitHub Pages 配置:');
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
  const githubRepo = process.env.GITHUB_REPOSITORY;
  const githubOwner = process.env.GITHUB_REPOSITORY_OWNER;

  if (isGitHubActions) {
    console.log('✅ 运行在 GitHub Actions 环境中');
    console.log(`✅ 仓库: ${githubRepo}`);
    console.log(`✅ 所有者: ${githubOwner}`);
  } else {
    console.log('ℹ️  本地开发环境');
  }

  // 总结
  console.log('\n📊 检查结果:');
  if (allValid && missingRequired.length === 0) {
    console.log('🎉 所有必需的环境变量都已正确配置！');
    
    if (missingOptional.length > 0) {
      console.log(`ℹ️  有 ${missingOptional.length} 个可选环境变量未设置，这不会影响基本功能。`);
    }
    
    return true;
  } else {
    console.log('❌ 环境变量配置不完整：');
    
    if (missingRequired.length > 0) {
      console.log('\n缺少必需的环境变量:');
      missingRequired.forEach(varName => {
        console.log(`  - ${varName}`);
      });
    }
    
    console.log('\n请参考 GITHUB_SECRETS_SETUP.md 文件配置缺少的环境变量。');
    return false;
  }
}

function main() {
  console.log('🚀 GitHub Pages 环境变量验证\n');
  
  const isValid = checkEnvironmentVariables();
  
  if (isValid) {
    console.log('\n✅ 环境变量验证通过，可以开始部署！');
    process.exit(0);
  } else {
    console.log('\n❌ 环境变量验证失败，请修复后重试。');
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { checkEnvironmentVariables };
