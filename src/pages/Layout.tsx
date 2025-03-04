import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../components/header"


const Layout = () => {
  const location = useLocation();
  const showHeader = location.pathname !== "/";
  return (
    <div>
       {showHeader && <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
