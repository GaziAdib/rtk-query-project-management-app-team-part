import React from 'react'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { searchProject } from '../features/projects/projectsSlice';

const SearchBox = () => {

 const dispatch = useDispatch();


 const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };


  const handleChange = (value) => {
        dispatch(searchProject(value))
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  
  return (
        <input
            className="outline-none border-none mr-2"
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => optimizedFn(e.target.value)}
        />
  )
}

export default SearchBox