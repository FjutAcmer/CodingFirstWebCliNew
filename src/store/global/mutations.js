export function cleanAll(state) {
  state.token = "";
  state.username = "";
  state.isLogin = false;
  state.privateInfo = "";
  state.notReadMsgCount = 0;
}

export function logout(state) {
  state.token = "";
  state.username = "";
  state.isLogin = false;
  state.privateInfo = "";
  state.notReadMsgCount = 0;
}

export function setUsername(state, username) {
  state.username = username;
}

export function setToken(state, token) {
  state.token = token;
}

export function setIsLogin(state, isLogin) {
  state.isLogin = isLogin;
}

export function setPrivateInfo(state, privateInfo) {
  state.privateInfo = privateInfo;
}

export function setNotReadMsgCount(state, notReadMsgCount) {
  state.notReadMsgCount = notReadMsgCount;
}
