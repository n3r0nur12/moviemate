import './App.css';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Home from './components/Home/Home';
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';
import User from './components/User/User';
import Movies from './components/Movies/Movies';
import { Container } from '@mui/material';
import Auth from './components/Auth/Auth';
import { useEffect, useState } from 'react';


function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem("user");
    user && JSON.parse(user) ? setAuth(true) : setAuth(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", auth);
  }, [auth]);

  return (
    
      <BrowserRouter>
        
        <Header/>

        <div className="app">
          <Container>
            <Routes>
            
            {!auth && (
              <Route
                path="/auth"
                element={<Auth authenticate={() => setAuth(true)} />}
              />
            )}

            {auth && (
              <>
                <Route
                  path="/profile"
                  element={<User logout={() => setAuth(false)} />}
                />
                <Route path="/movies" element={<Movies />}/>
                <Route path="/" element={<Home />}/>
              </>
            )}
            <Route path="*" element={<Navigate to={auth ? "/profile" : "/auth"} />} />
            </Routes>
          </Container>
        </div>

        <BottomNav/>

      </BrowserRouter>
    
  );
}

export default App;

/*
<Route exact path='/' element={
                ((localStorage.getItem("currentUser")) ? (<Home/>) : (<Navigate to="/auth"/>))
              }></Route>

              <Route exact path='/movies/' element={<Movies/>}></Route>

              <Route exact path="/user/:userId" element={
                ((localStorage.getItem("currentUser")) ? (<User/>) : (<Navigate to="/auth"/>))
              }></Route>

              <Route exact path="/auth" element={
                ((localStorage.getItem("currentUser")) ? (<Navigate to="/"/>) : (<Auth/>))
              }></Route>
*/