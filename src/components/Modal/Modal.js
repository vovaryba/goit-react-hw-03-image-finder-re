import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ code }) => {
    const { onClose } = this.props;
    if (code === 'Escape') {
      onClose();
    }
  };

  handleBackdropClick = ({ currentTarget, target }) => {
    const { onClose } = this.props;
    if (currentTarget === target) {
      onClose();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>{children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
