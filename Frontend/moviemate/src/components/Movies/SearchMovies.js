import React from "react";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const darkTheme = createTheme({
    palette:{
        primary:{
            main:'#fff',
        },
        mode:'dark'
    }
});

export default function SearchMovies(props){
    const {setSearchkey} = props;
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display:"flex", margin:"15px 0"}}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField 
                            id="input-with-sx"
                            label="Search"
                            variant="standard"
                            onChange={(e)=>setSearchkey(e.target.value)}
                        />
                        <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    </Box>
                </div>
            </ThemeProvider>
        </div>
    );
}