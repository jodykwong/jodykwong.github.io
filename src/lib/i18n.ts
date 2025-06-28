// i18n.ts - 多语言支持基础架构

export type Language = 'zh-CN' | 'en-US';

export interface TranslationData {
  [key: string]: string | TranslationData;
}

export interface Translations {
  [language: string]: TranslationData;
}

// 默认翻译数据
const translations: Translations = {
  'zh-CN': {
    common: {
      home: '首页',
      about: '关于',
      projects: '项目',
      writing: '写作',
      software: '软件',
      open: '仪表板',
      contact: '联系',
      aboutMe: '关于我',
      loading: '加载中...',
      error: '出错了',
      success: '成功',
      cancel: '取消',
      confirm: '确认',
      save: '保存',
      edit: '编辑',
      delete: '删除',
      create: '创建',
      update: '更新',
      search: '搜索',
      filter: '筛选',
      all: '全部',
      more: '更多',
      less: '收起',
      readMore: '阅读更多',
      viewProject: '查看项目',
      viewDetails: '查看详情',
      backToList: '返回列表',
      share: '分享',
      download: '下载',
      upload: '上传'
    },
    navigation: {
      toggleTheme: '切换主题',
      language: '语言',
      menu: '菜单'
    },
    home: {
      title: 'Jody Kwong',
      subtitle: '全栈开发者 & 创业者',
      description: '热爱技术，专注于构建优秀的产品和用户体验',
      greeting: '你好，我是 {name}。',
      getInTouch: '联系我',
      viewProjects: '查看项目',
      aboutMe: '关于我',
      latestPosts: '最新文章',
      featuredProjects: '精选项目',
      currentWork: '🚀 当前工作',
      writingSharing: '✍️ 写作分享',
      experience: '💼 工作经历',
      fullProjectList: '完整项目列表',
      openDashboard: '项目仪表板',
      readWriting: '阅读我的文章',
      viewSoftware: '查看软件项目',
      bio: '我是一名软件开发者和创业者。我也偶尔写作。',
      currentWorkContent: '最近我主要专注于构建产品和帮助其他创业者。我正在开发一个令人兴奋的SaaS产品，同时也在制作一些有用的工具。',
      writingContent: '这个网站起源于我从日常工作中休假六个月，尝试推出一个盈利产品的经历。我在这里记录了那段旅程。我也偶尔写一些关于软件开发的文章。',
      experienceContent: '从2015年到2023年，我担任Amazing Company的首席技术官，领导团队构建其旗舰产品：Awesome Product。现在我是该组织的顾问。'
    },
    about: {
      title: '关于我',
      subtitle: '我是一名全栈开发者和创业者，热衷于构建解决实际问题的产品。',
      background: '背景介绍',
      introduction: '个人介绍',
      skills: '技能专长',
      experience: '工作经历',
      education: '教育背景',
      contact: '联系方式',
      technicalSkills: '技术技能',
      softSkills: '软技能',
      languages: '语言能力',
      hobbies: '兴趣爱好',
      frontend: '前端开发',
      backend: '后端开发',
      devops: '运维部署',
      other: '其他技能',
      getInTouch: '联系我',
      downloadResume: '下载简历',
      currentFocus: '当前专注',
      backgroundContent1: '我是一名全栈开发者和创业者，专注于构建有意义的产品。从2015年开始，我一直在技术领域工作，积累了丰富的开发和团队管理经验。',
      backgroundContent2: '我热衷于学习新技术，喜欢解决复杂的技术挑战，并且享受将想法转化为实际产品的过程。我相信技术应该服务于人，让生活变得更美好。',
      currentFocusContent1: '目前我主要专注于全栈开发和产品设计，特别是在Web应用、移动应用和云服务方面。我正在探索AI和机器学习在产品开发中的应用。',
      currentFocusContent2: '同时，我也在积极参与开源社区，分享我的经验和知识，帮助其他开发者成长。',
      personal: '个人信息',
      personalContent1: '除了编程，我还喜欢阅读、旅行和摄影。我相信保持工作与生活的平衡对于长期的创造力和幸福感非常重要。',
      personalContent2: '我总是乐于与志同道合的人交流想法，如果你有有趣的项目或想法，欢迎随时联系我！',
      connect: '联系我',
      connectContent: '如果你想讨论项目合作、技术交流或者只是想打个招呼，我很乐意听到你的声音！',
      emailMe: '发邮件给我',
      viewProjects: '查看项目'
    },
    projects: {
      title: '项目展示',
      description: '这里展示了我参与开发的一些项目',
      status: {
        active: '活跃开发',
        maintained: '维护中',
        archived: '已归档'
      },
      details: {
        overview: '项目概述',
        features: '核心功能',
        technologies: '技术栈',
        challenges: '开发挑战',
        lessons: '经验总结',
        timeline: '开发时间线',
        screenshots: '项目截图',
        demo: '在线演示',
        source: '源代码',
        relatedProjects: '相关项目'
      },
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
    blog: {
      title: '写作分享',
      description: '分享技术见解、产品思考和创业心得',
      categories: '分类',
      tags: '标签',
      readingTime: '阅读时间',
      publishedAt: '发布时间',
      updatedAt: '更新时间',
      viewCount: '浏览次数',
      relatedPosts: '相关文章',
      tableOfContents: '目录',
      sharePost: '分享文章',
      noPostsFound: '没有找到相关文章',
      searchPlaceholder: '搜索文章标题、内容或标签...',
      categoryTypes: {
        tech: '技术分享',
        product: '产品开发',
        startup: '创业心得',
        life: '生活感悟'
      }
    },
    admin: {
      title: '管理后台',
      dashboard: '仪表板',
      profile: '个人资料',
      projects: '项目管理',
      blog: '博客管理',
      categories: '分类管理',
      settings: '设置',
      logout: '退出登录',
      login: '登录',
      welcome: '欢迎回来',
      overview: '概览',
      statistics: '统计数据',
      recentActivity: '最近活动'
    },
    forms: {
      required: '必填项',
      optional: '可选',
      title: '标题',
      description: '描述',
      content: '内容',
      excerpt: '摘要',
      tags: '标签',
      category: '分类',
      status: '状态',
      published: '已发布',
      draft: '草稿',
      featured: '精选',
      url: '链接',
      image: '图片',
      date: '日期',
      author: '作者',
      email: '邮箱',
      name: '姓名',
      message: '消息',
      submit: '提交',
      reset: '重置',
      preview: '预览'
    },
    messages: {
      success: {
        saved: '保存成功',
        updated: '更新成功',
        deleted: '删除成功',
        created: '创建成功',
        uploaded: '上传成功'
      },
      error: {
        general: '操作失败，请重试',
        network: '网络错误，请检查连接',
        unauthorized: '未授权访问',
        notFound: '内容不存在',
        validation: '输入信息有误',
        upload: '上传失败'
      },
      confirm: {
        delete: '确定要删除吗？此操作不可撤销。',
        unsaved: '有未保存的更改，确定要离开吗？'
      }
    },
    software: {
      title: '软件开发',
      description: '分享我在软件开发过程中的思考、经验和最佳实践。',
      webDevelopment: 'Web 开发',
      backendDevelopment: '后端开发',
      devopsDeployment: 'DevOps 与部署'
    },
    open: {
      title: '项目仪表板',
      description: '我的项目仪表板，展示正在进行的项目和贡献。',
      dashboard: '项目仪表板',
      contributions: '贡献统计',
      repositories: '代码仓库'
    }
  },
  'en-US': {
    common: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      writing: 'Writing',
      software: 'Software',
      open: 'Dashboard',
      contact: 'Contact',
      aboutMe: 'About Me',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      create: 'Create',
      update: 'Update',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      more: 'More',
      less: 'Less',
      readMore: 'Read More',
      viewProject: 'View Project',
      viewDetails: 'View Details',
      backToList: 'Back to List',
      share: 'Share',
      download: 'Download',
      upload: 'Upload'
    },
    navigation: {
      toggleTheme: 'Toggle Theme',
      language: 'Language',
      menu: 'Menu'
    },
    home: {
      title: 'Jody Kwong',
      subtitle: 'Full-Stack Developer & Entrepreneur',
      description: 'Passionate about technology, focused on building great products and user experiences',
      greeting: 'Hi, I\'m {name}.',
      getInTouch: 'Get in Touch',
      viewProjects: 'View Projects',
      aboutMe: 'About Me',
      latestPosts: 'Latest Posts',
      featuredProjects: 'Featured Projects',
      currentWork: '🚀 What I\'m Working On',
      writingSharing: '✍️ Writing & Sharing',
      experience: '💼 Experience',
      fullProjectList: 'Full Project List',
      openDashboard: 'Project Dashboard',
      readWriting: 'Read My Writing',
      viewSoftware: 'View Software Projects',
      bio: 'I\'m a software developer and entrepreneur. I also write occasionally.',
      currentWorkContent: 'Recently I\'ve been mainly focused on building products and helping other entrepreneurs. I\'m developing an exciting SaaS product while also creating some useful tools.',
      writingContent: 'This website originated from my experience taking a six-month break from my day job to try launching a profitable product. I documented that journey here. I also occasionally write about software development.',
      experienceContent: 'From 2015 to 2023, I served as CTO of Amazing Company, leading the team to build their flagship product: Awesome Product. I\'m now an advisor to the organization.'
    },
    about: {
      title: 'About Me',
      subtitle: 'I\'m a full-stack developer and entrepreneur passionate about building products that solve real problems.',
      background: 'Background',
      introduction: 'Introduction',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      contact: 'Contact',
      technicalSkills: 'Technical Skills',
      softSkills: 'Soft Skills',
      languages: 'Languages',
      hobbies: 'Hobbies',
      frontend: 'Frontend Development',
      backend: 'Backend Development',
      devops: 'DevOps & Deployment',
      other: 'Other Skills',
      getInTouch: 'Get in Touch',
      downloadResume: 'Download Resume',
      currentFocus: 'Current Focus',
      backgroundContent1: 'I\'m a full-stack developer and entrepreneur focused on building meaningful products. Since 2015, I\'ve been working in the tech industry, accumulating rich experience in development and team management.',
      backgroundContent2: 'I\'m passionate about learning new technologies, enjoy solving complex technical challenges, and love the process of turning ideas into actual products. I believe technology should serve people and make life better.',
      currentFocusContent1: 'Currently, I\'m mainly focused on full-stack development and product design, particularly in web applications, mobile apps, and cloud services. I\'m exploring the application of AI and machine learning in product development.',
      currentFocusContent2: 'At the same time, I\'m actively participating in the open source community, sharing my experience and knowledge to help other developers grow.',
      personal: 'Personal',
      personalContent1: 'Besides programming, I also enjoy reading, traveling, and photography. I believe maintaining work-life balance is crucial for long-term creativity and happiness.',
      personalContent2: 'I\'m always happy to exchange ideas with like-minded people. If you have interesting projects or ideas, feel free to contact me anytime!',
      connect: 'Let\'s Connect',
      connectContent: 'If you want to discuss project collaboration, technical exchange, or just say hello, I\'d love to hear from you!',
      emailMe: 'Email Me',
      viewProjects: 'View Projects'
    },
    projects: {
      title: 'Projects',
      description: 'Here are some projects I have worked on',
      status: {
        active: 'Active',
        maintained: 'Maintained',
        archived: 'Archived'
      },
      details: {
        overview: 'Overview',
        features: 'Features',
        technologies: 'Technologies',
        challenges: 'Challenges',
        lessons: 'Lessons Learned',
        timeline: 'Timeline',
        screenshots: 'Screenshots',
        demo: 'Live Demo',
        source: 'Source Code',
        relatedProjects: 'Related Projects'
      },
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
    blog: {
      title: 'Writing',
      description: 'Sharing insights on technology, product development, and entrepreneurship',
      categories: 'Categories',
      tags: 'Tags',
      readingTime: 'Reading Time',
      publishedAt: 'Published',
      updatedAt: 'Updated',
      viewCount: 'Views',
      relatedPosts: 'Related Posts',
      tableOfContents: 'Table of Contents',
      sharePost: 'Share Post',
      noPostsFound: 'No posts found',
      searchPlaceholder: 'Search posts by title, content, or tags...',
      categoryTypes: {
        tech: 'Technology',
        product: 'Product',
        startup: 'Startup',
        life: 'Life'
      }
    },
    admin: {
      title: 'Admin Panel',
      dashboard: 'Dashboard',
      profile: 'Profile',
      projects: 'Projects',
      blog: 'Blog',
      categories: 'Categories',
      settings: 'Settings',
      logout: 'Logout',
      login: 'Login',
      welcome: 'Welcome back',
      overview: 'Overview',
      statistics: 'Statistics',
      recentActivity: 'Recent Activity'
    },
    forms: {
      required: 'Required',
      optional: 'Optional',
      title: 'Title',
      description: 'Description',
      content: 'Content',
      excerpt: 'Excerpt',
      tags: 'Tags',
      category: 'Category',
      status: 'Status',
      published: 'Published',
      draft: 'Draft',
      featured: 'Featured',
      url: 'URL',
      image: 'Image',
      date: 'Date',
      author: 'Author',
      email: 'Email',
      name: 'Name',
      message: 'Message',
      submit: 'Submit',
      reset: 'Reset',
      preview: 'Preview'
    },
    messages: {
      success: {
        saved: 'Saved successfully',
        updated: 'Updated successfully',
        deleted: 'Deleted successfully',
        created: 'Created successfully',
        uploaded: 'Uploaded successfully'
      },
      error: {
        general: 'Operation failed, please try again',
        network: 'Network error, please check your connection',
        unauthorized: 'Unauthorized access',
        notFound: 'Content not found',
        validation: 'Invalid input',
        upload: 'Upload failed'
      },
      confirm: {
        delete: 'Are you sure you want to delete this? This action cannot be undone.',
        unsaved: 'You have unsaved changes. Are you sure you want to leave?'
      }
    },
    software: {
      title: 'On Software',
      description: 'Sharing my thoughts, experiences, and best practices in software development.',
      webDevelopment: 'Web Development',
      backendDevelopment: 'Backend Development',
      devopsDeployment: 'DevOps & Deployment'
    },
    open: {
      title: 'Project Dashboard',
      description: 'My project dashboard, showcasing ongoing projects and contributions.',
      dashboard: 'Project Dashboard',
      contributions: 'Contributions',
      repositories: 'Repositories'
    }
  }
};

// 当前语言状态
let currentLanguage: Language = 'zh-CN';

// 获取当前语言
export function getCurrentLanguage(): Language {
  // 在浏览器环境中，尝试从 localStorage 读取
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('preferred-language') as Language;
    if (saved && (saved === 'zh-CN' || saved === 'en-US')) {
      currentLanguage = saved;
      return saved;
    }
  }
  return currentLanguage;
}

// 设置语言
export function setLanguage(language: Language): void {
  currentLanguage = language;
  
  // 保存到 localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', language);
    
    // 更新 HTML lang 属性
    document.documentElement.lang = language;
    
    // 触发语言变更事件
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language } 
    }));
  }
}

// 初始化语言设置
export function initLanguage(): Language {
  if (typeof window !== 'undefined') {
    // 从 localStorage 获取保存的语言设置
    const saved = localStorage.getItem('preferred-language') as Language;
    if (saved && (saved === 'zh-CN' || saved === 'en-US')) {
      currentLanguage = saved;
    } else {
      // 从浏览器语言检测
      const browserLang = navigator.language;
      if (browserLang.startsWith('zh')) {
        currentLanguage = 'zh-CN';
      } else {
        currentLanguage = 'en-US';
      }
    }
    
    // 设置 HTML lang 属性
    document.documentElement.lang = currentLanguage;
  }
  
  return currentLanguage;
}

// 从URL路径获取语言
export function getLanguageFromUrl(url: string): Language {
  const pathSegments = url.split('/').filter(segment => segment.length > 0);
  const firstSegment = pathSegments[0];

  if (firstSegment === 'zh' || firstSegment === 'zh-CN') {
    return 'zh-CN';
  } else if (firstSegment === 'en' || firstSegment === 'en-US') {
    return 'en-US';
  }

  // 默认返回中文
  return 'zh-CN';
}

// 获取翻译文本
export function t(key: string, language?: Language, params?: Record<string, string>): string {
  const lang = language || currentLanguage;
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // 如果找不到翻译，尝试使用默认语言
      if (lang !== 'zh-CN') {
        return t(key, 'zh-CN', params);
      }
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }
  }

  let result = typeof value === 'string' ? value : key;

  // 替换参数
  if (params) {
    Object.keys(params).forEach(param => {
      result = result.replace(`{${param}}`, params[param]);
    });
  }

  return result;
}

// 生成带语言前缀的URL
export function getLocalizedUrl(path: string, language: Language): string {
  // 移除开头的斜杠
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // 移除现有的语言前缀
  const pathWithoutLang = cleanPath.replace(/^(zh|en|zh-CN|en-US)\/?/, '');

  // 生成语言前缀
  const langPrefix = language === 'zh-CN' ? 'zh' : 'en';

  // 构建新的URL
  if (pathWithoutLang === '' || pathWithoutLang === '/' || pathWithoutLang === 'index') {
    return `/${langPrefix}`;
  }

  return `/${langPrefix}/${pathWithoutLang}`;
}

// 获取当前页面的其他语言版本URL
export function getAlternateLanguageUrl(currentUrl: string, targetLanguage: Language): string {
  const currentLang = getLanguageFromUrl(currentUrl);
  if (currentLang === targetLanguage) {
    return currentUrl;
  }

  // 移除当前语言前缀，然后添加目标语言前缀
  const pathWithoutLang = currentUrl.replace(/^\/(zh|en|zh-CN|en-US)\/?/, '');

  // 生成目标语言前缀
  const targetLangPrefix = targetLanguage === 'zh-CN' ? 'zh' : 'en';

  // 构建新的URL
  if (pathWithoutLang === '' || pathWithoutLang === '/' || pathWithoutLang === 'index') {
    return `/${targetLangPrefix}`;
  }

  return `/${targetLangPrefix}/${pathWithoutLang}`;
}

// 获取所有支持的语言
export function getSupportedLanguages(): { code: Language; name: string; nativeName: string }[] {
  return [
    { code: 'zh-CN', name: 'Chinese', nativeName: '中文' },
    { code: 'en-US', name: 'English', nativeName: 'English' }
  ];
}

// 格式化日期
export function formatDate(date: string | Date, language?: Language): string {
  const lang = language || currentLanguage;
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return dateObj.toLocaleDateString(lang, options);
}

// 格式化相对时间
export function formatRelativeTime(date: string | Date, language?: Language): string {
  const lang = language || currentLanguage;
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  
  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
}

// 格式化数字
export function formatNumber(number: number, language?: Language): string {
  const lang = language || currentLanguage;
  return number.toLocaleString(lang);
}
