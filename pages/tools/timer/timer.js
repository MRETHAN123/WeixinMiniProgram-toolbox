Page({
  data: {
    currentTab: 0,
    
    // 秒表数据 (保持不变)
    stopwatchTimer: null,
    isRunning: false,
    accumulatedTime: 0,
    stopwatchUI: { minute: '00', second: '00', millisecond: '00' },

    // 倒计时数据 (更新)
    countDownTimer: null,
    isCountDownRunning: false,
    countDownPaused: false,
    countDownFinished: false,
    
    // 用户输入的时分秒
    inpHour: '', 
    inpMin: '',
    inpSec: '',
    
    totalSeconds: 0,
    countDownUI: { hour: '00', minute: '00', second: '00' }
  },

  onUnload() { this.clearAllTimers(); },
  clearAllTimers() {
    if (this.data.stopwatchTimer) clearInterval(this.data.stopwatchTimer);
    if (this.data.countDownTimer) clearInterval(this.data.countDownTimer);
  },
  switchTab(e) { this.setData({ currentTab: e.currentTarget.dataset.index }); },

  // --- 秒表逻辑 (保持不变，直接复制之前的 toggleStopwatch, resetStopwatch, updateStopwatchUI) ---
  toggleStopwatch() {
    if (this.data.isRunning) {
      clearInterval(this.data.stopwatchTimer);
      this.setData({ isRunning: false });
    } else {
      const timer = setInterval(() => {
        this.data.accumulatedTime += 10;
        this.updateStopwatchUI();
      }, 10);
      this.setData({ isRunning: true, stopwatchTimer: timer });
    }
  },
  resetStopwatch() {
    clearInterval(this.data.stopwatchTimer);
    this.setData({
      isRunning: false,
      accumulatedTime: 0,
      stopwatchUI: { minute: '00', second: '00', millisecond: '00' }
    });
  },
  updateStopwatchUI() {
    const totalMs = this.data.accumulatedTime;
    const m = Math.floor(totalMs / 60000);
    const s = Math.floor((totalMs % 60000) / 1000);
    const ms = Math.floor((totalMs % 1000) / 10);
    this.setData({
      stopwatchUI: { minute: this.padZero(m), second: this.padZero(s), millisecond: this.padZero(ms) }
    });
  },

  // --- 倒计时逻辑 (新) ---
  
  // 监听输入
  onHourInput(e) { this.setData({ inpHour: e.detail.value }) },
  onMinInput(e) { this.setData({ inpMin: e.detail.value }) },
  onSecInput(e) { this.setData({ inpSec: e.detail.value }) },

  toggleCountDown() {
    if (this.data.isCountDownRunning) {
      // 暂停
      clearInterval(this.data.countDownTimer);
      this.setData({ isCountDownRunning: false, countDownPaused: true });
    } else {
      // 开始
      if (!this.data.countDownPaused) {
        // 如果不是暂停恢复，而是新开始，则计算总秒数
        const h = parseInt(this.data.inpHour) || 0;
        const m = parseInt(this.data.inpMin) || 0;
        const s = parseInt(this.data.inpSec) || 0;
        let total = h * 3600 + m * 60 + s;

        if (total <= 0) {
          wx.showToast({ title: '请设置时间', icon: 'none' });
          return;
        }
        this.setData({ totalSeconds: total });
      }

      this.setData({ isCountDownRunning: true, countDownPaused: false, countDownFinished: false });
      this.updateCountDownUI(); // 立即刷新一次显示

      const timer = setInterval(() => {
        this.data.totalSeconds--;
        this.updateCountDownUI();

        if (this.data.totalSeconds <= 0) {
          clearInterval(this.data.countDownTimer);
          this.setData({ isCountDownRunning: false, countDownFinished: true });
          wx.vibrateLong();
          wx.showToast({ title: '时间到！', icon: 'none' });
        }
      }, 1000);
      this.setData({ countDownTimer: timer });
    }
  },

  resetCountDown() {
    clearInterval(this.data.countDownTimer);
    this.setData({
      isCountDownRunning: false,
      countDownPaused: false,
      countDownFinished: false,
      inpHour: '', inpMin: '', inpSec: '', // 清空输入
      totalSeconds: 0
    });
  },

  updateCountDownUI() {
    const s = this.data.totalSeconds;
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    
    this.setData({
      countDownUI: {
        hour: this.padZero(h),
        minute: this.padZero(m),
        second: this.padZero(sec)
      }
    });
  },

  padZero(num) {
    return num < 10 ? '0' + num : '' + num;
  }
});