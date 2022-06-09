import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette:{
        mode:'dark'
    }
});

export default function Auth({authenticate}){
    const navigate = useNavigate();

    console.log("HELLO:"+localStorage.getItem("userId"));

    const [username1, setUsername1] = useState("");
    const [userpassword1, setUserpassword1] = useState("");

    const sendRequest = async (path) =>  {

        console.log("username:"+username1);
        console.log("userpassword:"+userpassword1);

        
        fetch("/auth/"+path,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                username:username1,
                userpassword:userpassword1,
            }),
        })
        .then((res) => res.json())
        .then((result) => {
            if(path==="login"){
                localStorage.setItem("tokenKey",result.message);
                console.log("Returned message:"+localStorage.getItem("tokenKey"));

                localStorage.setItem("userId",result.userId);
                console.log("Returned id:"+localStorage.getItem("userId"));

                localStorage.setItem("username",username1);
                console.log("Returned name:"+localStorage.getItem("username"));
                
                authenticate();
                navigate("profile");
            }
        })
        .catch((err) => console.log(err))
    }

    const handleButton = (path) => {
        sendRequest(path);
        setUsername1("");
        setUserpassword1("");
    }

    const handleUsername = (value) => {
        setUsername1(value)
    } 

    const handlePassword = (value) => {
        setUserpassword1(value)
    } 


    return(
        <ThemeProvider theme={darkTheme}>
            <div style={{
                width:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
            }}>
                <FormControl>
                    <InputLabel>Username</InputLabel>
                    <Input
                        value={username1}
                        onChange = {(i) => handleUsername(i.target.value)}/>
                    <InputLabel  style={{top: 80}}>Password</InputLabel>
                    <Input
                        style={{top: 40}}
                        value={userpassword1}
                        onChange = {(i) => handlePassword(i.target.value)}/>
                    <Button variant = "contained"
                        style = {{marginTop : 60,
                        background :'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color : 'white'}}
                        onClick= {() => handleButton("register")}>Register</Button>
                    <FormHelperText style={{margin:20}}>Are you already registered?</FormHelperText>
                    <Button variant = "contained"
                        style = {{
                        background :'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color : 'white'}}
                        onClick={() => handleButton("login")}>Login</Button>
                </FormControl>
            </div>
        </ThemeProvider>
    );
}