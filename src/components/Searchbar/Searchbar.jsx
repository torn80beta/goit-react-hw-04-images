import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { urlCreator } from 'components/App';
import {
  StyledSearForm,
  StyledLogo,
  StyledInput,
  StyledSearchButton,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (query === '') {
      toast.info('Enter your search query, please!', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      });
      return;
    }
    urlCreator.resetPage();
    onSubmit(query);
    setQuery('');
  };

  const handleSearchChange = e => {
    setQuery(e.currentTarget.value.trim().toLowerCase());
  };

  return (
    <header id="top" className="searchbar">
      <StyledSearForm onSubmit={handleSearchSubmit}>
        <StyledLogo>PiXplorer</StyledLogo>
        <StyledInput
          type="text"
          name="searchQuery"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos..."
          value={query}
          onChange={handleSearchChange}
        />
        <StyledSearchButton className="button" type="submit">
          Search
        </StyledSearchButton>
      </StyledSearForm>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
