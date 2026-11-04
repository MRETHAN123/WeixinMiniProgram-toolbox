Page({
  data: {
    timer: null,
    timeStr: '',
    dateStr: '',
    weekStr: ''
  },

  onLoad() {
    // 1. 开启屏幕常亮 (关键功能)
    wx.setKeepScreenOn({ keepScreenOn: true });

    // 2. 立即刷新一次
    this.updateTime();

    // 3. 开启定时器，每秒刷新
    this.data.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  },

  onUnload() {
    // 页面关闭时，清除定时器
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  updateTime() {
    const now = new Date();
    
    // 格式化时间 HH:mm:ss
    const h = this.pad(now.getHours());
    const m = this.pad(now.getMinutes());
    const s = this.pad(now.getSeconds());
    
    // 格式化日期 YYYY年MM月DD日
    const Y = now.getFullYear();
    const M = now.getMonth() + 1;
    const D = now.getDate();
    
    // 星期
    const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const w = weeks[now.getDay()];

    this.setData({
      timeStr: `${h}:${m}:${s}`,
      dateStr: `${Y}年${M}月${D}日`,
      weekStr: w
    });
  },

  pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }
})