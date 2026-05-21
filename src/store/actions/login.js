import request from "@/utils/request";

export const sendCode = (mobile) => {
  return async (dispatch) => {
    console.log("发送验证码", mobile);
    const res = await request({
      url: "/api/sendCode",
      method: "GET",
      data: {
        mobile,
      },
    });
    // const res = await new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve({ success: true });
    //     }, 1000);
    // });
    console.log("发送验证码结果", res);
  };
};

export const login = (mobile, code) => {
  return async (dispatch) => {
    console.log("登录", mobile, code);
    // const res = await request({
    //     url: "/api/login",
    //     method: "POST",
    //     data: {
    //         mobile,
    //         code,
    //     },
    // });
    // console.log("登录结果", res);
    // if (res.success) {
    dispatch({
      type: "SET_TOKEN",
      payload: {
        token: "1234567890abcdef",
        // token: res.data.token,
        refreshToken: "abcdef1234567890",
        // refreshToken: res.data.refreshToken,
      },
    });
    // }
  };
};
