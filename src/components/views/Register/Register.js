import React from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Form, Input, Button, Row, Col, message, Typography } from "antd";
import Helmet from "react-helmet";
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Register(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("이름은 필수값입니다"),
        email: Yup.string()
          .email("잘못된 Email입니다")
          .required("Email은 필수값입니다"),
        password: Yup.string()
          .min(4, "비밀번호는 최소 4자 이상 입력해야합니다")
          .required("비밀번호는 필수값입니다"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지않습니다")
          .required("비밀번호 확인해주세요"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            console.log(response, "response");
            if (response.payload.status === 201) {
              props.history.push("/login");
            } else {
              message.warning(response.payload.data.message);
            }
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
              <title>REGISTER</title>
            </Helmet>
            <Row
              type="flex"
              justify="center"
              align="middle"
              style={{ minHeight: "100vh" }}
            >
              <Col>
                <Title
                  level={1}
                  style={{ color: "white", textAlign: "center" }}
                >
                  REGISTER
                </Title>
                <Form
                  style={{ minWidth: "375px" }}
                  {...formItemLayout}
                  onSubmit={handleSubmit}
                >
                  <Form.Item
                    required
                    label={<label style={{ color: "white" }}>이름</label>}
                  >
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name && touched.name
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.name && touched.name && (
                      <div className="input-feedback">{errors.name}</div>
                    )}
                  </Form.Item>

                  <Form.Item
                    required
                    label={<label style={{ color: "white" }}>Email</label>}
                    hasFeedback
                    validateStatus={
                      errors.email && touched.email ? "error" : "success"
                    }
                  >
                    <Input
                      id="email"
                      placeholder="Enter your Email"
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

                  <Form.Item
                    required
                    label={<label style={{ color: "white" }}>비밀번호</label>}
                    hasFeedback
                    validateStatus={
                      errors.password && touched.password ? "error" : "success"
                    }
                  >
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

                  <Form.Item
                    required
                    label={
                      <label style={{ color: "white" }}>비밀번호 확인</label>
                    }
                    hasFeedback
                  >
                    <Input
                      id="confirmPassword"
                      placeholder="Enter your confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.confirmPassword && touched.confirmPassword
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="input-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      onClick={handleSubmit}
                      type="primary"
                      disabled={isSubmitting}
                    >
                      제출
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </>
        );
      }}
    </Formik>
  );
}

export default Register;
