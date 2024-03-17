import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'WebSite',
  description: 'WebSite',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
      level: [2, 3],
    },

    sidebar: [
      {
        text: '常用网站',
        link: '/favorite-sites/',
      },
      {
        text: '好词好句',
        link: '/proverb/',
      },
      {
        text: 'JavaScript',
        items: [
          {
            text: '数据类型',
            items: [
              { text: '概述', link: '/javascript/types/general/' },
              { text: '字符串', link: '/javascript/types/string/' },
              { text: '数值', link: '/javascript/types/number/' },
              { text: '布尔值', link: '/javascript/types/boolean/' },
              {
                text: 'undefined 和 null',
                link: '/javascript/types/undefined-null/',
              },
              { text: '对象', link: '/javascript/types/object/' },
              { text: '数组', link: '/javascript/types/array/' },
              { text: '函数', link: '/javascript/types/function/' },
            ],
          },
          {
            text: '语法专题',
            items: [
              {
                text: '数据类型的转换',
                link: '/javascript/features/conversion/',
              },
              {
                text: '错误处理机制',
                link: '/javascript/features/error/',
              },
            ],
          },
          {
            text: '标准库',
            items: [
              {
                text: 'Object 对象',
                link: '/javascript/stdlib/object/',
              },
              {
                text: '属性描述对象',
                link: '/javascript/stdlib/attributes/',
              },
              {
                text: 'Array 对象',
                link: '/javascript/stdlib/array/',
              },
              {
                text: 'Math 对象',
                link: '/javascript/stdlib/math/',
              },
              {
                text: 'Date 对象',
                link: '/javascript/stdlib/date/',
              },
              {
                text: 'RegExp 对象',
                link: '/javascript/stdlib/regexp/',
              },
              {
                text: 'JSON 对象',
                link: '/javascript/stdlib/json/',
              },
            ],
          },
        ],
      },
      {
        text: 'Vite',
        link: '/vite/',
      },
      {
        text: 'Axios',
        link: '/axios/',
      },
      {
        text: 'Git',
        link: '/git/',
      },
      {
        text: 'Github',
        link: '/github/',
      },
      {
        text: 'NPM',
        link: '/npm/',
      },
      {
        text: 'React-Router',
        link: '/react-router/',
      },
      {
        text: 'Electron',
        link: '/electron/',
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
