import React, { useState, useEffect } from 'react';
import { StyledImageGalleryUl } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { scroll } from 'utils/scroll';
import { endNotification } from 'utils/endNotification';
import PropTypes from 'prop-types';

const ImageGallery = ({ data: { data, totalHits } }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setImages(data);
    }
    if (images.length > 15) {
      scroll();
    }
    if (images.length > 0 && images.length === totalHits) {
      endNotification();
    }
  }, [data, images, totalHits]);

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
