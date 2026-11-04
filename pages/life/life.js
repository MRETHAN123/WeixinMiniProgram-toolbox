Page({
  data: {
    // 轮播图数据 (5组精选文案)
    banners: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        text: '每一个不曾起舞的日子，都是对生命的辜负 💃'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        text: '保持热爱，奔赴山海，星河长明 🌊'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        text: '自律即自由，坚持终将美好 ✨'
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        text: '慢下来，去感受生活中的小确幸 🍃'
      },
      {
        id: 5,
        url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        text: '愿你遍历山河，觉得人间值得 🏔️'
      }
    ]
  },

  // 通用跳转函数
  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  }
})