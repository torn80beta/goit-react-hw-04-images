import React, { useState, useEffect } from 'react';
import { StyledImageGalleryUl } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { scroll } from 'utils/scroll';
import PropTypes from 'prop-types';

const ImageGallery = ({ data }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(data);
    if (images.length > 15) {
      scroll();
    }
  }, [data, images]);

  return (
    <>
      <StyledImageGalleryUl className="gallery">
        {images &&
          images.map(item => <ImageGalleryItem key={item.id} data={item} />)}
      </StyledImageGalleryUl>
    </>
  );
  // }
};

export default ImageGallery;

ImageGalleryItem.propTypes = {
  data: PropTypes.object.isRequired,
};
