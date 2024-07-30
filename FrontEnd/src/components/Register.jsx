import { useState } from "react";
import { Form, Input, Button, Typography, Row, Col, Card } from "antd";
import axios from "axios";
import { url } from "../../constants";
const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();

  const handleRegister = (values) => {
    axios.post(url + 'api/v1/user/register', values)
      .then((res) => {
        alert('Registration Successful');
        window.location.href = '/login';
      })
      .catch((error) => {
        console.log(error);
        alert('Registration failed. Please try again.');
      });
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }} className="bg-slate-200">
      <Col span={8}>
        <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: '10px' }}>
          <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleRegister}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid E-mail!' }
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
