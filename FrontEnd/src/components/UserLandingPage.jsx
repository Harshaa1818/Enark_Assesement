import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Form, Input, Select } from 'antd';
import { FileAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ButtonAppBar from './Navbar.jsx';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const TaskForm = ({ onFinish, onFinishFailed, initialValues, form }) => (
  <Form
    form={form}
    name="taskForm"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={initialValues}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Task Name"
      name="taskName"
      rules={[{ required: true, message: 'Please input your task name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      rules={[{ required: true, message: 'Please input your description!' }]}
    >
      <TextArea rows={4} />
    </Form.Item>

    <Form.Item
      label="Priority"
      name="priority"
      rules={[{ required: true, message: 'Please select the priority!' }]}
    >
      <Select>
        <Option value="low">Low</Option>
        <Option value="medium">Medium</Option>
        <Option value="high">High</Option>
      </Select>
    </Form.Item>

    <Form.Item
      label="Status"
      name="status"
      rules={[{ required: true, message: 'Please select the status!' }]}
    >
      <Select>
        <Option value="to-do">To Do</Option>
        <Option value="inprogress">In Progress</Option>
        <Option value="done">Done</Option>
      </Select>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default function UserLandingPage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();
 const isAdmin = localStorage.getItem('isAdmin');
  const url = isAdmin ? "http://localhost:8000/api/v1/admin/getalltasks" :'http://localhost:8000/api/v1/task/';
  useEffect(() => {
    const token = document.cookie.split('=')[1];
    if (!token) {
      alert('Please login first.');
      window.location.href = '/login';
      return;
    }

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setTasks(isAdmin ? response.data.task : response.data.tasks)
        console.log(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (open && editingTask) {
      form.setFieldsValue(editingTask);
    } else {
      form.resetFields();
    }
  }, [open, editingTask, form]);

  const showModal = (task = null) => {
    setEditingTask(task);
    setOpen(true);
  };

  const handleOk = (values) => {
    const token = document.cookie.split('=')[1];
    setConfirmLoading(true);

    if (editingTask) {
      axios.put(`http://localhost:8000/api/v1/task/updatetask/${editingTask._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setTasks(tasks.map(task => task._id === editingTask._id ? response.data.task : task));
          setOpen(false);
          setConfirmLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setConfirmLoading(false);
        });
    } else {
      axios.post('http://localhost:8000/api/v1/task/addtask', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setTasks([...tasks, response.data.task]);
          setOpen(false);
          setConfirmLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setConfirmLoading(false);
        });
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const deleteTask = (taskId) => {
    const token = document.cookie.split('=')[1];
    axios.delete(`http://localhost:8000/api/v1/task/deletetask/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setTasks(tasks.filter(task => task._id !== taskId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    (acc[task.priority] = acc[task.priority] || []).push(task);
    return acc;
  }, {});

  const renderTasks = (tasks) => {
    if (!tasks.length) {
      return <p className="text-gray-500">No tasks available</p>;
    }

    return tasks.map((task) => (
      <div key={task._id} className="mb-4 flex justify-center">
        <Card
          title={task.taskName.toUpperCase()}
          id={task?.userId}
          className="p-4 rounded-lg shadow-lg bg-white"
          style={{ width: 300 }}
        >
          <p className="text-gray-700">{task.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className={task.priority === 'high' ? "bg-red-500 text-white rounded-full px-3 py-1 text-xs font-semibold" : task.priority === 'low' ? "bg-green-400 text-white rounded-full px-3 py-1 text-xs font-semibold" : 'bg-yellow-400 text-white rounded-full px-3 py-1 text-xs font-semibold'}>
              {task.priority}
            </span>
            <span className="text-gray-500 text-xs">{task.status}</span>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button type="link" icon={<EditOutlined />} onClick={() => showModal(task)} style={{ border: '1px solid #1890ff', borderRadius: '4px' }}>Edit</Button>
            <Button type="link" icon={<DeleteOutlined />} danger onClick={() => deleteTask(task._id)} style={{ border: '1px solid red', borderRadius: '4px' }}>Delete</Button>
          </div>
          <p>{}</p>
        </Card>
      </div>
    ));
  };

  return (
    <>
      <ButtonAppBar />
      <div className="w-full h-max bg-slate-200 p-5">
        <Button
          type="primary"
          onClick={() => showModal()}
          className="fixed bottom-10 right-10 rounded-full w-12 h-12 flex items-center justify-center text-lg"
          style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
        >
          <FileAddOutlined />
        </Button>
        <Modal
          title={editingTask ? "Edit Task" : "Create New Task"}
          open={open}
          onCancel={handleCancel}
          footer={null}
        >
          <TaskForm
            form={form}
            onFinish={handleOk}
            onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
            initialValues={editingTask || {}}
          />
        </Modal>

        <div className="flex flex-wrap justify-center gap-4">
          {['high', 'medium', 'low'].map((priority) => (
            <div key={priority} className={`p-4 mb-4 ${priority === 'high' ? 'bg-red-50' : priority === 'medium' ? 'bg-yellow-50' : 'bg-green-50'} rounded-lg shadow-md w-full`}>
              <h2 className="text-xl font-semibold mb-4 capitalize text-center">{priority} Priority</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {renderTasks(groupedTasks[priority] || [])}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
