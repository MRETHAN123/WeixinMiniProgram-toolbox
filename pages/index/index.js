Page({
  data: {
    // 1. 轮播图数据 (图片已更新，与文案精准匹配)
    banners: [
      { 
        id: 1, 
        // 快递纸箱图 -> 对应快递查询
        img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
        title: '快递100 - 全网快递物流查询 📦',
        url: 'https://m.kuaidi100.com'
      },
      { 
        id: 2, 
        // 书籍/图书馆图 -> 对应翻译/知识
        img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
        title: 'DeepL - 全球最准的AI翻译查词 📖',
        url: 'https://www.deepl.com/translator'
      },
      { 
        id: 3, 
        // 烹饪/美食图 -> 对应菜谱
        img: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
        title: '下厨房 - 只有想不到没有做不到的菜谱 🍳',
        url: 'https://www.xiachufang.com'
      },
      { 
        id: 4, 
        // 相机镜头图 -> 对应抠图/修图
        img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
        title: 'Remove.bg - 免费一键智能抠图 📷',
        url: 'https://www.remove.bg/zh'
      },
      { 
        id: 5, 
        // 办公桌/文档图 -> 对应PDF处理
        img: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
        title: 'Smallpdf - 全能PDF转换与处理 📄',
        url: 'https://smallpdf.com/cn'
      },
      { 
        id: 6, 
        // 科技互联图 -> 对应隔空投送
        img: 'https://www.raysync.cn/tinymce-contentful/images/3cd34b347b59307ddffd615523709759.png', 
        title: 'Snapdrop - 跨设备隔空投送神器 📲',
        url: 'https://snapdrop.net'
      }
    ],

    // 2. 工具列表数据 (保持不变)
// ... 前面的代码不变 ...
tools: [
  { id: 1, name: 'BMI计算', icon: '⚖️', color: '#e3f2fd', url: '/pages/tools/bmi/bmi' },
  { id: 2, name: '房贷计算', icon: '🏠', color: '#fff3e0', url: '/pages/tools/finance/finance' },
  { id: 4, name: '单位换算', icon: '🔄', color: '#e8f5e9', url: '/pages/tools/unit/unit' },
  { id: 5, name: '计时器', icon: '⏱️', color: '#ffebee', url: '/pages/tools/timer/timer' },

  { id: 8, name: '放大镜', icon: '🔍', color: '#f3e5f5', url: '/pages/tools/magnifier/magnifier' },
  { id: 9, name: '大屏时钟', icon: '🕰️', color: '#212121', url: '/pages/tools/clock/clock' } // 黑色背景
]
  },

  // 点击轮播图：复制网址
// 点击轮播图：复制网址
onBannerTap(e) {
  const url = e.currentTarget.dataset.url;
  
  // 震动一下，给用户反馈
  wx.vibrateShort();

  wx.setClipboardData({
    data: url,
    success: () => {
      // 隐藏默认的 "内容已复制" 提示，显示我们自定义的
      wx.hideToast(); 
      
      wx.showModal({
        title: '链接已复制',
        content: '由于微信限制，请在手机浏览器中粘贴访问。',
        showCancel: false, // 不显示取消按钮
        confirmText: '知道了',
        confirmColor: '#1989fa'
      });
    }
  });
},

  // 点击宫格：跳转页面
  onGridTap(e) {
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.navigateTo({ url: url })
    }
  }
})