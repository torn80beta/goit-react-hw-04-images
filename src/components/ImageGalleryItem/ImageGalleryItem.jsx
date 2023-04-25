import React, { useState, useEffect } from 'react';
import {
  StyledImageGalleryItemLi,
  StyledImageGalleryItemImg,
} from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  data: { webformatURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleEscKeydown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      console.log('Modal is mounted');
      window.addEventListener('keydown', handleEscKeydown);
      return () => {
        console.log('Modal is unmounted');
        window.removeEventListener('keydown', handleEscKeydown);
      };
    }
  });

  return (
    <StyledImageGalleryItemLi>
      <StyledImageGalleryItemImg
        src={webformatURL}
        alt={tags}
        onClick={openModal}
      />
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <img className="modal-image" src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </StyledImageGalleryItemLi>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
