import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { PATHS } from '../routes/paths';

// -----------------------------------------------

export default function useSearchInput({ onSearchChange, urlKey }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const inputRef = useRef();

  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    if (focused) {
      return;
    }

    navigate({
      pathname: PATHS.dashboard[urlKey],
      search: `?search=true`,
    });
    setFocused(true)
  }
  const onBlur = () => {
    navigate(-1);
    onCancelSearch();
  }
  const onCancelSearch = () => {
    inputRef.current.blur();
    setFocused(false);
    onSearchChange({ target: { value: '' } })
  }

  useEffect(() => {
    if (search === "") {
      onCancelSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);


  return {
    inputRef,
    focused,
    onFocus,
    onBlur
  };
}
