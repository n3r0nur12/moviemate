import { Logout } from "@mui/icons-material";
import { getImageListItemBarUtilityClass, IconButton } from "@mui/material";
import { React, useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { DriveFileRenameOutline, Facebook, Instagram, Photo, Twitter } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import axios from "axios";

const darkTheme = createTheme({
    palette:{
        mode:'dark'
    }
});

export default function User({logout}){
    const [user, setUser] = useState(null);
    const [id, setId] = useState(localStorage.getItem("userId"));
    const [bio, setBio] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [age, setAge] = useState(0);
    const [username,setUsername] = useState("");

    const [filebyte,setFilebyte] = useState("");


    const navigate = useNavigate();


    const updateUser = () => {
      fetch("/users",{
          method:'PUT',
          headers: {
              "Content-Type": "application/json",
              "Authorization" : localStorage.getItem("tokenKey"),
          },
          body: JSON.stringify({
            userId:id,
            userbio:bio,
            userage:age,
            usertwitter:twitter,
            userfacebook:facebook,
            userinstagram:instagram,
          }),
      })
      .then(res => res.json())
      .then(
          (result) => {
          },
          (error) => {
              console.log(error)
          }
      )
    }

    
    const getUser = () => {
        fetch("/users/"+localStorage.getItem("userId"),{
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("tokenKey"),
            },
        })
        .then(res => res.json())
        .then(
            (result) => {
                setUser(result);
                setBio(result.userbio);
                setAge(result.userage);
                setFacebook(result.userfacebook);
                setInstagram(result.userinstagram);
                setTwitter(result.usertwitter);
                setUsername(result.username);
            },
            (error) => {
                console.log(error)
            }
        )

        
    }

    const onClick = () => {
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        logout();
        navigate("auth");
    }

    const handleUpdate = () => {
        updateUser();
    }

    useEffect(()=>{
        getUser();
    },[])

    useEffect(()=>{
        getimage();
    },[username])

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
    

    const handleUpload = (e) => {
         let currfile = e.target.files[0];
         let formdata = new FormData();
         formdata.append('file',currfile);
         formdata.append('name',"MovieMateProfilePictures");

         fetch(`/images/${user.username}`,{
            method:'PUT',
            headers: {
                "Authorization" : localStorage.getItem("tokenKey"),
            },
            body: formdata
        })
        .then(res => res.json())
        .then(
            (result) => {
                getimage();
            },
            (error) => {
                console.log(error)
            }
        )
    }    


    return (
        <ThemeProvider theme={darkTheme}>
            <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                width:"93%"
            }}>
                <div>
                    {user?
                        <Card sx={{ display: 'flex', width:"100%", height:"80%", p:3, borderRadius:3, backgroundColor: "#282c34" }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width:'65%' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h4" fontFamily={'Karla'}>
                                    {user.username}
                                </Typography>
                                <br/>
                                <TextField
                                id="outlined-multiline-static"
                                label="User Bio"
                                multiline
                                rows={5}
                                value={bio}
                                fullWidth
                                sx={{m:1}}
                                onChange={(e)=>setBio(e.target.value)}
                                />
                                </CardContent>
                                <Box sx={{ display: 'flex', flexDirection:'row', pl: 1, pb: 1 }}>
                                    <IconButton>
                                        <Facebook/>
                                    </IconButton>
                                        <TextField
                                            value={facebook}
                                            sx={{m:1}}
                                            id="outlined-name"
                                            label="Facebook"
                                            onChange={(e)=>setFacebook(e.target.value)}
                                        />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection:'row', pl: 1, pb: 1 }}>
                                <IconButton>
                                    <Instagram/>
                                </IconButton>
                                    <TextField
                                        sx={{m:1}}
                                        id="outlined-name"
                                        label="Instagram"
                                        value={instagram}
                                        onChange={(e)=>setInstagram(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection:'row', pl: 1, pb: 1 }}>

                                <IconButton>
                                    <Twitter/>
                                </IconButton>
                                    <TextField
                                        id="outlined-name"
                                        label="Twitter"
                                        sx={{m:1}}
                                        value={twitter}
                                        onChange={(e)=>setTwitter(e.target.value)}
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection:'column', pl: 1, pb: 1 }}>
                                    <Button 
                                        onClick={handleUpdate}
                                        variant="contained" 
                                        sx={{m:1}} 
                                        endIcon={<DriveFileRenameOutline />}>
                                        UPDATE PROFILE
                                    </Button>
                                    <Button component="label" variant="contained" sx={{m:1}} endIcon={<Photo />}>
                                        CHOOSE NEW PROFILE IMAGE
                                        <input type="file" name="file" hidden onChange={(e)=>handleUpload(e)}/>
                                    </Button>
                                    <Button variant="contained" sx={{m:1}} onClick={onClick} endIcon={<Logout />}>
                                        LOGOUT
                                    </Button>
                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: '35%', height:'35%', borderRadius:4, p:1, m:1 }}
                                src={`data:image/jpeg;base64,${filebyte}`}
                            />
                    </Card>
                    : 
                    <Button variant="contained" sx={{m:1}} onClick={onClick} endIcon={<Logout />}>
                        LOGOUT
                    </Button>}
                </div>
            </div>
        </ThemeProvider>
    );
}
