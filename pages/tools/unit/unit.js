Page({
  data: {
    activeTab: 0,   // 0:长度, 1:温度, 2:重量, 3:体积, 4:速度
    inputValue: '',
    results: [],
    
    unitIndex: 0,
    currentUnits: ['米', '千米', '厘米', '英尺', '英寸'], // 默认显示长度
    
    // 所有单位定义
    unitsData: [
      ['米', '千米', '厘米', '英尺', '英寸'],        // 0. 长度
      ['摄氏度', '华氏度', '开尔文'],               // 1. 温度
      ['千克', '克', '吨', '磅', '斤'],               // 2. 重量
      ['升', '毫升', '立方米', '加仑(美)', '立方英尺'], // 3. 体积 (新)
      ['米/秒', '千米/时', '英里/时', '节', '马赫']    // 4. 速度 (新)
    ]
  },

  // 切换 Tab
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeTab: index,
      unitIndex: 0,
      currentUnits: this.data.unitsData[index],
      inputValue: '',
      results: []
    });
  },

  // 切换单位 Picker
  onUnitChange(e) {
    this.setData({ unitIndex: e.detail.value });
    if (this.data.inputValue) {
      this.calculate(this.data.inputValue);
    }
  },

  // 输入数值
  onInput(e) {
    const val = e.detail.value;
    this.setData({ inputValue: val });
    this.calculate(val);
  },

  // 核心计算入口
  calculate(val) {
    if (!val || isNaN(val)) {
      this.setData({ results: [] });
      return;
    }
    const num = parseFloat(val);
    const type = this.data.activeTab;
    const unitIdx = parseInt(this.data.unitIndex);

    if (type === 0) this.calcLength(num, unitIdx);
    else if (type === 1) this.calcTemp(num, unitIdx);
    else if (type === 2) this.calcWeight(num, unitIdx);
    else if (type === 3) this.calcVolume(num, unitIdx); // 新增
    else if (type === 4) this.calcSpeed(num, unitIdx);  // 新增
  },

  // --- 1. 长度 (基准: 米) ---
  calcLength(val, unitIdx) {
    const toMeter = [1, 1000, 0.01, 0.3048, 0.0254]; 
    const base = val * toMeter[unitIdx];
    this.setData({
      results: [
        { name: '米', value: base.toFixed(4), unit: 'm' },
        { name: '千米', value: (base / 1000).toFixed(4), unit: 'km' },
        { name: '厘米', value: (base * 100).toFixed(2), unit: 'cm' },
        { name: '英尺', value: (base * 3.2808).toFixed(2), unit: 'ft' },
        { name: '英寸', value: (base * 39.370).toFixed(2), unit: 'in' }
      ]
    });
  },

  // --- 2. 温度 (基准: 摄氏度) ---
  calcTemp(val, unitIdx) {
    let cVal = 0;
    if (unitIdx === 0) cVal = val;
    else if (unitIdx === 1) cVal = (val - 32) / 1.8;
    else cVal = val - 273.15;

    this.setData({
      results: [
        { name: '摄氏度', value: cVal.toFixed(1), unit: '°C' },
        { name: '华氏度', value: (cVal * 1.8 + 32).toFixed(1), unit: '°F' },
        { name: '开尔文', value: (cVal + 273.15).toFixed(1), unit: 'K' }
      ]
    });
  },

  // --- 3. 重量 (基准: 千克) ---
  calcWeight(val, unitIdx) {
    const toKg = [1, 0.001, 1000, 0.45359, 0.5];
    const base = val * toKg[unitIdx];
    this.setData({
      results: [
        { name: '千克', value: base.toFixed(4), unit: 'kg' },
        { name: '克', value: (base * 1000).toFixed(2), unit: 'g' },
        { name: '吨', value: (base / 1000).toFixed(4), unit: 't' },
        { name: '磅', value: (base * 2.2046).toFixed(2), unit: 'lb' },
        { name: '斤', value: (base * 2).toFixed(2), unit: '斤' }
      ]
    });
  },

  // --- 4. 体积 (基准: 升 L) ---
  calcVolume(val, unitIdx) {
    // 升, 毫升, 立方米, 美制加仑, 立方英尺
    const toLiter = [1, 0.001, 1000, 3.7854, 28.3168];
    const base = val * toLiter[unitIdx];

    this.setData({
      results: [
        { name: '升', value: base.toFixed(3), unit: 'L' },
        { name: '毫升', value: (base * 1000).toFixed(1), unit: 'mL' },
        { name: '立方米', value: (base / 1000).toFixed(4), unit: 'm³' },
        { name: '加仑(美)', value: (base / 3.7854).toFixed(2), unit: 'gal' },
        { name: '立方英尺', value: (base / 28.3168).toFixed(2), unit: 'ft³' }
      ]
    });
  },

  // --- 5. 速度 (基准: 米/秒 m/s) ---
  calcSpeed(val, unitIdx) {
    // m/s, km/h, mph, knot, mach
    const toMs = [1, 0.27778, 0.44704, 0.51444, 340.3];
    const base = val * toMs[unitIdx];

    this.setData({
      results: [
        { name: '米/秒', value: base.toFixed(2), unit: 'm/s' },
        { name: '千米/时', value: (base * 3.6).toFixed(1), unit: 'km/h' },
        { name: '英里/时', value: (base * 2.2369).toFixed(1), unit: 'mph' },
        { name: '节', value: (base * 1.9438).toFixed(1), unit: 'kn' },
        { name: '马赫', value: (base / 340.3).toFixed(3), unit: 'Ma' }
      ]
    });
  }
});