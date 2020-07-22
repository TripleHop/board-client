import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { PostsContext } from '../context/posts-context'

export default class Posts extends Component {
  static contextType = PostsContext;
  state = { posts: [] };

  getPosts = async () => {
    // const isLoggedIn = this.state.isLoggedIn;
    const response = await fetch("http://localhost:3000/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    this.setState({ posts: data.posts, currentUser: data.current_user });
  };

  deletePost = async (id) => {
    this.context.dispatch("delete", id);
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  renderPosts = () => {
    return this.state.posts.map((post, index) => {
      return (
        <div key={index}>
        <div className="card">
          <header className="card-header">
          <p className="card-header-title">{post.title}</p>
          </header>
          <div className="card-content">
            <div className="content">
          <p>Category: {post.tag}</p>

          <p>{post.description}</p>
          <p>{moment(post.created_at).startOf("minute").fromNow()}</p>
          {post.image && <img src={post.image} alt={post.title} />}
            </div>
            </div>
          <div className="edit-delete-container">
            <footer className="card-footer">
            {this.state.currentUser === post.user_id && (
              <React.Fragment>
                <Link to={`/posts/${post.id}/edit`}><button className="card-foot-item button is-dark">Edit</button></Link>
                <button className="card-footer-item button is-dark"  onClick={() => this.deletePost(post.id)}>Delete</button>
              </React.Fragment>
            )}
            <Link
              to={{
                pathname: `/posts/${post.id}`,
                state: post,
              }}
            >
              <button className="card-footer-item button is-dark" >Show</button>
            </Link>
            </footer>
          </div>
          <hr />
          
          </div>
        </div>
        
      );
    });
  };

  componentDidMount() {
    this.getPosts();
  }

  render() {
    console.log(this.context)
    this.context.dispatch()
    return <div>{this.renderPosts()}</div>;
  }
}
