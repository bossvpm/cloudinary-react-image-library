import React, { Component } from "react";
import Gallery from "./Gallery";
import Upload from "./Upload";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      selectedFile: null,
      loading: false
    };
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Gallery</Link>
              </li>
              <li>
                <Link to="/upload/">Upload</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Gallery} />
          <Route path="/upload/" component={Upload} />
        </div>
      </Router>
    );
  }
}

export default App;
