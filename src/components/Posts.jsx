import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default class Posts extends Component {
  state = { posts: [], count: 0 };
  
  // incrementMe = () => {
  //   let newCount = this.state.count + 1;
  //   this.setState({
  //     count: newCount,
  //   });


  incrementMe = async(id) => {
    let like = this.state.count + 1;
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body:  JSON.stringify({"post": {"like": like}})
    });
    console.log(this.state.count)
    this.setState((state)=> {
      return {
        count: state.count + 1
      }
    })
  }


  getPosts = async () => {
    const response = await fetch("http://localhost:3000/posts", {});

    const data = await response.json();
    console.log(data);
    this.setState({ posts: data.posts });
  };

  renderPosts = () => {
    return this.state.posts.map((post, index) => {
      return (
        <div key={index}>
          <div className="container is-centered">
            <div className="columns is-mobile is-centered">
              <div className="column is-10">
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-128x128">
                      {post.image && <img src={post.image} alt={post.title} />}
                    </figure>
                  </div>
                  <div className="column is-10">
                    <div className="media-content">
                      <div className="content column is-10">
                        <p>
                          {" "}
                          <strong className="brighten">
                            {post.title}
                          </strong>{" "}
                          <small className="robo">
                            {moment(post.created_at)
                              .startOf("minute")
                              .fromNow()}
                          </small>{" "}
                          <br />
                          <small className="cato">Category: {post.tag}</small>
                          <br />
                          {post.description}
                        </p>
                      </div>
                    </div>
                    <div className="column is-10">
                      <nav className="level is-mobile">
                        <div className="level-left">
                          <Link to className="level-item">
                            <button className="button is-small is-light is-link is-outlined" onClick={() => this.incrementMe(post.id)}> 💙  Likes: {this.state.count}
                            </button>
                          </Link>
                          <div className="column is-10">
                            <Link
                              to={{
                                pathname: `/posts/${post.id}`,
                                state: post,
                              }}
                            >
                              <button className="button is-small is-link is-light is-outlined">
                                View
                              </button>
                            </Link>
                          </div>
                        </div>
                      </nav>
                    </div>

                    <div className="column is-10">
                      <div className="field">
                        <div className="control">
                          <textarea
                            className="textarea has-fixed-size"
                            placeholder="Add a comment..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="column is-10">
                      <nav className="level">
                        <div className="level-left">
                          <div className="level-item">
                            <Link to className="button is-info is-small">
                              Submit
                            </Link>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </div>
                </article>
                <hr />
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  componentDidMount() {
    this.getPosts();
  }

  render() {
    return <div>{this.renderPosts()}</div>;
  }
}
