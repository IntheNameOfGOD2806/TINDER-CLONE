import PropTypes from "prop-types";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const SignUpForm = (props) => {
  SignUpForm.propTypes = {
    isLogin: PropTypes.bool.isRequired,
  };
  const { isLogin } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const { signup } = useAuthStore();
  return (
    <div className={"flex flex-col gap-4"}>
      <form
        className={"flex flex-col gap-4"}
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await signup({
            name,
            email,
            password,
            gender,
            age,
            genderPreference,
          });
          res &&
            res.success === true &&
            toast.success(` user ${res?.user?.name}! registered successfully`);
        }}
      >
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="grow"
            placeholder="Name"
          />
        </label>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="grow"
            placeholder="Email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="grow"
            placeholder="password"
          />
        </label>
        {/* AGE */}
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age:
          </label>
          <div className="mt-1">
            <input
              id="age"
              name="age"
              type="number"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="18"
              max="120"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          {/* GENDER */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Gender:
            </label>
            <div className="mt-2 flex gap-2">
              <div className="flex items-center">
                <input
                  id="male"
                  name="gender"
                  type="checkbox"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="male"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  name="gender"
                  type="checkbox"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="female"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Female
                </label>
              </div>
            </div>
          </div>
          {/* GENDER PREFERENCE */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prefer :
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="prefer-male"
                  name="gender-preference"
                  type="radio"
                  value="male"
                  checked={genderPreference === "male"}
                  onChange={(e) => setGenderPreference(e.target.value)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                />
                <label
                  htmlFor="prefer-male"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="prefer-female"
                  name="gender-preference"
                  type="radio"
                  value="female"
                  checked={genderPreference === "female"}
                  onChange={(e) => setGenderPreference(e.target.value)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                />
                <label
                  htmlFor="prefer-female"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="prefer-both"
                  name="gender-preference"
                  type="radio"
                  value="both"
                  checked={genderPreference === "both"}
                  onChange={(e) => setGenderPreference(e.target.value)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                />
                <label
                  htmlFor="prefer-both"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Both
                </label>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className={"text-sm text-green-600"}>
              {isLogin ? (
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    props.setIsLogin(false);
                  }}
                >
                  New to Dat09?{" "}
                </span>
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
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
              className={`mt-2 text-red-600  font-medium transition-colors duration-300
                           
                            `}
            >
              {" "}
              {!isLogin ? "Create new Account" : "Sign in to your Account"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

SignUpForm.propTypes = {};

export default SignUpForm;
