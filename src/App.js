import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import pixabayApi from './services/pixabayApi';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader/Loader';

class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    page: 1,
    pageSize: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query: query, page: 1, images: [] });
  };

  fetchImages = () => {
    const { page, query, pageSize } = this.state;
    const options = { page, query, pageSize };

    this.setState({ isLoading: true });

    pixabayApi(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        {images.length > 0 && <Button onClickHandler={this.fetchImages} />}
        {isLoading && <Loader />}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
