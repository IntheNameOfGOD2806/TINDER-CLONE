import PropTypes from "prop-types";
import { useState } from "react";
import useSignIn from "../../hooks/useSignIn.js";
import toast from "react-hot-toast";

const LoginForm = (props) => {
  const { isLogin } = props;
  const { login, loading } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  LoginForm.propTypes = {
    setIsLogin: PropTypes.func,
    isLogin: PropTypes.bool,
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res && res.success === true) {
      toast.success(`Welcome user ${res?.user?.name}!`);
    } else if (res && res.success === false) {
      toast.error(res?.msg);
    }
  };

  const handleThirdPartySignIn = async (provider) => {
    // Logic để xử lý đăng nhập bên thứ ba
    try {
      const res = await provider.signIn(); // Thay thế bằng API provider cụ thể.
      if (res.success) {
        toast.success(`Welcome ${res.user?.name || "user"}!`);
      } else {
        toast.error("Third-party sign-in failed!");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error during third-party sign-in");
    }
  };

  return (
    <>
      <div className={"flex flex-col gap-4"}>
        <form className={"flex flex-col gap-4"}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              placeholder={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="grow"
            />
          </label>
        </form>
      </div>

      {/* Section for third-party sign-in */}
      <div className="flex flex-col items-center mt-4">
        <button
          onClick={() => handleThirdPartySignIn("google")}
          className="btn btn-outline btn-success w-full mb-2"
        >
          Continue with Google
        </button>
        <button
          onClick={() => handleThirdPartySignIn("facebook")}
          className="btn btn-outline btn-primary w-full mb-2"
        >
          Continue with Facebook
        </button>
        <button
          onClick={() => handleThirdPartySignIn("github")}
          className="btn btn-outline btn-dark w-full"
        >
          Continue with GitHub
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className={"text-sm text-green-600"}>
          {isLogin ? (
            <span
              onClick={() => {
                props.setIsLogin(false);
              }}
            >
              New to Dat09?{" "}
            </span>
          ) : (
            <span
              onClick={() => {
                props.setIsLogin(true);
              }}
            >
              Already have an account?{" "}
            </span>
          )}
        </p>
        <button
          onClick={(e) => {
            handleSubmitForm(e);
          }}
          className={`btn btn-active btn-error mt-2 text-white font-medium transition-colors duration-300`}
        >
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            <div>
              {!isLogin ? "Create new Account" : "Sign in to your Account"}
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default LoginForm;
