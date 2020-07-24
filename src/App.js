import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import Posts from "./components/Posts";
import NoMatch from "./components/NoMatch";
import NavBar from "./components/shared/NavBar";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import CategoryPage from "./components/CategoryPage";
import ViewPost from "./components/ViewPost";
import Comment from "./components/Comment";
import CommentBox from "./components/CommentBox";
import CommentForm from "./components/CommentForm";
import styles from "./src/styles/main.scss";

class App extends React.Component {
  state = { posts: [] };

  render() {
    return (
      <>
        <Route component={NavBar} />
        <Switch>
          <ProtectedRoute exact path="/posts/:id/edit" component={EditPost} />
          <ProtectedRoute exact path="/posts/create" component={NewPost} />
          <Route exact path="/posts" component={Posts} />
          <ProtectedRoute exact path="/profile" component={UserProfile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/posts/categorypage" component={CategoryPage} />
          <Route exact path="/posts/:id" component={ViewPost} />
          <Route exact path="/comments" component={Comment} />
          <Route exact path="/comments" component={CommentForm} />
          <Route exact path="/comments" component={CommentBox} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

export default App;
