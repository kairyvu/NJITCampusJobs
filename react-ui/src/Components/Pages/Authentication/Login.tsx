import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/NJIT Campus Job-logos_transparent.svg";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
interface InputForm {
  email: string;
  password: string;
}

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const formik = useFormik<InputForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please enter a valid email")
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email"
        ),
      password: Yup.string().required(
        "Please enter the password for your NCJ account"
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="font-montserat flex justify-center items-center h-screen">
      <section className="w-5/12 bg-gradient-to-b from-cyan-500 h-full flex items-center">
        <img src={logo} className="" />
      </section>
      <section className="w-7/12">
        <div className="block mb-10 font-bold text-center m-auto align-middle w-4/5 p-auto text-2xl	">
          Sign in to your account
        </div>
        <form
          className="w-4/5 align-middle m-auto block"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col justify-center items-center">
            <input
              className="rounded-full text-center py-2 px-5 w-4/5 mx-8 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg focus:outline-0"
              placeholder="Email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <div className="h-10 w-4/5 ml-8 pl-1 flex justify-start items-center">
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500 text-center align-middle flex-initial">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="rounded-full bg-gray-200 w-4/5 mx-8 hover:bg-gray-300 text-xl flex justify-between items-center">
              <input
                className="py-2 ml-10 border-none text-center placeholder:text-center text-lg w-full bg-transparent focus:outline-0"
                placeholder="Password"
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <div
                className="px-2 pb-2 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            </div>
            <div className="h-10 w-4/5 ml-8 pl-1 flex justify-start items-center">
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-500 text-center align-middle flex-initial">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="rounded-full p-2 w-4/5 mx-8 mb-8 placeholder:text-center text-xl bg-cyan-400 hover:bg-cyan-600 text-white"
            >
              SIGN IN
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
