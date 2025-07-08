import React from "react";
import { setSort, setSortOrder } from "../redux/slices/FilterSlice";
import { useAppselector, useAppDispatch } from "../redux/hooks";
type sortCategoryType = {
  id: number;
  name: string;
  sortProperty: string;
};
export const sortCategoryArr: sortCategoryType[] = [
  { id: 1, name: "популярности", sortProperty: "rating" },
  { id: 2, name: "цене", sortProperty: "price" },
  { id: 3, name: "алфавиту", sortProperty: "title" },
];

const Sort: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const sort = useAppselector((state) => state.filter.sort);
  const sortOrder = useAppselector((state) => state.filter.sortOrder);

  const [popupState, setPopupState] = React.useState<boolean>(false);

  const onClickSetSortOrderType = (state: string): void => {
    dispatch(setSortOrder(state));
  };
  const changeOfSortPopup = (obj: sortCategoryType, state: boolean): void => {
    dispatch(setSort(obj));
    setPopupState(state);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <div className="sort__arrows">
          <button
            className={sortOrder === "asc" ? "activeButton" : ""}
            onClick={() => onClickSetSortOrderType("asc")}
          >
            {" "}
            ↑{" "}
          </button>
          <button
            className={sortOrder === "desc" ? "activeButton" : ""}
            onClick={() => onClickSetSortOrderType("desc")}
          >
            {" "}
            ↓{" "}
          </button>
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => setPopupState(!popupState)}>{sort.name}</span>
      </div>
      {popupState && (
        <div className="sort__popup">
          <ul>
            {sortCategoryArr.map((obj) => {
              return (
                <li
                  key={obj.id}
                  onClick={() => changeOfSortPopup(obj, !popupState)}
                  className={obj.name === sort.name ? "active" : ""}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
