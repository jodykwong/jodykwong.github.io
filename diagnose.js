// 快速诊断脚本 - 在浏览器控制台中运行
// 访问 http://localhost:4321 然后按 F12 打开控制台，粘贴此代码

console.log('🔍 开始诊断 Supabase 配置...');

// 检查环境变量
function checkEnvironmentVariables() {
    console.log('\n📋 检查环境变量:');
    
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
        const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
        
        console.log('PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ 已设置' : '❌ 未设置');
        console.log('PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ 已设置' : '❌ 未设置');
        
        if (!supabaseUrl || !supabaseKey) {
            console.log('❌ 环境变量未正确配置');
            console.log('请检查 .env 文件是否存在并包含正确的值');
            return false;
        }
        
        if (supabaseUrl.includes('your_supabase_project_url')) {
            console.log('❌ 环境变量包含占位符，请替换为实际值');
            return false;
        }
        
        console.log('✅ 环境变量配置正确');
        return true;
    } else {
        console.log('❌ 无法访问环境变量，可能是在错误的上下文中运行');
        return false;
    }
}

// 检查 Supabase 连接
async function checkSupabaseConnection() {
    console.log('\n🔗 检查 Supabase 连接:');
    
    try {
        // 尝试导入 Supabase 客户端
        const { supabase } = await import('/src/lib/supabase.ts');
        
        if (!supabase) {
            console.log('❌ 无法导入 Supabase 客户端');
            return false;
        }
        
        console.log('✅ Supabase 客户端导入成功');
        
        // 测试连接
        const { data, error } = await supabase.from('profiles').select('count').limit(1);
        
        if (error) {
            console.log('❌ Supabase 连接失败:', error.message);
            
            if (error.message.includes('relation "profiles" does not exist')) {
                console.log('💡 提示: 需要运行数据库迁移');
            }
            return false;
        }
        
        console.log('✅ Supabase 连接成功');
        return true;
        
    } catch (error) {
        console.log('❌ 检查连接时出错:', error.message);
        return false;
    }
}

// 检查当前页面
function checkCurrentPage() {
    console.log('\n📄 检查当前页面:');
    
    const currentPath = window.location.pathname;
    console.log('当前路径:', currentPath);
    
    if (currentPath === '/admin/login') {
        console.log('✅ 在管理员登录页面');
        
        // 检查登录表单
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            console.log('✅ 登录表单存在');
        } else {
            console.log('❌ 登录表单不存在');
        }
    } else {
        console.log('💡 提示: 访问 /admin/login 进行登录测试');
    }
}

// 运行所有检查
async function runDiagnosis() {
    console.log('🚀 Supabase 配置诊断工具');
    console.log('=====================================');
    
    const envCheck = checkEnvironmentVariables();
    
    if (envCheck) {
        await checkSupabaseConnection();
    }
    
    checkCurrentPage();
    
    console.log('\n📋 诊断完成');
    console.log('=====================================');
    
    if (!envCheck) {
        console.log('\n🔧 修复步骤:');
        console.log('1. 创建 Supabase 项目: https://supabase.com');
        console.log('2. 获取项目凭据: Settings > API');
        console.log('3. 更新 .env 文件中的值');
        console.log('4. 重启开发服务器: npm run dev');
    }
}

// 运行诊断
runDiagnosis().catch(console.error);
