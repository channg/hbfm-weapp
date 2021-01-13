// app.js
let gpromise = null

App({
  onLaunch() {
  },
  globalData: {
    list: []
  },
  getList() {
    if (gpromise) {
      return gpromise
    } else {
      gpromise = new Promise((resolve) => {
        wx.cloud.init({
          env: 'lbfm-tpnqm',
        });

        wx.cloud.callFunction({
          name: 'getlist',
          data: {
          },
          success: function (res) {
            let list = res.result.list.map((item) => {
              return {
                ...item,
                img: de13(item.img),
                qrcode: de13(item.qrcode)
              }
            })
            resolve(list)
          },
          fail: function (err) {
            reject(err)
          },
          complete: function () {
          }
        });
      })
      return gpromise
    }
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
    var str = "今年还剩" + day + "天"
    return str
  },
})


function de13(ctext) {
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
}