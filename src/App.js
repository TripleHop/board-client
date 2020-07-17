import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import EditPost from '/components/EditPost';
import HomePage from './components/HomePage';
import Login from './components/Login';
import NewPost from './components/NewPost';
import Posts from './components/Posts';
import NavBar from './components/shared/NavBar';
import ViewPost from './components/ViewPost';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import CategoryPage from './components/CategoryPage';
import NoMatch from './components/NoMatch';
import SignUp from './components/Signup';
import UserProfile from './components/UserProfile';
import ViewPost from './components/ViewPost';
import ProtectedRoute from './ProtectedRoute';
import Secrets from './Secrets';


function App() {
  return (
    <>
    <NavBar />
    <Switch>
      <ProtectedRoute exact path="/secrets" component={Secrets} />
      <Route exact path={"/"} component ={HomePage} />
      <Route exact path={"/login"} component ={Login}/>
      <Route exact path={"/newpost"} component ={NewPost} />
      <Route exact path={"/posts/:id"} component ={Posts} />
      <Route exact path="/posts/:id/edit" component={EditPost} />
      <Route exact path="/posts/create" component={NewPost} />
      <Route exact path="/posts/:id" component ={Posts} />
      <Route exact path="/posts/:id/userprofile" component ={UserProfile} />
      <Route exact path="/posts/categorypage" component = {CategoryPage}/>
      <Route exact path="/login" component ={Login}/>
      <Route exact path="/signup" component ={SignUp}/>
      <Route exact path="/" component ={HomePage} />
      <Route exact path="/posts/viewpost" component ={ViewPost} />
      <Route component={NoMatch} />
      </Switch>
    </>
    );
  }
  
  export default App;

