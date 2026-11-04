Page({
  data: {
    amount: '', // 贷款金额 (万)
    years: '',  // 年限
    rate: '',   // 年利率 (%)
    
    // 结果数据
    monthlyPayment: null,
    totalInterest: null,
    totalRepay: null
  },

  // 监听输入
  onAmountInput(e) { this.setData({ amount: e.detail.value }) },
  onYearInput(e) { this.setData({ years: e.detail.value }) },
  onRateInput(e) { this.setData({ rate: e.detail.value }) },

  // 核心计算函数
  calculate() {
    // 1. 获取数据并转为数字
    let amount = parseFloat(this.data.amount); // 万元
    let years = parseFloat(this.data.years);
    let rate = parseFloat(this.data.rate);

    // 2. 校验输入
    if (!amount || !years || !rate) {
      wx.showToast({ title: '请补全信息', icon: 'none' });
      return;
    }

    // 3. 准备计算参数
    let principal = amount * 10000; // 本金换算成元
    let months = years * 12;        // 总月数
    let monthRate = (rate / 100) / 12; // 月利率

    // 4. 套用等额本息公式
    // Math.pow(x, y) 就是 x 的 y 次方
    let x = Math.pow(1 + monthRate, months);
    let monthly = (principal * monthRate * x) / (x - 1);

    // 5. 计算总额
    let totalRepay = monthly * months; // 还款总额
    let totalInterest = totalRepay - principal; // 总利息

    // 6. 格式化结果 (保留2位小数)
    this.setData({
      monthlyPayment: monthly.toFixed(2), // 月供 (元)
      totalInterest: (totalInterest / 10000).toFixed(2), // 利息 (万)
      totalRepay: (totalRepay / 10000).toFixed(2) // 总额 (万)
    });
  }
})