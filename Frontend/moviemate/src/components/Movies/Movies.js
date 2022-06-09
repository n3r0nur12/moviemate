import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import SearchMovies from "./SearchMovies";
import "./MoviesStyle.css";
import PageChange from "../PageChange/PageChange";
import { CircularProgress } from "@mui/material";


export default function Movies() {
    const [page, setPage] = useState(1);
    const [movieList, setMovieList] = useState([]);
    const [numofpages, setNumofpages] = useState();
    const [searchkey, setSearchkey] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    

    const refresehMovieList = () => {
        const searchurl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchkey}&page=${page}&include_adult=false`
        const discoverurl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
        let fetchurl = discoverurl;
        if(searchkey.length > 0){
            fetchurl = searchurl;
        }
        fetch(fetchurl, {
            method:'GET'
        })
        .then(res=>res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setMovieList(result.results);
                setNumofpages(result.total_pages);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }

    useEffect(()=>{
        refresehMovieList();
    },[searchkey, page])


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
    return (
        <div>
            
            <SearchMovies setSearchkey={setSearchkey}/>
            
            <div className="OneMovie">
                {
                    movieList && movieList.map((c)=> <Movie id={c.id}
                                                            title={c.title || c.name}
                                                            date={c.first_air_date || c.release_date}
                                                            vote_average={c.vote_average}
                                                            overview={c.overview}
                                                            poster={c.poster_path}
                    />)
                }
            </div>
            <PageChange setPage={setPage} numofpages={numofpages>500 ? 500 : numofpages}/>
        </div>
    );
}

