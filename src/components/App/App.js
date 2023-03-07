import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => this.setState({ isLoading: false, urls: [...data.urls] }))
    .catch(() => console.log('error'))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm />
        </header>

        {this.state.isLoading ? <h2>Loading...</h2>
        : <UrlContainer urls={this.state.urls}/> }
      </main>
    );
  }
}

export default App;
