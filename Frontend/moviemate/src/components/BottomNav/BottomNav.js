import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Person, Videocam } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(()=>{
    if(value===0) navigate("/");
    else if(value===1) navigate("/movies");
    else if(value===2) navigate("/profile");
  },[value, navigate]);

  return (
    <BottomNavigation showLabels sx={{width:"100%",
                           position:"fixed",
                           bottom:0,
                           backgroundColor:"#2d313a",
                           zIndex:100}} value={value} onChange={handleChange}>
      

        <BottomNavigationAction
            style={{ color: "white" }}
            label="People"
            icon={<FavoriteIcon />}
        />
      
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        icon={<Videocam />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Profile"
        icon={<Person />}
      />
    </BottomNavigation>
  );
}
