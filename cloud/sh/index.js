const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
})



exports.main = async (event, context) => {
    let data = await db.collection('sh').aggregate().end()
    let list = data.list
    let item = list[0]
    return {
        sh:item
    }
}