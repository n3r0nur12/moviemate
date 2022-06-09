import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const darkTheme = createTheme({
    palette:{
        mode:'dark'
    }
});


export default function UserRecommend(props) {
  const navigate = useNavigate();

  const {username,
        userfacebook,
        userinstagram,
        usertwitter,
        usertiktok,
        userbio} = props;

  const [filebyte, setFilebyte] = React.useState("");

  const getimage = () => {
    axios.get(`/images/${username}`, {
      responseType: "arraybuffer"
    })
    .then((res) => {
    const base64 = btoa(
      new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    )
    setFilebyte(base64)
    })
  }

  React.useEffect(()=>{
    getimage();
  },[])








  return (
    <ThemeProvider theme={darkTheme}>
      <Card sx={{
        flexDirection: "column",
        width: "400px",
        padding: "5px",
        margin: "5px 0",
        backgroundColor: "#282c34",
        borderRadius: 10,
        position: "relative",
    
        display:"flex",
        flexDirection:"column"
      }}>
        <CardMedia
          component="img"
          src={`data:image/jpeg;base64,${filebyte}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userbio}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={() => {
            window.open(userfacebook, "_blank");
          }}>
            <Facebook/>
          </IconButton>
          <IconButton onClick={() => {
            window.open(userinstagram, "_blank");
          }}>
            <Instagram/>
          </IconButton>
          <IconButton onClick={() => {
            window.open(usertwitter, "_blank");
          }}>
            <Twitter/>
          </IconButton>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
