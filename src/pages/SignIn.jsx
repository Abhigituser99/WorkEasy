// src/pages/SignIn.jsx
import React, { useState } from "react";
import { Form, Input, Button, Divider, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Text } = Typography;

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // TODO: call your API here
      // await api.post('/auth/signin', values)
      message.success("Signed in successfully");
      navigate("/dashboard");
    } catch (e) {
      message.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: redirect to your Google OAuth endpoint
    message.info("Redirecting to Google…");
  };

  return (
    <div className="w-full h-full flex felx-col items-center justify-center ">

    
    <div className="bg-white rounded-2xl shadow p-6 md:p-8 w-full max-w-md">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-gray-500">Sign in to continue</p>
      </div>

      <Form
        name="signin"
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input
            size="large"
            placeholder="you@example.com"
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            size="large"
            placeholder="••••••••"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        {/* Forgot password link just below password */}
        <div className="flex justify-end -mt-2 mb-4">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Form.Item className="mb-3">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>

        <Divider plain>or</Divider>

        <Button
          size="large"
          block
          onClick={handleGoogleLogin}
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.4 6.3 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.5 0 19.2-7.6 19.2-20 0-1.3-.1-2.5-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.4 6.3 29.5 4 24 4 16 4 9.1 8.4 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.1 0 9.8-1.9 13.3-5l-6.1-5.1C29.2 36 26.7 37 24 37c-5.1 0-9.4-3.3-10.9-7.8l-6.7 5.2C9.2 39.6 16 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.1 3.2-3.5 5.6-6.6 6.9l6.1 5.1c-4.3 3-9.8 3.9-14.8 2.2-7.1-2.5-12-9.2-12-17.2S12.9 4 24 4c5.5 0 10.4 2.3 13.7 6l5.9-5.9C39.9 0 32.4-2 24 0 10.8 0 0 10.8 0 24s10.8 24 24 24c12.7 0 23.2-9.2 24-21.7.1-1.1.1-2 .1-2.8 0-1.1-.2-2.1-.5-3z"/>
            </svg>
          }
        >
          Continue with Google
        </Button>

        <div className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </Form>
    </div>
    </div>
  );
};

export default SignIn;
