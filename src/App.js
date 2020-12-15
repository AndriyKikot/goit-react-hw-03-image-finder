import { Component } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';

const apiKey = '18773042-c85a376c8239f0d185771db9c';
const baseUrl = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    query: '',
    images: [],
    loading: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  fetchImages = () => {
    const { page, query } = this.state;

    axios
      .get(
        `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.data.hits],
          page: prevState.page + 1,
        }));
      });
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        <Button onClickHandler={this.fetchImages} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
