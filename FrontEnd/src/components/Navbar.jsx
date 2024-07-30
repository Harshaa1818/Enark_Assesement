import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../constants';


const { Header } = Layout;

export default function ButtonAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isloggedin');
    if (loggedIn) {
      setIsLoggedIn(true);
      const token = document.cookie.split('=')[1];
      axios.get(url + 'api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('isloggedin');
    setIsLoggedIn(false);
    setUsername('');
    window.location.href = '/login';
    localStorage.removeItem('isAdmin');
  };

  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            <NavLink to="/" className='text-xl font-bold'>Home</NavLink>
          </Menu.Item>
          <div style={{ marginLeft: 'auto' }}>
            {isLoggedIn ? (
              <>
                <span style={{ color: 'white', marginRight: '20px' }}>
                  {username}
                </span>
                <Button type="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <Button type="default" style={{ marginRight: '10px' }}>
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <Button type="primary">Register</Button>
                </NavLink>
              </>
            )}
          </div>
        </Menu>
      </Header>
    </Layout>
  );
}
