import { Component } from 'react';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <img src={largeImageURL} alt={tags} />
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
