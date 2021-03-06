import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import apiRequest from '../Utils/apiRequest';
import CustomStyle from '../selectStyles';
import debounce from '../Utils/debouncer';

import './styles/filter.css';

const FilterMenu = ({
  setQuery,
  setGenre,
  setStatus,
  setType,
  searchParam,
}) => {
  const [state, setState] = useState({
    genres: [],
    type: ['Manga', 'Webtoon', 'Manhua'],
    status: ['Completed', 'Ongoing'],
  });

  const getGenre = () => {
    apiRequest('/api/manga/genre')
      .then((res) => res.json())
      .then((res) => {
        setState({ ...state, genres: res });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getGenre();
  }, []);

  const onChange = (e) => {
    setQuery(e.target.value);
    (debounce(searchParam))();
  };

  const gOptions = state.genres.map(({ genre: value }) => ({ label: value, value }));
  const statusOptions = state.status.map((value) => ({ value, label: value }));
  const typeOptions = state.type.map((value) => ({ value, label: value }));

  return (
    <div className="filter">
      <div className="filterItem">
        <input
          className="search"
          placeholder="Search by Title..."
          onChange={onChange}
        />
      </div>
      <div className="filterItem">
        <Select
          options={gOptions}
          isMulti
          isSearchable
          onChange={(e) => (e ? setGenre(e) : setGenre([]))}
          placeholder="Search by Genre..."
          isClearable
          styles={CustomStyle}
        />
      </div>
      <div className="filterItem">
        <Select
          options={statusOptions}
          onChange={(e) => (e != null ? setStatus(e.value) : setStatus(''))}
          placeholder="Select Status..."
          isClearable
          styles={CustomStyle}
        />
      </div>
      <div className="filterItem">
        <Select
          options={typeOptions}
          onChange={(e) => (e != null ? setType(e.value) : setType(''))}
          placeholder="Select Type..."
          isClearable
          styles={CustomStyle}
        />
      </div>
      <div className="filterItem">
        <button
          className="button"
          type="button"
          onClick={() => {
            searchParam();
          }}
        >
          <span className="btnText">
            Search
          </span>
        </button>
      </div>
    </div>
  );
};

FilterMenu.propTypes = {
  setQuery: PropTypes.func.isRequired,
  setGenre: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  searchParam: PropTypes.func.isRequired,
};

export default FilterMenu;
