import Cookies from 'js-cookie'
const schoolCode = 'school-Code'//学校识别码
const TokenKey = 'Admin-Token'
const UuidKey = 'Uu-id'
const schoolIdKey = 'school-Id'//学校id
const roleIdKey = 'role-Id'
const Nickname = 'Nick-Name'
const HeadPath = 'Head-Path'
const getuserPhonekey = 'User-Phone'
const getuserNamekey = 'User-Name'

// return Cookies.remove(HeadPath) //  删除


// 获取
export function getheadPath() {
  return Cookies.get(HeadPath)
}
// 存
export function setheadPath(headPath) {
    return Cookies.set(HeadPath, headPath)
}
  
