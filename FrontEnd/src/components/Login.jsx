import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, Typography, Row, Col, Card } from 'antd';
import axios from 'axios';
import { url } from '../constants';


const { Title } = Typography;


const LoginPage = () => {
  const [form] = Form.useForm();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleSubmit = (values) => {
   axios.post(url+"/user/login", values)
      .then((res) => {
        alert('Login Successful');
        const token = res.data.AccessToken;
        document.cookie = `token=${token}`;
        localStorage.setItem('isloggedin', true);
        localStorage.setItem('isAdmin', res.data.role === 'user' ? false : true);
        setIsUserLoggedIn(true);
        window.location.href = '/UserLandingPage';
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }} className='bg-slate-200'>
      <Col span={8}>
        <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: '10px' }}>
          <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Enter your username" />
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
                Login
              </Button>
            </Form.Item>

            <Form.Item>
              <NavLink to='/register'>
                <Button type="default" block>
                  Register
                </Button>
              </NavLink>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
