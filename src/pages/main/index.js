// index.js
// 获取应用实例
const app = getApp()
import drawQrcode from '../../utils/weapp.qrcode'


Page({
  data: {
    show: false,
    showPop: false,
    dateText: "",
    fitem: null,
    showLoading: false,
  },
  // 事件处理函数
  bindViewTap() {
  },
  goqrcode() {
    this.setData({
      showPop: true
    })
  },

  counter() {
    var date = new Date();
    var year = date.getFullYear();
    var date2 = new Date(year, 11, 30, 23, 59, 59, 999);//
    /*转换成秒*/
    var time = (date2 - date) / 1000;
    var day = Math.floor(time / (24 * 60 * 60))
    var hour = Math.floor(time % (24 * 60 * 60) / (60 * 60))
    var minute = Math.floor(time % (24 * 60 * 60) % (60 * 60) / 60);
    var second = Math.floor(time % (24 * 60 * 60) % (60 * 60) % 60);
    var str = year + "年还剩" + day + "天" + hour + "时"
    return str

  },
  async onLoad(init) {

    let id = init.id
    let fm_list = app.globalData.list

    if (fm_list.length === 0) {
      this.setData({
        showLoading: true,
        dateText: app.counter()
      })
      fm_list = await app.getList()
      app.globalData.list = fm_list
    }

    let fmitem = null

    fm_list.forEach((item) => {

      if (item._id === id) {
        fmitem = item
      }
    })
    this.setData({
      fitem: fmitem,
      showLoading: false,
    })
    let d = this.counter()
    wx.showShareMenu();
    this.setData({
      show: true,
    })
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      // ctx: wx.createCanvasContext('myQrcode'),
      text: fmitem.qrcode,
      // v1.0.0+版本支持在二维码上绘制图片
    })

  },
  getUserInfo(e) {
  },
  onShareTimeline() {
    return {
      title: '送你一个红包封面',
    }
  },
  onClosePop() {
    this.setData({
      showPop: false,
    })
  },
  onShareAppMessage() {
    return {
      title: '送你一个红包封面',
    }
  }
})
