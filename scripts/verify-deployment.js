#!/usr/bin/env node

/**
 * 部署验证脚本
 * 验证GitHub Pages部署是否成功，检查网站功能
 */

import https from 'https';
import http from 'http';

const TIMEOUT = 10000; // 10秒超时

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, { timeout: TIMEOUT }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('请求超时'));
    });
    
    req.on('error', (error) => {
      reject(error);
    });
  });
}

async function checkWebsiteAccessibility(siteUrl) {
  console.log(`🌐 检查网站可访问性: ${siteUrl}`);
  
  try {
    const response = await makeRequest(siteUrl);
    
    if (response.statusCode === 200) {
      console.log('✅ 网站可以正常访问');
      return true;
    } else {
      console.error(`❌ 网站返回状态码: ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ 网站访问失败: ${error.message}`);
    return false;
  }
}

async function checkPageContent(siteUrl) {
  console.log('🔍 检查页面内容...');
  
  try {
    const response = await makeRequest(siteUrl);
    const html = response.body;
    
    // 检查基本HTML结构
    if (!html.includes('<html') || !html.includes('</html>')) {
      console.error('❌ 页面HTML结构不完整');
      return false;
    }
    
    // 检查标题
    if (!html.includes('<title>')) {
      console.error('❌ 页面缺少标题');
      return false;
    }
    
    // 检查CSS是否加载
    if (!html.includes('glassmorphism.css') && !html.includes('<style')) {
      console.warn('⚠️  可能缺少CSS样式');
    }
    
    // 检查主题切换功能
    if (!html.includes('data-theme')) {
      console.warn('⚠️  主题切换功能可能未正确初始化');
    }
    
    console.log('✅ 页面内容检查通过');
    return true;
  } catch (error) {
    console.error(`❌ 页面内容检查失败: ${error.message}`);
    return false;
  }
}

async function checkSubPages(siteUrl) {
  console.log('📄 检查子页面...');
  
  const subPages = ['/about', '/projects', '/writing', '/software', '/open'];
  let allPassed = true;
  
  for (const page of subPages) {
    try {
      const pageUrl = siteUrl + page;
      const response = await makeRequest(pageUrl);
      
      if (response.statusCode === 200) {
        console.log(`✅ ${page} 页面正常`);
      } else {
        console.error(`❌ ${page} 页面返回状态码: ${response.statusCode}`);
        allPassed = false;
      }
    } catch (error) {
      console.error(`❌ ${page} 页面访问失败: ${error.message}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

async function checkSupabaseConnection(siteUrl) {
  console.log('🗄️  检查Supabase连接...');
  
  try {
    // 检查页面是否包含Supabase相关内容
    const response = await makeRequest(siteUrl + '/about');
    const html = response.body;
    
    // 检查是否有Supabase错误信息
    if (html.includes('supabase') && html.includes('error')) {
      console.warn('⚠️  页面中可能包含Supabase错误信息');
      return false;
    }
    
    // 检查是否正确加载了动态内容
    if (html.includes('I\'m a full-stack developer')) {
      console.log('✅ 动态内容加载正常');
      return true;
    } else {
      console.warn('⚠️  动态内容可能未正确加载');
      return false;
    }
  } catch (error) {
    console.error(`❌ Supabase连接检查失败: ${error.message}`);
    return false;
  }
}

function getSiteUrl() {
  // 从环境变量或命令行参数获取站点URL
  const envUrl = process.env.PUBLIC_SITE_URL;
  const argUrl = process.argv[2];
  
  if (argUrl) {
    return argUrl;
  }
  
  if (envUrl) {
    return envUrl;
  }
  
  // 默认GitHub Pages URL格式
  const githubOwner = process.env.GITHUB_REPOSITORY_OWNER;
  if (githubOwner) {
    return `https://${githubOwner}.github.io`;
  }
  
  console.error('❌ 无法确定站点URL，请提供URL作为参数或设置环境变量');
  process.exit(1);
}

async function main() {
  console.log('🚀 开始部署验证...\n');
  
  const siteUrl = getSiteUrl();
  console.log(`🎯 目标站点: ${siteUrl}\n`);
  
  const checks = [
    () => checkWebsiteAccessibility(siteUrl),
    () => checkPageContent(siteUrl),
    () => checkSubPages(siteUrl),
    () => checkSupabaseConnection(siteUrl)
  ];
  
  let allPassed = true;
  
  for (const check of checks) {
    try {
      const result = await check();
      if (!result) {
        allPassed = false;
      }
    } catch (error) {
      console.error(`❌ 检查过程中出错: ${error.message}`);
      allPassed = false;
    }
    console.log('');
  }
  
  if (allPassed) {
    console.log('🎉 部署验证成功！网站运行正常。');
    console.log(`\n🌐 访问你的网站: ${siteUrl}`);
    process.exit(0);
  } else {
    console.log('❌ 部署验证失败，请检查上述问题。');
    console.log('\n🔧 故障排除建议:');
    console.log('1. 检查GitHub Actions工作流是否成功完成');
    console.log('2. 验证环境变量是否正确配置');
    console.log('3. 检查Supabase项目设置');
    console.log('4. 查看浏览器控制台是否有错误信息');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ 验证脚本执行失败:', error.message);
  process.exit(1);
});
