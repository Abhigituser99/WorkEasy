import React, { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  message,
  Select,
  Radio,
  Upload,
  InputNumber,
  Typography,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCountriesQuery } from '../../services/api/dropdownApi';

const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const SignUp = () => {
  const [form] = Form.useForm();
 
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const { data: countriesData, isLoading, isError, error } = useGetCountriesQuery();

 //file upload related to antd

 const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);


  };

  // Helper for AntD Upload component
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow p-6 md:p-8 w-full max-w-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <p className="text-sm text-gray-500">Join us and start your journey</p>
        </div>

        <Form
          form={form}
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          scrollToFirstError
        >
          {/* Name */}
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your full name', whitespace: true }]}
          >
            <Input size="large" placeholder="John Doe" prefix={<UserOutlined />} />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input size="large" placeholder="you@example.com" prefix={<MailOutlined />} />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please create a password' }]}
            hasFeedback
          >
            <Input.Password size="large" placeholder="••••••••" prefix={<LockOutlined />} />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="••••••••" prefix={<LockOutlined />} />
          </Form.Item>

          {/* Role */}
          <Form.Item name="role" label="I am a" rules={[{ required: true, message: 'Please select your role' }]}>
            <Radio.Group>
              <Radio value="CLIENT">Client</Radio>
              <Radio value="SERVICE_PROVIDER">Service Provider</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Country */}
          <Form.Item name="countryId" label="Country">
            <Select showSearch size="large" placeholder="Select your country"
              filterOption={(input, option) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >

              {countriesData?.data?.map(country => (
                <Option key={country.id} value={country.id}>
                  {country.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Age */}
          <Form.Item name="age" label="Age">
            <InputNumber size="large" min={1} max={120} style={{ width: '100%' }} placeholder="e.g., 25" />
          </Form.Item>

          {/* Profile Picture */}
          <Form.Item
            name="profilePicture"
            label="Profile Picture"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="http://localhost:3000/api/upload/"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img draggable={false} src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Create Account
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;