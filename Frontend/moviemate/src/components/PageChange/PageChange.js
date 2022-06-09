import React from "react";
import { Pagination } from '@mui/material';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette:{
        primary:{
            main:'#fff',
        },
        mode:'dark'
    }
});

export default function PageChange(props){
    const {setPage, numofpages} = props;
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    };
    return (
        <div style={{
            width:"100%",
            display:"flex",
            color:"white",
            justifyContent:"center",
            marginTop:10,
        }}>
            <ThemeProvider theme={darkTheme}>
                <Pagination count={numofpages} color="primary" variant="outlined" onChange={(e)=>handlePageChange(e.target.textContent)}/>
            </ThemeProvider>
        </div>
    )
}