import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import Spinner from "react-spinkit";
import "./App.css";

class App extends Component {
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

    const pusher = new Pusher("e253954e0c16faedd517", {
      cluster: "ap2",
      encrypted: true
    });

    const channel = pusher.subscribe("gallery");
    channel.bind("upload", data => {
      this.setState({
        images: [data.image, ...this.state.images]
      });
    });
  }

  fileChangedHandler = event => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };

  uploadImage = event => {
    event.preventDefault();

    if (!this.state.selectedFile) return;

    this.setState({
      loading: true
    });

    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    axios.post("http://localhost:5000/upload", formData).then(({ data }) => {
      this.setState({
        loading: false
      });
    });
  };

  render() {
    const image = (url, index) => (
      <img alt="" className="photo" key={`image-${index} }`} src={url} />
    );
    const images = this.state.images.map((e, i) => image(e.secure_url, i));
    return (
      <div className="App">
        <h1 className="App-title">Live Photo Feed</h1>

        <form method="post" onSubmit={this.uploadImage}>
          <label className="label" htmlFor="gallery-image">
            Choose an image to upload
          </label>
          <input
            type="file"
            onChange={this.fileChangedHandler}
            id="gallery-image"
            accept=".jpg, .jpeg, .png"
          />
          <button type="submit">Upload!</button>
        </form>

        <div className="loading-indicator">
          {this.state.loading ? <Spinner name="spinner" /> : ""}
        </div>

        <div className="gallery">{images}</div>
      </div>
    );
  }
}

export default App;
