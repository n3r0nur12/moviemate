import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {
    img_500,
    unavailable,
    unavailableLandscape,
  } from "../Config/Config";
import { YouTube } from '@mui/icons-material';
import axios from "axios";
import "./MovieModal.css";


export default function MovieModal({ media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <Button variant="contained"
                onClick={handleOpen}
                style={{
                                background:'rgb(39,42,47)',
                                background:'radial-gradient(circle, rgba(39,42,47,1) 0%, rgba(64,63,80,1) 51%, rgba(39,42,47,1) 100%)',
                                width:'100%'
                            }}>
                    Details
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div style={{
                width: "90%",
                height: "80%",
                backgroundColor: "#39445a",
                border: "1px solid #282c34",
                borderRadius: 10,
                color: "white"
              }}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <Button
                    variant="contained"
                    startIcon={<YouTube />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
