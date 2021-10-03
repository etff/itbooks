import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../actions/userAction";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import Helmet from "react-helmet";

const { Title } = Typography;

function Login(props) {
  const dispatch = useDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState("");

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("잘못된 Email")
          .required("이메일을 입력해주세요"),
        password: Yup.string()
          .min(4, "Password must be at least 4 characters")
          .required("비밀번호를 입력해주세요"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.accessToken) {
                window.localStorage.setItem(
                  "token",
                  response.payload.accessToken
                );
                props.history.push("/");
              } else {
                setFormErrorMessage("아이디나 비밀번호를 다시 확인하세요");
              }
            })
            .catch((err) => {
              setFormErrorMessage("아이디나 비밀번호를 다시 확인하세요");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <>
            <Helmet>
              <title>LOGIN</title>
            </Helmet>
            <Row
              type="flex"
              justify="center"
              align="middle"
              style={{ minHeight: "50vh" }}
            >
              <Col>
                <Title level={1} style={{ color: "white" }}>
                  LOGIN
                </Title>
                <form onSubmit={handleSubmit} style={{ width: "350px" }}>
                  <Form.Item required>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </Form.Item>

                  <Form.Item required>
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </Form.Item>

                  {formErrorMessage && (
                    <label>
                      <p
                        style={{
                          color: "#ff0000bf",
                          fontSize: "0.7rem",
                          border: "1px solid",
                          padding: "1rem",
                          borderRadius: "10px",
                        }}
                      >
                        {formErrorMessage}
                      </p>
                    </label>
                  )}

                  <Form.Item>
                    <div>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{ minWidth: "100%" }}
                        disabled={isSubmitting}
                        onSubmit={handleSubmit}
                      >
                        Log in
                      </Button>
                    </div>
                  </Form.Item>
                </form>
              </Col>
            </Row>
          </>
        );
      }}
    </Formik>
  );
}

export default withRouter(Login);
