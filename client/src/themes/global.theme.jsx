import { ConfigProvider } from "antd";
import PropTypes from "prop-types";
const ThemeConfigGlobal = ({ children }) => {
  ThemeConfigGlobal.propTypes = {
    children: PropTypes.node,
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
        },
        components: {
          Select: {
            optionActiveBg: "#EE466D",
            optionSelectedBg: "#EE466D",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeConfigGlobal;
