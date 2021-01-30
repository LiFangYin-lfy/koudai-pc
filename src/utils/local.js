// 导出一个本地操作用户信息的模块（设置用户，获取用户，清除用户）
const KEY = 'koudaishangcheng-key'
const local = {
  setUser(user) {
    // 存储 setItem(key,value) key将来获取时候需要使用  value json字符串格式
    const jsonStr = JSON.stringify(user)
    window.localStorage.setItem(KEY, jsonStr)
  },
  getUser() {
    const jsonStr = window.localStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  delUser() {
    window.localStorage.clear()
  },

}
export default local
