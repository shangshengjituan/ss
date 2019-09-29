
const getters = {
  token: state => state.user.token,
  userName: state => state.user.user.userName,
  userId: state => state.user.user.userId,
  userNum: state => state.user.user.userNum,
  userDepartment: state => state.user.user.userDepartment,
  roles: state => {
    let arr = []
    arr[0] = state.user.user.plateId
    return arr
  },
  departmentName: state => state.user.user.departmentName,
  departmentId: state => state.user.user.departmentId,
  // language: state => state.app.language,
  sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
  // website: state => state.common.website,
  // isLock: state => state.user.isLock,
  // lockPasswd: state => state.user.lockPasswd,
  // isFullScren: state => state.common.isFullScren,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  // browserHeaderTitle: state => state.user.browserHeaderTitle,
  // errorLogs: state => state.errorLog.logs
}

export default getters
