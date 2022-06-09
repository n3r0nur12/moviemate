import React, { useEffect, useState } from "react";
import UserRecommend from '../UserRecommend/UserRecommend';
import Stack from '@mui/material/Stack';
import { CircularProgress } from "@mui/material";



function Home(){
    console.log("HOME:The current user is:["+localStorage.getItem("userId")+"]");

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [recommededUsers, setRecommendedUsers] = useState([]);

    const refreshRecommendedUsers = () => {
        fetch("/users?loggedUserId="+localStorage.getItem("userId"),{
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("tokenKey"),
            },
        })
        .then(res=>res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setRecommendedUsers(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }
    

    useEffect(()=>{
        refreshRecommendedUsers();
    },[])

    if(error){
        return <div style={{
            display:"flex",
            color:"white",
            justifyContent:"center",
            marginTop:10,
        }}><CircularProgress /></div>
    }
    else if(!isLoaded){
        return <div style={{
            display:"flex",
            color:"white",
            justifyContent:"center",
            marginTop:10,
        }}><CircularProgress /></div>
    }
    else{
        return (
                        <Stack alignItems="center" direction="column" spacing={2}>
                            {recommededUsers.map(user=>(
                                <UserRecommend username={user.username}
                                               userfacebook={user.userfacebook}
                                               userinstagram={user.userinstagram}
                                               usertwitter={user.usertwitter}
                                               usertiktok={user.usertiktok}
                                               userbio={user.userbio}
                                               >
                                </UserRecommend>
                            ))}
                        </Stack>
        );
    }
}
export default Home;