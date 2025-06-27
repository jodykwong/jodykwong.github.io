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
      open: '开源',
      contact: '联系',
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
      getInTouch: '联系我',
      viewProjects: '查看项目',
      latestPosts: '最新文章',
      featuredProjects: '精选项目'
    },
    about: {
      title: '关于我',
      introduction: '个人介绍',
      skills: '技能专长',
      experience: '工作经历',
      education: '教育背景',
      contact: '联系方式',
      technicalSkills: '技术技能',
      softSkills: '软技能',
      languages: '语言能力',
      hobbies: '兴趣爱好'
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
      categories: {
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
    }
  },
  'en-US': {
    common: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      writing: 'Writing',
      software: 'Software',
      open: 'Open',
      contact: 'Contact',
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
      getInTouch: 'Get in Touch',
      viewProjects: 'View Projects',
      latestPosts: 'Latest Posts',
      featuredProjects: 'Featured Projects'
    },
    about: {
      title: 'About Me',
      introduction: 'Introduction',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      contact: 'Contact',
      technicalSkills: 'Technical Skills',
      softSkills: 'Soft Skills',
      languages: 'Languages',
      hobbies: 'Hobbies'
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
      categories: {
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
    }
  }
};

// 当前语言状态
let currentLanguage: Language = 'zh-CN';

// 获取当前语言
export function getCurrentLanguage(): Language {
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

// 获取翻译文本
export function t(key: string, language?: Language): string {
  const lang = language || currentLanguage;
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // 如果找不到翻译，尝试使用默认语言
      if (lang !== 'zh-CN') {
        return t(key, 'zh-CN');
      }
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
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
