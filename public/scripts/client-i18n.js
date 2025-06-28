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
        bio: '我是一名软件开发者和创业者。我也偶尔写作。',
        currentWork: '🚀 当前工作',
        currentWorkContent: '最近我主要专注于构建产品和帮助其他创业者。我正在开发一个令人兴奋的SaaS产品，同时也在制作一些有用的工具。',
        writingSharing: '✍️ 写作分享',
        writingContent: '这个网站起源于我从日常工作中休假六个月，尝试推出一个盈利产品的经历。我在这里记录了那段旅程。我也偶尔写一些关于软件开发的文章。',
        experience: '💼 工作经历',
        experienceContent: '从2015年到2023年，我担任Amazing Company的首席技术官，领导团队构建其旗舰产品：Awesome Product。现在我是该组织的顾问。',
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
        backgroundContent1: '我十多年前开始了软件开发者的职业生涯，使用各种技术并学习构建可扩展Web应用程序的方方面面。多年来，我有机会与初创公司、成熟公司以及介于两者之间的各种公司合作。',
        backgroundContent2: '2015年，我作为高级开发者加入Amazing Company，最终成为他们的首席技术官。在那里的时间里，我领导了一个才华横溢的工程师团队，帮助从头开始构建他们的旗舰产品。这是一次令人难以置信的学习经历，不仅教会了我技术，还有领导力、产品开发和构建可持续业务。',
        currentFocus: '当前专注',
        currentFocusContent1: '最近，我专注于构建自己的产品并帮助其他创业者将他们的想法变为现实。我的主要项目是一个SaaS样板，通过提供包含身份验证、支付和每个SaaS都需要的所有其他功能的坚实基础，帮助开发者更快地推出他们的产品。',
        currentFocusContent2: '我也热衷于通过写作和演讲分享我学到的东西。您可以在这个网站上找到我对软件开发、创业和产品构建的想法。',
        technicalSkills: '技术技能',
        frontend: '前端开发',
        backend: '后端开发',
        devops: '运维部署',
        other: '其他技能',
        personal: '个人',
        personalContent1: '当我不编程或写作时，你可以发现我在徒步、阅读或尝试新技术。我住在[您的城市]，喜欢这里的本地技术社区。我总是乐意与人聊聊技术、初创公司或任何有趣的事情。',
        personalContent2: '我相信技术解决实际问题并让人们的生活更美好的力量。无论是通过我构建的产品、我领导的团队，还是我创建的内容，我的目标始终是产生积极的影响。',
        connect: '让我们联系',
        connectContent: '我总是有兴趣认识新朋友并了解有趣的项目。无论您想合作、需要建议，还是只是想聊聊技术，请随时联系我！',
        emailMe: '发邮件给我',
        viewProjects: '查看项目'
      },
      projects: {
        title: '项目展示',
        description: '这里展示了我参与开发的一些项目',
        buttons: {
          viewDetails: '查看详情',
          visitProject: '访问项目',
          github: 'GitHub'
        },
        empty: {
          title: '暂无项目',
          description: '项目正在添加中，请稍后查看我正在开发的内容！'
        },
        collaboration: {
          title: '想要合作？',
          description: '我总是对参与令人兴奋的项目感兴趣。如果您有想要讨论的想法，请随时联系我！',
          getInTouch: '联系我',
          aboutMe: '关于我'
        }
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
        bio: 'I\'m a software developer and entrepreneur. I also write occasionally.',
        currentWork: '🚀 What I\'m Working On',
        currentWorkContent: 'These days I mostly work on building products and helping other entrepreneurs. I\'m developing an exciting SaaS product while also creating useful tools.',
        writingSharing: '✍️ Writing & Sharing',
        writingContent: 'This site originated during a six-month sabbatical I took from my day job where I tried to launch a profitable product. I documented that journey here. I also write occasionally about building software.',
        experience: '💼 Experience',
        experienceContent: 'From 2015-2023 I served as CTO of Amazing Company and led the team that builds its flagship product: Awesome Product. I\'m now an advisor to the organization.',
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
        backgroundContent1: 'I started my career as a software developer over a decade ago, working with various technologies and learning the ins and outs of building scalable web applications. Over the years, I\'ve had the opportunity to work with startups, established companies, and everything in between.',
        backgroundContent2: 'In 2015, I joined Amazing Company as a senior developer and eventually became their CTO. During my time there, I led a team of talented engineers and helped build their flagship product from the ground up. It was an incredible learning experience that taught me not just about technology, but about leadership, product development, and building sustainable businesses.',
        currentFocus: 'Current Focus',
        currentFocusContent1: 'These days, I\'m focused on building my own products and helping other entrepreneurs bring their ideas to life. My main project is a SaaS boilerplate that helps developers launch their products faster by providing a solid foundation with authentication, payments, and all the other features every SaaS needs.',
        currentFocusContent2: 'I\'m also passionate about sharing what I\'ve learned through writing and speaking. You can find my thoughts on software development, entrepreneurship, and product building throughout this site.',
        technicalSkills: 'Technical Skills',
        frontend: 'Frontend Development',
        backend: 'Backend Development',
        devops: 'DevOps & Deployment',
        other: 'Other Skills',
        personal: 'Personal',
        personalContent1: 'When I\'m not coding or writing, you can find me hiking, reading, or experimenting with new technologies. I\'m based in [Your City] and love the local tech community here. I\'m always up for a coffee chat about technology, startups, or anything interesting.',
        personalContent2: 'I believe in the power of technology to solve real problems and make people\'s lives better. Whether it\'s through the products I build, the teams I lead, or the content I create, my goal is always to have a positive impact.',
        connect: 'Let\'s Connect',
        connectContent: 'I\'m always interested in meeting new people and hearing about interesting projects. Whether you want to collaborate, need advice, or just want to chat about technology, feel free to reach out!',
        emailMe: 'Email me',
        viewProjects: 'View Projects'
      },
      projects: {
        title: 'Projects',
        description: 'Here are some projects I have worked on',
        buttons: {
          viewDetails: 'View Details',
          visitProject: 'Visit Project',
          github: 'GitHub'
        },
        empty: {
          title: 'No Projects Yet',
          description: 'Projects are being added soon. Check back later to see what I\'m working on!'
        },
        collaboration: {
          title: 'Want to collaborate?',
          description: 'I\'m always interested in working on exciting projects. If you have an idea you\'d like to discuss, feel free to reach out!',
          getInTouch: 'Get in touch',
          aboutMe: 'About Me'
        }
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
