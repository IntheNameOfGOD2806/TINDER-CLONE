import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
function Header(props) {
  const dropDownRef = React.useRef();
  const { authUser } = useAuthStore();
  const { logout } = useAuthStore();
  const handelLogout = async () => {
    const res = await logout();
    if (res?.success) {
      toast.success("Logout successful");
    }
  };
  return (
    <header className="bg-gradient-to-r from-red-200 via-red-200 to-red-400">
      <div className="navbar  bg-gradient-to-r from-red-200 via-red-200 to-red-400">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          {authUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={`${authUser?.image}`}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      handelLogout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
