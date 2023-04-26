import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollUpButton from './ScrollUpButton/ScrollUpButton';
import { fetchUrl } from 'api/FetchUrl';
import UrlCreator from 'api/UrlCreator';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { StyledLoadSpinner } from './LoadSpinner/LoadSpinner.styled';
import { ThreeDots } from 'react-loader-spinner';
export const urlCreator = new UrlCreator();

const App = () => {
  const [data, setData] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const onSearchFormSubmit = searchQuery => {
    setQuery(
      searchQuery
      // , () => console.log(this.state)
    );
  };

  const handleLoadMore = () => {
    const newUrl = urlCreator.getUrl(query, urlCreator.incrementPage());
    // console.log(newUrl);
    setLoading(true);
    setTimeout(() => {
      fetchUrl(newUrl)
        .then(response => {
          setData(data => [...data, ...response.hits]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 250);
    // .then(console.log(data));
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      fetchUrl(urlCreator.getUrl(query))
        .then(response => {
          if (response.totalHits === 0) {
            toast.info("There's no images for your request.", {
              position: 'top-center',
              autoClose: 2000,
              theme: 'colored',
            });
          }
          setData(response.hits);
          setTotalHits(response.totalHits);
          // () => console.log(totalHits)
        })
        .catch(error => setError(error.message))
        .finally(() => {
          setLoading(false);
        });
    }, 200);
  }, [query]);

  return (
    <>
      <Searchbar onSubmit={onSearchFormSubmit} />
      <ImageGallery data={{ data: data, totalHits: totalHits }} />
      {loading && (
        <StyledLoadSpinner>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#ff853e"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </StyledLoadSpinner>
      )}
      {data.length > 0 && data.length < totalHits && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}
      {error && <h2 style={{ textAlign: 'center' }}>{error}</h2>}
      <ToastContainer transition={Zoom} />
      <ScrollUpButton />
    </>
  );
};

export default App;
