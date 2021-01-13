const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
})


function do_encrypt(plain) {
    var key   = 13
    // console.log(key);
    var ctext = "";

    // do the encoding
    for( var i = 0; i < plain.length; i ++ ) {
        var pcode = plain.charCodeAt( i );
        var ccode = pcode;
        if ( pcode >= 65 && pcode <= 90 ) {
            ccode = ( ( pcode - 65 ) + key * 1 ) % 26 + 65;
        }
        if ( pcode >= 97 && pcode <= 122 ) {
            ccode = ( ( pcode - 97 ) + key * 1 ) %26 + 97;
        }
        // console.log(pcode + "," + ccode);
        ctext += String.fromCharCode(ccode);
    }

    return ctext
}

exports.main = async (event, context) => {
    let data = await db.collection('fmlist').aggregate().sort({ sort: -1 }).end()
    let list = data.list.map((item) => {
        return {
            ...item,
            img:do_encrypt(item.img),
            qrcode:do_encrypt(item.qrcode),
        }
    })
    return {
        list
    }
}