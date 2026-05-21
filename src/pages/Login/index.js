import React from "react";
// import Icon from "@/components/Icon";
import styles from "./index.module.scss";
import NavBar from "@/components/NavBar";
import Input from "@/components/Input";
import { useFormik } from "formik";
import classNames from "classnames";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "@/store/actions/login";
import { setTokenInfo } from "@/utils/storage";
import { useNavigate } from "react-router-dom";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
//  const validate = values => {
//    const errors = {};
//    if (!values.mobile) {
//      errors.mobile = '手机号不能为空';
//    } else if (values.mobile.length !== 11) {
//      errors.mobile = '手机号长度必须为11个字符';
//    }

//    if (!values.code) {
//      errors.code = '验证码不能为空';
//    } else if (values.code.length !== 6) {
//      errors.code = '验证码长度必须为6个字符';
//    }

//    return errors;
//  };

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      mobile: "",
      code: "",
    },
    // validate,
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required("手机号不能为空")
        .matches(/^1[3-9]\d{9}$/, "手机号格式不正确"),
      code: Yup.string()
        .required("验证码不能为空")
        .matches(/^\d{6}$/, "验证码格式不正确"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(login(values.mobile, values.code));
      setTokenInfo({
        token: "1234567890abcdef",
        refreshToken: "abcdef1234567890",
      });
      navigate("/home");
    },
  });
  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    isValid,
  } = formik;

  const onExtraClick = () => {
    // 验证手机号是否正确
    if (!/^1[3-9]\d{9}$/.test(values.mobile)) {
      formik.setTouched({ mobile: true });
      return;
    }
    console.log("获取验证码");
    // 发送验证码的请求
    // dispatch(sendCode(values.mobile));
  };

  return (
    <div className={styles.root}>
      <NavBar>登录</NavBar>
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input
              placeholder="请输入手机号"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {touched?.mobile && errors.mobile && (
              <div className="validate">{errors.mobile}</div>
            )}
          </div>
          <div className="input-item">
            <Input
              placeholder="请输入验证码"
              name="code"
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              extra="获取验证码"
              onExtraClick={onExtraClick}
            />
            {touched?.code && errors.code && (
              <div className="validate">{errors.code}</div>
            )}
          </div>

          <button
            type="submit"
            className={classNames("login-btn", { disabled: !isValid })}
            disabled={!isValid}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}
