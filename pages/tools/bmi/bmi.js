Page({
  data: {
    height: '',
    weight: '',
    bmi: null,      // 计算结果
    status: '',     // 状态文字 (偏瘦/正常/...)
    statusClass: '',// 状态样式类名
    suggestion: ''  // 健康建议
  },

  // 1. 监听身高输入
  onHeightInput(e) {
    this.setData({ height: e.detail.value });
  },

  // 2. 监听体重输入
  onWeightInput(e) {
    this.setData({ weight: e.detail.value });
  },

  // 3. 点击计算按钮
  calculateBMI() {
    const h = parseFloat(this.data.height);
    const w = parseFloat(this.data.weight);

    // 校验输入是否合法
    if (!h || !w || h <= 0 || w <= 0) {
      wx.showToast({
        title: '请输入有效数据',
        icon: 'none'
      });
      return;
    }

    // BMI 计算公式：体重(kg) / (身高(m) * 身高(m))
    // 注意：用户输入的是 cm，要除以 100 换算成 m
    const bmiValue = (w / ((h / 100) * (h / 100))).toFixed(1);

    // 判断健康状态
    let status = '';
    let statusClass = '';
    let suggestion = '';

    if (bmiValue < 18.5) {
      status = '偏瘦';
      statusClass = 'status-thin';
      suggestion = '您的体重过轻，建议加强营养摄入，适当增加蛋白质和碳水化合物，配合力量训练增加肌肉量。';
    } else if (bmiValue < 24) {
      status = '正常';
      statusClass = 'status-normal';
      suggestion = '恭喜！您的身材非常标准。请继续保持均衡饮食和规律作息，远离亚健康。';
    } else {
      status = '偏胖';
      statusClass = 'status-fat';
      suggestion = '您的体重超标了。建议控制高热量食物摄入，增加有氧运动（如跑步、游泳），每周至少运动3次。';
    }

    // 更新数据，页面会自动刷新
    this.setData({
      bmi: bmiValue,
      status: status,
      statusClass: statusClass,
      suggestion: suggestion
    });
  }
})