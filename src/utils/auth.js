export function getToken() {
  let token = localStorage.getItem("token");
  let tokenExpiredAt = localStorage.getItem("tokenExpiredAt");

  if (token == undefined || tokenExpiredAt == undefined) {
    return null;
  } else if (token == "undefined" || tokenExpiredAt == "undefined") {
    return null;
  }

  if (Date.now() > tokenExpiredAt) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiredAt");
    return null;
  }
  return {
    token,
    outdatedCount: tokenExpiredAt - Date.now(),
  };
}
