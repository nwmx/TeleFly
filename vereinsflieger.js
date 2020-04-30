const axios = require("axios");

const BASE_URL = "https://vereinsflieger.de/interface/rest";

module.exports = {
    getAccesstoken: () => axios({
        "method": "GET",
        "url": `${BASE_URL}/auth/accesstoken`,
    }),
  
    signin: (username, password, cid, accesstoken, appkey) => axios({
      "method": "POST",
      "url": `${BASE_URL}/auth/signin`,
      "params": {
        "username": username,
        "password": password,
        "cid": cid,
        "accesstoken": accesstoken,
        "appkey": appkey
        }
      }),
    
      signout: (accesstoken) => axios ({
        "method": "DELETE",
        "url": `${BASE_URL}/auth/signout`,
        "params": {
          "accesstoken": accesstoken
        }
      }),

      flights_today: (accesstoken) => axios ({
        "method": "POST",
        "url": `${BASE_URL}/flight/list/today`,
        "params": {
          "accesstoken": accesstoken
        }
      }),

      flights_date: (accesstoken, date) => axios ({
        "method": "POST",
        "url": `${BASE_URL}/flight/list/date`,
        "params": {
          "accesstoken": accesstoken,
          "dateparam": date
        }
      }),

      getUser: (accesstoken) => axios ({
        "method": "POST",
        "url": `${BASE_URL}/auth/getuser`,
        "params":{
          "accesstoken": accesstoken
        }
      }),

      userList: (accesstoken) => axios ({
        "method": "POST",
        "url": `${BASE_URL}/user/list`,
        "params": {
          "accesstoken": accesstoken
        }
      }),

      flight_list_user: (accesstoken, uid, count) => axios ({
        "method": "POST",
        "url": `${BASE_URL}/flight/list/user`,
        "params": {
          "accesstoken": accesstoken,
          "uid": uid,
          "count": count
        }
      })
};