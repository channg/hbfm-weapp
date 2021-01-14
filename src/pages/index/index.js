// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    showLoading: false,
    dateText: "",
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    sh: true,
  },
  // 事件处理函数
  bindViewTap() {
  },

  goitem(e) {
    wx.navigateTo({ url: '/pages/main/index?id=' + e.target.dataset.id })
  },
  de13(ctext) {
    if (!ctext) {
      return ""
    }
    let plain = ""
    // do the encoding
    for (var i = 0; i < ctext.length; i++) {
      var ccode = ctext.charCodeAt(i);
      var pcode = ccode;
      if (ccode >= 65 && ccode <= 90) {
        pcode = ((ccode - 65) - 13 * 1 + 26) % 26 + 65;
      }
      if (ccode >= 97 && ccode <= 122) {
        pcode = ((ccode - 97) - 13 * 1 + 26) % 26 + 97;
      }
      plain += String.fromCharCode(pcode);
    }
    return plain
  },
  async onLoad() {
    let list = app.globalData.list
   
    if (list.length === 0) {
      this.setData({
        showLoading: true,
        dateText: app.counter()
      })
      list = await app.getList()
      app.globalData.list = list
    }
    wx.showShareMenu();
    this.setData({
      list,
      list1: list[0] ? [list[0]] : [],
      showLoading: false,
    })
    setTimeout(() => {
      this.setData({
        list2: list[1] ? [list[1]] : []
      })
    }, 300)
    setTimeout(() => {
      this.setData({
        list3: list[2] ? [list[2]] : []
      })
    }, 600)

    setTimeout(() => {
      let gl = []
      for (let u = 0; u < list.length; u++) {
        if (u !== 0 && u !== 1 && u !== 2) {
          gl.push(list[u])
        }
      }
      this.setData({
        list4: gl
      })
    }, 900)

  },
  getUserInfo(e) {
  },
  onShareTimeline() {
  }
})
