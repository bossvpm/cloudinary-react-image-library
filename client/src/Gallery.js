import React, { Component } from "react";
import axios from "axios";
import Spinner from "react-spinkit";
import "./App.css";

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      selectedFile: null,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    axios.get("http://localhost:5000").then(({ data }) => {
      this.setState({
        images: [...data, ...this.state.images],
        loading: false
      });
    });
  }

  render() {
    const image = (url, index) => (
      <img alt="" className="photo" key={`image-${index} }`} src={url} />
    );
    const images = this.state.images.map((e, i) => image(e.secure_url, i));
    return (
      <div className="App">
        <h1 className="App-title">Live Photo Feed</h1>
        <div className="loading-indicator">
          {this.state.loading ? <Spinner name="spinner" /> : ""}
        </div>
        <div className="gallery">{images}</div>
      </div>
    );
  }
}

export default Gallery;
