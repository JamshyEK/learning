import { ILogin } from "../interface/interface";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../redux/services/authApi";
import FormInput from "../components/FormFields/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../validators/validators";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginMutation();
  const handleSubmit = async (values: ILogin) => {
    try {
      const response = await loginUser(values).unwrap();
      localStorage.setItem("user", JSON.stringify(response));
      if (response.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded shadow-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}>
          {({ handleChange, values }) => (
            <Form>
              <FormInput
                name='email'
                labelName='Email'
                placeHolder='Enter your email'
                data-testid='emailInput'
                onChange={handleChange}
                type='email'
                value={values.email}
              />
              <FormInput
                name='password'
                labelName='Password'
                placeHolder='Enter your password'
                data-testid='passwordInput'
                onChange={handleChange}
                type='password'
                value={values.password}
              />
              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
                data-testid='loginBtn'
                disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <p className='text-center text-sm mt-4'>
                Don’t have an account?{" "}
                <Link
                  to='/register'
                  className='text-blue-600 hover:underline font-medium'>
                  Register
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
