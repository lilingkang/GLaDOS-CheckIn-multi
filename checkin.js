const axios = require("axios");

const checkIn = async (cookie) => {
    return axios({
        method: 'post',
        url: 'https://glados.rocks/api/user/checkin',
        data: {
            token: "glados.network"
        },
        headers: {
          cookie
        }
    })
}

const status = async (cookie) => {
    return axios({
        method: 'get',
        url: 'https://glados.rocks/api/user/status',
        headers: {
          cookie
        }
    })
}

const server = (checkInMessage, leftDays) => {
    return axios({
        method: 'get',
        url: `https://sc.ftqq.com/${SCKEY}.send`,
        params: {
            text: `${leftDays}天后到期，${checkInMessage}`
        }
    })
}

const GLaDOSCheckIn = async (cookie) => {
    const checkInMessage = (await checkIn(cookie))?.data?.message;
    const statusData = (await status(cookie))?.data?.data
    const leftDays = parseInt(statusData?.leftDays);
    console.log(statusData, leftDays, checkInMessage);
    if (SCKEY) {
        server(checkInMessage, leftDays);
    }
}

const SCKEY = process.env.SCKEY;
const COOKIES = process.env.COOKIES;
const cookiesList = COOKIES.split('--分隔符--')

cookiesList.forEach(cookie=>{
  GLaDOSCheckIn(cookie);
})
