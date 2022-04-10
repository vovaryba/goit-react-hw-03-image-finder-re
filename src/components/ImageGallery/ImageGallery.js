import React, { Component } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { animateScroll as scroll } from 'react-scroll';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Modal from 'components/Modal';
import imagesAPI from '../../services/images-api';
import s from './ImageGallery.module.css';

const URL = 'https://pixabay.com/api';
const API_KEY = '22634984-1ce924b253c51d48f10b47cfd';

class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    showModal: false,
    modalImg: null,
    modalAlt: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.props;
    const prevReq = prevProps.request;
    const currentReq = this.props.request;
    if (prevReq !== currentReq) {
      this.setState({ status: 'pending' });

      imagesAPI
        .fetchImages(currentReq, page, URL, API_KEY)
        .then(images =>
          this.setState(prevState => ({
            images: images.hits,
            status: 'resolved',
            page: prevState.page + 1,
          })),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  toggleModal = (imageUrl, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImg: imageUrl,
      modalAlt: tags,
    }));
    console.log(imageUrl, tags);
  };

  buttonClick = () => {
    const { page } = this.state;
    const currentReq = this.props.request;

    imagesAPI
      .fetchImages(currentReq, page, URL, API_KEY)
      .then(
        images =>
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
            page: prevState.page + 1,
          })),
        this.scrollToBottom(),
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  render() {
    const { images, error, status, showModal, modalImg, modalAlt } = this.state;
    const { request } = this.props;

    if (status === 'idle') {
      return <p>Please enter the request</p>;
    }

    if (status === 'pending') {
      return (
        <div className={s.loader}>
          <MutatingDots
            height="100"
            width="100"
            color="#3F51B5"
            ariaLabel="loading"
          />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImg} alt={modalAlt} />
            </Modal>
          )}
          {images.length < 1 ? (
            <h2>No such {request}, please try another one.</h2>
          ) : (
            <div className={s.centering}>
              <ul className={s.ImageGallery}>
                <ImageGalleryItem
                  images={images}
                  showModal={showModal}
                  onClose={this.toggleModal}
                />
              </ul>
              <Button onClick={this.buttonClick} />
            </div>
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
