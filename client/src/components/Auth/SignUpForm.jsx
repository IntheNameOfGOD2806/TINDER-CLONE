import PropTypes from "prop-types";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Form, Input, Button, Radio, Checkbox, Typography } from "antd";
import toast from "react-hot-toast";

const { Text } = Typography;

import { Select } from "antd";
import { useForm } from "antd/es/form/Form";

const { Option, OptGroup } = Select;

const options = [
  {
    category: "Công nghệ thông tin",
    jobs: ["Lập trình viên", "Quản trị hệ thống", "Kỹ sư phần mềm"],
  },
  {
    category: "Y tế",
    jobs: ["Bác sĩ", "Y tá", "Dược sĩ"],
  },
  {
    category: "Kinh doanh",
    jobs: ["Nhân viên bán hàng", "Quản lý kinh doanh", "Marketing"],
  },
];

const JobSelect = ({form}) => {
  JobSelect.propTypes = {
    form: PropTypes.object.isRequired
  }
  // const handleChange = (value) => {
  //   form.setFieldValue( "job", value);
  // };

  return (
    <Form.Item name="job"
    required
    rules={[{ required: true, message: "Please select a job" }]}
    >
  <Select
      style={{ width: 300 }}
      placeholder="Chọn ngành và nghề"
      // onChange={( value) => handleChange(value)}
    >
      {options.map((group) => (
        <OptGroup key={group.category} label={group.category}>
          {group.jobs.map((job) => (
            <Option key={job} value={job}>
              {job}
            </Option>
          ))}
        </OptGroup>
      ))}
    </Select>

    </Form.Item>
  
  );
};


const SignUpForm = (props) => {
  SignUpForm.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    setIsLogin: PropTypes.func.isRequired,
  };

  const { isLogin } = props;

  const { signup, loading } = useAuthStore();
const [form] =useForm(); 
  const handleSubmitForm = async (form) => {
    try {
      const res = await signup(... await form.validateFields());
    if (res?.success) {
      toast.success(`User ${res?.user?.name} registered successfully!`);
    }
    } catch (error) {
      toast.error(error?.message|| "Registration failed!");  
    }
  };

  return (
    <div className="form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitForm}
        className="form"
        initialValues={{
          age: 18,
        }}
      >
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
        
          label="Repeat Password"
          name="repeatPassword"
          rules={[{ required: true, message: "Re-enter your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value && value !== getFieldValue('password')) {
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              }
              return Promise.resolve();
            },
          })]}
        >
          <Input.Password
          
          placeholder="Password" />
        </Form.Item>
        {/* Age */}
        <Form.Item
          label="Age"
          name="age"
          rules={[
            { required: true, message: "Please enter your age" },
            {
              type: "number",
              min: 18,
              max: 120,
              message: "Age must be between 18 and 120",
            },
          ]}
        >
          <Input type="number" placeholder="Age" />
        </Form.Item>
        {/* job */}
        <Form.Item
          label="Job"
          name="job"
         required
        >
          <JobSelect 
            form={form}
          />
        </Form.Item>

        {/* Gender */}
        <Form.Item name="gender" label="Your Gender" required>
          <Radio.Group
          
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Gender Preference */}
        <Form.Item name="genderPreference" label="Preferred Gender">
          <Radio.Group
            onChange={(e) => (
              form.setFieldValue("genderPreference", e.target.value)
            )}
          
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="both">Both</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Login Toggle */}
        <div className="login-toggle">
          <Text type="secondary">
            {isLogin ? (
              <span
                className="cursor-pointer text-link"
                onClick={() => props.setIsLogin(false)}
              >
                New to Dat09? Create an account.
              </span>
            ) : (
              <span
                className="cursor-pointer text-link"
                onClick={() => props.setIsLogin(true)}
              >
                Already have an account? Sign in.
              </span>
            )}
          </Text>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <Button
          onClick={()=>{
            handleSubmitForm(form)
          }}
            type="primary"
           
            loading={loading}
            className="submit-button"
          >
            {isLogin ? "Sign in to your Account" : "Create new Account"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
