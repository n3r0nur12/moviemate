import { Badge } from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import MovieDialog from "./MovieDialog";
import MovieModal from "./MovieModal";
import { img_300, unavailable } from '../Config/Config';
import "./MovieStyle.css";


export default function Movie(props) {
    const {id, title, date, vote_average, overview, poster} = props;
    const [badgeIcon,setBadgeIcon] = React.useState("");

    const [starvalue,setStarvalue] = React.useState(0);

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("0");

    const makeReview = (value) => {
      fetch("/reviews",{
          method:'POST',
          headers: {
              "Content-Type": "application/json",
              "Authorization" : localStorage.getItem("tokenKey"),
          },
          body: JSON.stringify({
            movieId:id,
            userId:localStorage.getItem("userId"),
            reviewcode:value,
            numberOfStars:starvalue,
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

    const makeRating = (value) => {
      fetch("/reviews",{
          method:'POST',
          headers: {
              "Content-Type": "application/json",
              "Authorization" : localStorage.getItem("tokenKey"),
          },
          body: JSON.stringify({
            movieId:id,
            userId:localStorage.getItem("userId"),
            reviewcode:selectedValue,
            numberOfStars:value,
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


    const getReview = () => {
      fetch(`reviews?loggedUserId=${localStorage.getItem("userId")}&movieId=${id}`,{
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization" : localStorage.getItem("tokenKey"),
          }
      })
      .then(res => res.json())
      .then(
          (result) => {
            if(result){
              console.log("We have reviewcode as:"+selectedValue);
              setEmoji(result.reviewcode);
              setStarvalue(result.numberOfStars);
            }
            else{
              setStarvalue(0);
              setSelectedValue("0");
              setBadgeIcon("");
            }
          },
          (error) => {
            setStarvalue(0);
            setSelectedValue("0");
            setBadgeIcon("");
          }
      )
    }

    React.useEffect(()=>{
      getReview();
    },[id])

    const handleClickOpen = () => {
      setOpen(true);
    };
  /*
Dope👌
Sick🤟
So lovely😍
I am in tears😭
Hot🔥
I want to watch it again👌
Uplifting movie💯
So touching movie😢
Not that bad🙃
I do not remember😑
Boring as hell👎
Old as a living dinosaur🦖
Creepy as hell😶
Scary as hell🔪
Quite long movie😐
Regret watching😒
Waste of time😠
Garbage🗑
Sucks😡
  */
    const setEmoji = (value) => {
      setSelectedValue(value);
      if(value==="1"){
        setBadgeIcon("Dope👌");
      }
      else if(value==="2"){
        setBadgeIcon("Sick🤟");
      }
      else if(value==="3"){
        setBadgeIcon("So lovely😍");
      }
      else if(value==="4"){
        setBadgeIcon("I am in tears😭");
      }
      else if(value==="5"){
        setBadgeIcon("Hot🔥");
      }
      else if(value==="6"){
        setBadgeIcon("I want to watch it again👌");
      }
      else if(value==="7"){
        setBadgeIcon("Uplifting movie💯");
      }
      else if(value==="8"){
        setBadgeIcon("So touching movie😢");
      }
      else if(value==="9"){
        setBadgeIcon("Not that bad🙃");
      }
      else if(value==="10"){
        setBadgeIcon("I do not remember😑");
      }
      else if(value==="11"){
        setBadgeIcon("Boring as hell👎");
      }
      else if(value==="12"){
        setBadgeIcon("Old as a living dinosaur🦖");
      }
      else if(value==="13"){
        setBadgeIcon("Creepy as hell😶");
      }
      else if(value==="14"){
        setBadgeIcon("Scary as hell🔪");
      }
      else if(value==="15"){
        setBadgeIcon("Quite long movie😐");
      }
      else if(value==="16"){
        setBadgeIcon("Regret watching😒");
      }
      else if(value==="17"){
        setBadgeIcon("Waste of time😠");
      }
      else if(value==="18"){
        setBadgeIcon("Garbage🗑");
      }
      else if(value==="19"){
        setBadgeIcon("Sucks😡");
      }
      else{
        setBadgeIcon("");
      }
    }

    const handleClose = (value) => {
      setOpen(false);
      setEmoji(value);
      makeReview(value);
    };

    const handleStar = (value) => {
      setStarvalue(value);
      makeRating(value);
    };

    return (
        <div className="Media">
            {(badgeIcon.length>0)?
              <Badge badgeContent={badgeIcon} color={vote_average>6 ? "primary" : "secondary"}/>
              :
              ""
            }
            <img className="Poster" src={ poster? `${img_300}/${poster}` : unavailable} alt={title}/>
            <b className="MovieTitle">{title}</b>
            <div style={{
              marginTop:'auto',
              justifyContent:'center'
            }}>
              <span className="MovieCenterSubtitle">
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                    'textAlign':'center'
                  }}
                >
                  <Rating
                    name="simple-controlled"
                    value={starvalue}
                    onChange={(event, newStarvalue) => {
                      handleStar(newStarvalue);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.10, color:"white" }} fontSize="inherit" />}
                    size="large"
                  />
                </Box>
              </span>
              <span className="MovieSubtitle">
                <Button variant="contained"
                        onClick={handleClickOpen}
                        style={{
                          background:'rgb(39,42,47)',
                          background:'radial-gradient(circle, rgba(39,42,47,1) 0%, rgba(64,63,80,1) 51%, rgba(39,42,47,1) 100%)',
                          width:'100%'
                        }}>
                  React Movie
                </Button>
                <MovieDialog
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                  id={id}
                />
              </span>
              <span className="MovieSubtitle">
                <MovieModal media_type={"movie"} id={id}/>
              </span>
            </div>
        </div>
    );
}