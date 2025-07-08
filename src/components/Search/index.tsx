import React from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { setsearchValue } from "../../redux/slices/FilterSlice";
import { useAppDispatch } from "../../redux/hooks";
const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = React.useState<string>();

  const onChangeSearchValue = React.useCallback(
    debounce((value: string): void => {
      dispatch(setsearchValue(value));
    }, 250),
    []
  );

  const addSearchValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
    onChangeSearchValue(event.target.value);
  };
  return (
    <input
      value={inputValue}
      onChange={addSearchValue}
      className={styles.root}
      placeholder="поиск пиццы"
    />
  );
};
export default Search;
