Page({
  data: {
    title: '',
    content: '',
    currentMood: '😊', // 默认心情
    diaryList: []
  },

  onLoad() {
    // 读取本地存储的日记
    const list = wx.getStorageSync('diaryList') || [];
    this.setData({ diaryList: list });
  },

  // 1. 选择心情
  selectMood(e) {
    this.setData({ currentMood: e.currentTarget.dataset.mood });
  },

  // 2. 输入监听
  onTitleInput(e) { this.setData({ title: e.detail.value }) },
  onContentInput(e) { this.setData({ content: e.detail.value }) },

  // 3. 保存日记
  saveDiary() {
    if (!this.data.title && !this.data.content) {
      wx.showToast({ title: '写点什么吧', icon: 'none' });
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleString(); // 获取当前时间字符串

    const newDiary = {
      id: Date.now(),
      mood: this.data.currentMood,
      title: this.data.title || '无标题',
      content: this.data.content,
      time: timeStr
    };

    const newList = [newDiary, ...this.data.diaryList];

    this.setData({
      diaryList: newList,
      title: '',
      content: '',
      currentMood: '😊' // 重置心情
    });

    // 保存到本地
    wx.setStorageSync('diaryList', newList);
    
    wx.showToast({ title: '保存成功', icon: 'success' });
  },

  // 4. 删除日记
  deleteDiary(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.diaryList;

    wx.showModal({
      title: '提示',
      content: '确定要删除这篇日记吗？',
      success: (res) => {
        if (res.confirm) {
          list.splice(index, 1);
          this.setData({ diaryList: list });
          wx.setStorageSync('diaryList', list);
        }
      }
    });
  }
})