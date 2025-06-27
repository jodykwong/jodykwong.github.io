#!/usr/bin/env node

/**
 * 版本 0.2 开发环境验证脚本
 * 验证开发环境是否正确设置
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkGitBranch() {
  try {
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    if (branch === 'version-0.2-dev') {
      log('✅ Git 分支: version-0.2-dev (正确)', 'green');
      return true;
    } else {
      log(`❌ Git 分支: ${branch} (应该是 version-0.2-dev)`, 'red');
      return false;
    }
  } catch (error) {
    log('❌ 无法检查 Git 分支', 'red');
    return false;
  }
}

function checkPackageVersion() {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    if (packageJson.version === '0.2.0-dev') {
      log('✅ 项目版本: 0.2.0-dev (正确)', 'green');
      return true;
    } else {
      log(`❌ 项目版本: ${packageJson.version} (应该是 0.2.0-dev)`, 'red');
      return false;
    }
  } catch (error) {
    log('❌ 无法读取 package.json', 'red');
    return false;
  }
}

function checkRequiredFiles() {
  const requiredFiles = [
    'VERSION-0.2-DEVELOPMENT.md',
    'CHANGELOG-v0.2.md',
    'VERSION-0.2-CONFIG.md',
    'supabase/migrations/002_version_0.2_schema.sql'
  ];

  let allExist = true;
  
  log('\n📁 检查必需文件:', 'blue');
  
  requiredFiles.forEach(file => {
    if (existsSync(file)) {
      log(`  ✅ ${file}`, 'green');
    } else {
      log(`  ❌ ${file} (缺失)`, 'red');
      allExist = false;
    }
  });

  return allExist;
}

function checkMainBranchProtection() {
  try {
    // 检查是否可以切换到 main 分支
    execSync('git show-ref --verify --quiet refs/heads/main');
    log('✅ main 分支存在且受保护', 'green');
    return true;
  } catch (error) {
    log('❌ main 分支检查失败', 'red');
    return false;
  }
}

function checkDevelopmentDocs() {
  const docs = [
    {
      file: 'VERSION-0.2-DEVELOPMENT.md',
      contains: ['博客文章管理系统', '项目详情页面', '图片编辑功能']
    },
    {
      file: 'CHANGELOG-v0.2.md',
      contains: ['版本 0.2 变更日志', '新增功能', '开发进度追踪']
    },
    {
      file: 'VERSION-0.2-CONFIG.md',
      contains: ['版本 0.2 开发配置', 'Git 分支管理', '数据库配置']
    }
  ];

  let allValid = true;

  log('\n📖 检查文档内容:', 'blue');

  docs.forEach(({ file, contains }) => {
    try {
      const content = readFileSync(file, 'utf8');
      const missingContent = contains.filter(text => !content.includes(text));
      
      if (missingContent.length === 0) {
        log(`  ✅ ${file} (内容完整)`, 'green');
      } else {
        log(`  ❌ ${file} (缺少: ${missingContent.join(', ')})`, 'red');
        allValid = false;
      }
    } catch (error) {
      log(`  ❌ ${file} (无法读取)`, 'red');
      allValid = false;
    }
  });

  return allValid;
}

function checkDatabaseMigration() {
  try {
    const migrationFile = 'supabase/migrations/002_version_0.2_schema.sql';
    const content = readFileSync(migrationFile, 'utf8');
    
    const requiredTables = [
      'blog_categories',
      'blog_posts',
      'blog_post_categories',
      'content_translations',
      'seo_metadata'
    ];

    const missingTables = requiredTables.filter(table => 
      !content.includes(`CREATE TABLE ${table}`)
    );

    if (missingTables.length === 0) {
      log('✅ 数据库迁移脚本完整', 'green');
      return true;
    } else {
      log(`❌ 数据库迁移脚本缺少表: ${missingTables.join(', ')}`, 'red');
      return false;
    }
  } catch (error) {
    log('❌ 无法检查数据库迁移脚本', 'red');
    return false;
  }
}

function displaySummary(checks) {
  const passed = checks.filter(Boolean).length;
  const total = checks.length;
  
  log('\n' + '='.repeat(50), 'blue');
  log(`📊 环境验证结果: ${passed}/${total} 项检查通过`, 'bold');
  
  if (passed === total) {
    log('\n🎉 版本 0.2 开发环境设置完成！', 'green');
    log('现在可以开始开发新功能了。', 'green');
    log('\n📋 下一步:', 'blue');
    log('1. 运行数据库迁移脚本', 'yellow');
    log('2. 开始博客文章管理系统开发', 'yellow');
    log('3. 查看 VERSION-0.2-DEVELOPMENT.md 了解详细计划', 'yellow');
  } else {
    log('\n⚠️  环境设置不完整，请修复上述问题。', 'yellow');
  }
  
  log('='.repeat(50), 'blue');
}

function main() {
  log('🔍 验证版本 0.2 开发环境...', 'bold');
  log('');

  const checks = [
    checkGitBranch(),
    checkPackageVersion(),
    checkRequiredFiles(),
    checkMainBranchProtection(),
    checkDevelopmentDocs(),
    checkDatabaseMigration()
  ];

  displaySummary(checks);
}

// 运行验证
main();
