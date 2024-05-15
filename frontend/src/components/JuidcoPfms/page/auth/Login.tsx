"use client";

import Button from "@/components/global/atoms/Button";
import Input from "@/components/global/atoms/Input";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
// import { PFMS_URL } from "@/utils/api/urls";
// import axios from "@/lib/axiosConfig";
import { useDispatch } from "react-redux";
import { login } from "@/redux/reducers/authReducer";
import axios from "axios";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { initialApiCall } from "@/utils/initialApiCall";
// some comment

interface LoginInitialData {
  user_id: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [hide, setHide] = useState(true);
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();

  const LoginSchema = Yup.object().shape({
    user_id: Yup.string().required("User Id is required"),
    password: Yup.string().required("Password is required"),
  });

  ///////////////// Handling Login Logics /////////////

  const handleLogin = async (values: LoginInitialData) => {
    activateWorkingAnimation();
    try {
      // "https://jharkhandegovernance.com/auth/api/login",
      const res = await axios.post(`${process.env.backend}/api/login`, {
        email: values.user_id,
        password: values.password,
      });
      // const res = await axios({
      //   url: PFMS_URL.AUTH_URL.login,
      //   method: "POST",
      //   data: {
      //     email: values.user_id,
      //     password: values.password,
      //   },
      // });

      if (res.data.status) {
        const data:any = await initialApiCall()
        const updatedData = {
          ...res.data.data,
          userDetails: {...res.data.data.userDetails, ...data},
        }
        dispatch(login(updatedData));
        window.location.replace("/pfms/home");
      } else {
        hideWorkingAnimation();
        setErrorMsg("You have entered wrong credentials !!");
      }
    } catch (error) {
      hideWorkingAnimation();
      setErrorMsg("Something Went Wrong!!");
      console.log(error);
    }
  };

  const handleHideShowPass = () => {
    setHide(!hide);
  };

  return (
    <>
      {workingAnimation}

      <div className="max-w-full w-full px-2 sm:px-12 lg:pr-20 mb-12 lg:mb-0">
        <div className="relative">
          <div className="p-6 sm:py-8 sm:px-12 rounded-lg bg-white darks:bg-gray-800 shadow-xl">
            <Formik
              initialValues={{
                user_id: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values: LoginInitialData) => {
                handleLogin(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="text-center">
                    <h1 className="text-2xl leading-normal mb-3 font-bold text-gray-800 darks:text-gray-300 text-center">
                      Welcome Back
                    </h1>
                  </div>
                  <div className="flex flex-col mt-4 text-center">
                    <span className="text-center text-red-400">{errorMsg}</span>
                  </div>
                  <hr className="block w-12 h-0.5 mx-auto my-5 bg-gray-700 border-gray-700" />
                  <div className="mb-6">
                    <div className="mt-1 mb-6">
                      <Input
                        label="Username"
                        placeholder="Username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.user_id}
                        error={errors.user_id}
                        touched={touched.user_id}
                        name="user_id"
                      />
                    </div>
                    <Input
                      label="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={errors.password}
                      touched={touched.password}
                      name="password"
                      placeholder="Password"
                      className="mt-1"
                      type={hide ? "password" : "text"}
                      icon={
                        hide ? (
                          <svg
                            onClick={handleHideShowPass}
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 52 50"
                            fill="none"
                          >
                            <path
                              d="M3.49755 2.5L48.4975 47.5M20.6083 19.7841C19.3017 21.134 18.4976 22.973 18.4976 25C18.4976 29.1423 21.8555 32.5 25.9975 32.5C28.0538 32.5 29.9168 31.6725 31.2715 30.3325M12.2476 11.6179C7.4993 14.7509 3.88263 19.4599 2.14258 25C5.3282 35.1427 14.804 42.5 25.998 42.5C30.9703 42.5 35.6035 41.0485 39.497 38.546M23.4975 7.62347C24.32 7.54182 25.1543 7.5 25.998 7.5C37.1923 7.5 46.668 14.8573 49.8535 25C49.1518 27.235 48.1443 29.3345 46.8805 31.25"
                              stroke="black"
                              strokeOpacity="0.6"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            onClick={handleHideShowPass}
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 61 61"
                            fill="none"
                          >
                            <path
                              d="M37.9794 30.0859C37.9794 34.2282 34.6217 37.5859 30.4794 37.5859C26.3374 37.5859 22.9795 34.2282 22.9795 30.0859C22.9795 25.9437 26.3374 22.5859 30.4794 22.5859C34.6217 22.5859 37.9794 25.9437 37.9794 30.0859Z"
                              stroke="black"
                              strokeOpacity="0.35"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M30.4808 12.5859C19.2866 12.5859 9.81094 19.9431 6.62524 30.0859C9.81089 40.2287 19.2866 47.5859 30.4808 47.5859C41.6748 47.5859 51.1505 40.2287 54.3363 30.0859C51.1505 19.9432 41.6748 12.5859 30.4808 12.5859Z"
                              stroke="black"
                              strokeOpacity="0.35"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )
                      }
                    />
                  </div>

                  <div className="grid mt-6">
                    <Button
                      className="w-[100%] flex justify-center mt-6"
                      variant="primary"
                      buttontype="submit"
                    >
                      <svg
                        xmlnsXlink="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="inline-block w-4 h-4 ltr:mr-2 rtl:ml-2 bi bi-box-arrow-in-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                      </svg>
                      Log in
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
            <div className="my-2">
              <div className="flex flex-col items-center justify-center flex-wrap gapx-x-2 gap-y-2 w-full poppins">
                <span
                  className="text-gray-700 text-sm font-semibold cursor-pointer w-full text-center"
                  onClick={() => {
                    // setmobileCardStatus(true)
                  }}
                >
                  Forgot Password
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
