Page({
  data: {
    inputTitle: '',
    inputDate: '',
    today: '', // 限制日期选择器不能选过去的时间
    todoList: [] // 任务列表数据
  },

  onLoad() {
    // 1. 设置今天的日期，用于限制 Picker
    const now = new Date();
    const todayStr = this.formatDate(now);
    this.setData({ today: todayStr });

    // 2. 从本地缓存读取历史数据
    const savedList = wx.getStorageSync('todoList') || [];
    
    // 3. 重新计算每一项的剩余天数 (防止过了一天后天数没变)
    const updatedList = savedList.map(item => {
      item.days = this.calculateDays(item.date);
      return item;
    });

    this.setData({ todoList: updatedList });
  },

  // 监听输入
  onTitleInput(e) { this.setData({ inputTitle: e.detail.value }) },
  onDateChange(e) { this.setData({ inputDate: e.detail.value }) },

  // 添加任务
  addTodo() {
    if (!this.data.inputTitle) {
      wx.showToast({ title: '写个任务名吧', icon: 'none' });
      return;
    }
    if (!this.data.inputDate) {
      wx.showToast({ title: '选个日期吧', icon: 'none' });
      return;
    }

    const daysLeft = this.calculateDays(this.data.inputDate);
    if (daysLeft < 0) {
      wx.showToast({ title: '不能选过去的时间', icon: 'none' });
      return;
    }

    const newItem = {
      id: Date.now(), // 用时间戳做唯一ID
      title: this.data.inputTitle,
      date: this.data.inputDate,
      days: daysLeft
    };

    // 把新任务加到列表最前面
    const newList = [newItem, ...this.data.todoList];
    
    this.setData({ 
      todoList: newList,
      inputTitle: '', // 清空输入框
      inputDate: ''
    });

    // 保存到本地
    this.saveData(newList);
  },
 
  // 删除任务
  deleteTodo(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.todoList;
    
    wx.showModal({
      title: '提示',
      content: '确定要删除这个任务吗？',
      success: (res) => {
        if (res.confirm) {
          list.splice(index, 1); // 删除该项
          this.setData({ todoList: list });
          this.saveData(list); // 更新本地缓存
        }
      }
    });
  },

  // 保存数据到 Storage
  saveData(list) {
    wx.setStorageSync('todoList', list);
  },

  // 计算剩余天数
  calculateDays(targetDateStr) {
    const target = new Date(targetDateStr).getTime();
    // 把今天的时分秒去掉，只保留日期，防止计算出小数
    const now = new Date(new Date().setHours(0,0,0,0)).getTime();
    
    const diff = target - now;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  },

  // 格式化日期 YYYY-MM-DD
  formatDate(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${y}-${m < 10 ? '0'+m : m}-${d < 10 ? '0'+d : d}`;
  }
})
