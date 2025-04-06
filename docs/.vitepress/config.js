module.exports = {
  title: 'fc-ui 组件库', // 网站标题
  description: '基于 Vue3 的组件库文档', // 网站描述
  base: '/', // 部署时的基础路径
  themeConfig: {
    lastUpdated: '最后更新时间',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑此网站',
    repo: 'https://gitee.com/login',
    logo: '/logo.png', // 网站 Logo
    footer:{
      message:'Released under the MIT License',
      copyright:'Copyright 2025-present fc'
    },
    nav: [
      { text: '指南', link: '/guide/quickStart',activeMatch:'/guide/' },
      { text: '组件', link: '/components/icon',activeMatch:'/component/' },
      { text: 'GitHub', link: 'https://github.com/your-repo' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            { text: '快速开始', link: '/guide/quickStart' },
            { text: '项目结构', link: '/guide/projectStructure' }
          ]
        },

      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Icon', link: '/components/icon' },
           
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/your-repo' }]
  }
}
