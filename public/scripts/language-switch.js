// 客户端语言切换脚本
// 确保在所有页面都能正常工作

(function() {
  'use strict';

  // 语言切换功能
  class LanguageSwitcher {
    constructor() {
      this.currentLanguage = this.getCurrentLanguage();
      this.init();
    }

    init() {
      // 等待DOM加载完成
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.bindEvents();
          this.updateUI();
        });
      } else {
        this.bindEvents();
        this.updateUI();
      }
    }

    getCurrentLanguage() {
      // 优先从全局变量获取
      if (window.currentLanguage) {
        return window.currentLanguage;
      }
      
      // 从localStorage获取
      const saved = localStorage.getItem('preferred-language');
      if (saved && (saved === 'zh-CN' || saved === 'en-US')) {
        return saved;
      }
      
      // 默认语言
      return 'zh-CN';
    }

    bindEvents() {
      // 绑定所有语言切换按钮
      const languageButtons = document.querySelectorAll('[data-language]');
      
      languageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const language = button.getAttribute('data-language');
          if (language && language !== this.currentLanguage) {
            this.changeLanguage(language);
          }
        });
      });

      // 下拉菜单特殊处理
      const languageButton = document.getElementById('language-button');
      const languageMenu = document.getElementById('language-menu');
      
      if (languageButton && languageMenu) {
        languageButton.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleDropdown();
        });

        // 点击外部关闭下拉菜单
        document.addEventListener('click', () => {
          this.closeDropdown();
        });
      }

      // 监听语言变更事件
      window.addEventListener('languageChanged', (e) => {
        this.currentLanguage = e.detail.language;
        this.updateUI();
      });
    }

    changeLanguage(language) {
      console.log('Changing language from', this.currentLanguage, 'to', language);
      
      // 保存到localStorage
      localStorage.setItem('preferred-language', language);
      
      // 更新HTML lang属性
      document.documentElement.lang = language;
      
      // 更新全局变量
      window.currentLanguage = language;
      
      // 触发语言变更事件
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language } 
      }));
      
      // 关闭下拉菜单
      this.closeDropdown();
      
      // 重新加载页面以应用新语言
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }

    updateUI() {
      // 更新所有语言按钮的活跃状态
      const languageButtons = document.querySelectorAll('[data-language]');
      
      languageButtons.forEach(button => {
        const language = button.getAttribute('data-language');
        const isActive = language === this.currentLanguage;
        
        if (isActive) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });

      // 更新下拉菜单标签
      const languageLabel = document.querySelector('.language-label');
      if (languageLabel) {
        const supportedLanguages = {
          'zh-CN': '中文',
          'en-US': 'English'
        };
        
        languageLabel.textContent = supportedLanguages[this.currentLanguage] || '中文';
      }
    }

    toggleDropdown() {
      const languageButton = document.getElementById('language-button');
      const languageMenu = document.getElementById('language-menu');
      
      if (languageButton && languageMenu) {
        const isExpanded = languageButton.getAttribute('aria-expanded') === 'true';
        
        languageButton.setAttribute('aria-expanded', (!isExpanded).toString());
        
        if (isExpanded) {
          languageMenu.classList.add('hidden');
        } else {
          languageMenu.classList.remove('hidden');
        }
      }
    }

    closeDropdown() {
      const languageButton = document.getElementById('language-button');
      const languageMenu = document.getElementById('language-menu');
      
      if (languageButton && languageMenu) {
        languageButton.setAttribute('aria-expanded', 'false');
        languageMenu.classList.add('hidden');
      }
    }
  }

  // 初始化语言切换器
  new LanguageSwitcher();

  // 调试信息
  console.log('Language switcher initialized');
  console.log('Current language:', localStorage.getItem('preferred-language'));
  console.log('HTML lang:', document.documentElement.lang);
})();
