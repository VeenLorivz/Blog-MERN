import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Detail from "./components/Detail/detail";
import Write from "./pages/Write/write";
import { Context } from "./context/Context";
import Account from "./pages/Account/Account";
import About from "./pages/About/About";
import Page404 from "./pages/Page 404/Page404";

const App = () => {
  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/write">{user ? <Write /> : <Login error={true} />}</Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/account">{user ? <Account /> : <Login />}</Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
