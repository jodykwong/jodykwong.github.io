// 客户端动态翻译脚本
// 在页面加载后根据用户语言偏好动态更新翻译

(function() {
  'use strict';

  // 翻译数据
  const translations = {
    'zh-CN': {
      nav: {
        home: '首页',
        projects: '项目',
        writing: '写作',
        software: '软件',
        open: '仪表板',
        about: '关于'
      },
      home: {
        greeting: '你好，我是 {name}。',
        currentWork: '🚀 当前工作',
        writingSharing: '✍️ 写作分享',
        experience: '💼 工作经历',
        viewProjects: '查看项目',
        aboutMe: '关于我',
        fullProjectList: '完整项目列表',
        openDashboard: '项目仪表板',
        readWriting: '阅读我的文章',
        viewSoftware: '查看软件项目'
      },
      about: {
        title: '关于我',
        subtitle: '我是一名全栈开发者和创业者，热衷于构建解决实际问题的产品。',
        background: '背景介绍',
        currentFocus: '当前专注',
        technicalSkills: '技术技能',
        frontend: '前端开发',
        backend: '后端开发',
        devops: '运维部署',
        other: '其他技能'
      },
      projects: {
        title: '项目',
        description: '这里是我一直在做的一些项目。从SaaS产品到开源库，我喜欢构建解决实际问题的东西。'
      },
      software: {
        title: '软件开发',
        description: '分享我在软件开发过程中的思考、经验和最佳实践。'
      },
      open: {
        title: '项目仪表板',
        description: '我的项目仪表板，展示正在进行的项目和贡献。'
      }
    },
    'en-US': {
      nav: {
        home: 'Home',
        projects: 'Projects',
        writing: 'Writing',
        software: 'Software',
        open: 'Dashboard',
        about: 'About'
      },
      home: {
        greeting: 'Hi, I\'m {name}.',
        currentWork: '🚀 What I\'m Working On',
        writingSharing: '✍️ Writing & Sharing',
        experience: '💼 Experience',
        viewProjects: 'View Projects',
        aboutMe: 'About Me',
        fullProjectList: 'Full Project List',
        openDashboard: 'Project Dashboard',
        readWriting: 'Read My Writing',
        viewSoftware: 'View Software'
      },
      about: {
        title: 'About Me',
        subtitle: 'I\'m a full-stack developer and entrepreneur passionate about building products that solve real problems.',
        background: 'Background',
        currentFocus: 'Current Focus',
        technicalSkills: 'Technical Skills',
        frontend: 'Frontend Development',
        backend: 'Backend Development',
        devops: 'DevOps & Deployment',
        other: 'Other Skills'
      },
      projects: {
        title: 'Projects',
        description: 'Here are some of the projects I\'ve been working on. From SaaS products to open-source libraries, I enjoy building things that solve real problems.'
      },
      software: {
        title: 'On Software',
        description: 'Sharing my thoughts, experiences, and best practices in software development.'
      },
      open: {
        title: 'Project Dashboard',
        description: 'My project dashboard, showcasing ongoing projects and contributions.'
      }
    }
  };

  // 获取翻译文本
  function t(key, params = {}) {
    const language = window.currentLanguage || 'zh-CN';
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // 如果找不到翻译，尝试使用默认语言
        if (language !== 'zh-CN') {
          return t(key, params);
        }
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }
    }
    
    let result = typeof value === 'string' ? value : key;
    
    // 替换参数
    Object.keys(params).forEach(param => {
      result = result.replace(`{${param}}`, params[param]);
    });
    
    return result;
  }

  // 动态更新页面翻译
  function updatePageTranslations() {
    const language = window.currentLanguage || 'zh-CN';
    console.log('Updating page translations to:', language);
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const params = {};
      
      // 处理参数
      if (element.hasAttribute('data-i18n-params')) {
        try {
          Object.assign(params, JSON.parse(element.getAttribute('data-i18n-params')));
        } catch (e) {
          console.warn('Invalid i18n params:', element.getAttribute('data-i18n-params'));
        }
      }
      
      const translation = t(key, params);
      
      // 更新元素内容
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    });
    
    // 更新页面标题
    const titleKey = document.documentElement.getAttribute('data-title-key');
    if (titleKey) {
      document.title = t(titleKey) + ' | ' + t('home.title');
    }
  }

  // 监听语言变更事件
  window.addEventListener('languageChanged', function(e) {
    console.log('Language changed to:', e.detail.language);
    updatePageTranslations();
  });

  // 页面加载完成后初始化翻译
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updatePageTranslations);
  } else {
    updatePageTranslations();
  }

  // 导出翻译函数供其他脚本使用
  window.clientT = t;
  
  console.log('Client i18n initialized');
})();
