import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      isLoading: 'true',
    }
  }

  postUrl = (data) => {
    postUrls(data)
    .then(data => this.setState({ urls: [...this.state.urls, data] }))
    .catch(() => this.setState({ isLoading: 'error' }))
  }

  componentDidMount() {
    getUrls()
    .then(data => {
      this.setState({ isLoading: false, urls: [...data.urls] })
    })
    .catch(() => this.setState({ isLoading: 'error' }))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm postUrl={this.postUrl} />
        </header>
        {
          this.state.isLoading === 'error' ? <h2>Huh, something went wrong!</h2>
          : this.state.isLoading === 'true' ? <h2>Loading...</h2>
          : <UrlContainer urls={this.state.urls}/> 
        }
      </main>
    );
  }
}

export default App;
