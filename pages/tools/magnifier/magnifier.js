Page({
  data: {
    zoomValue: 1.0, // 默认放大倍数
    flashState: 'off' // 手电筒状态: off / torch
  },

  onReady() {
    this.cameraContext = wx.createCameraContext('myCamera');
  },

  // 调节焦距
  onZoomChange(e) {
    let newZoomValue = e.detail.value;

    // --- 【修复点2】格式化数字，保留一位小数 ---
    // toFixed(1) 会将数字转为字符串，例如 2.1
    // 再用 parseFloat() 转回数字，确保 slider 组件能正常工作
    newZoomValue = parseFloat(newZoomValue.toFixed(1));

    this.setData({
      zoomValue: newZoomValue
    });
    
    if (this.cameraContext) {
      this.cameraContext.setZoom({
        zoom: newZoomValue
      });
    }
  },

  // 切换手电筒
  toggleFlash() {
    
    const newState = this.data.flashState === 'off' ? 'torch' : 'off';
    
    this.setData({
      flashState: newState
    });
    
    if (newState === 'torch') {
      wx.vibrateShort(); // 震动反馈
    }
  }
})