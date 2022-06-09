import { Avatar } from "@mui/material";
import "./Header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      <Avatar src="./images/gg.png" sx={{width:"7vw", height:"7vw"}}/>
      MOVIEMATE
    </span>
  );
};

export default Header;