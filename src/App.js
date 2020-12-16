import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import pixabayApi from './services/pixabayApi';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal';

class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    page: 1,
    pageSize: 12,
    error: null,
    showModal: false,
    largeImageURL: '',
    imgTags: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query: query, page: 1, images: [], error: null });
  };

  fetchImages = () => {
    const { page, query, pageSize } = this.state;
    const options = { page, query, pageSize };

    this.setState({ isLoading: true });

    pixabayApi(options)
      .then(images => {
        if (images.length < 1) {
          this.setState({ error: true });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            page: prevState.page + 1,
          }));
        }
        if (page !== 1) {
          this.scrollToButtom();
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  scrollToButtom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setImgData = ({ largeImageURL, tags }) => {
    this.setState({ largeImageURL, tags });
  };

  render() {
    const {
      images,
      isLoading,
      error,
      showModal,
      largeImageURL,
      imgTags,
    } = this.state;
    const shouldRenderLoadMoreBtn = images.length > 0 && !isLoading;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && <p className="text-error">404</p>}
        <ImageGallery
          images={images}
          onOpenModal={this.toggleModal}
          onSetImgData={this.setImgData}
        />
        {shouldRenderLoadMoreBtn && (
          <Button onClickHandler={this.fetchImages} />
        )}
        {isLoading && <Loader />}
        {showModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img src={largeImageURL} alt={imgTags} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
