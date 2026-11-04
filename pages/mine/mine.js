Page({
  data: {
    todoCount: 0,
    diaryCount: 0
  },

  // 每次显示页面时，都重新读取缓存更新数据
  onShow() {
    this.updateStats();
  },

  updateStats() {
    // 读取待办列表
    const todoList = wx.getStorageSync('todoList') || [];
    // 读取日记列表
    const diaryList = wx.getStorageSync('diaryList') || [];

    this.setData({
      todoCount: todoList.length,
      diaryCount: diaryList.length
    });
  },

  // 清除缓存功能
  clearCache() {
    wx.showModal({
      title: '警告',
      content: '确定要清空所有待办任务和日记吗？此操作无法恢复。',
      confirmColor: '#ff4d4f',
      success: (res) => {
        if (res.confirm) {
          // 清空 Storage
          wx.clearStorageSync();
          
          wx.showToast({ title: '清理完成', icon: 'success' });
          
          // 立即更新页面数字为 0
          this.updateStats();
        }
      }
    });
  },

  // 关于作者
  showAbout() {
    wx.showModal({
      title: '关于作者',
      content: '本小程序由 [lkb] 设计开发。\n禁止商用。',
      showCancel: false,
      confirmText: '好的'
    });
  }
})