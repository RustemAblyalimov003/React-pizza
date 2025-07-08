import React from "react";
type CategoryProps = {
  value: number;
  onClickCategory: (categoryIndex: number) => void;
};
const categoryArr = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
const Categories: React.FC<CategoryProps> = React.memo(
  ({ value, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categoryArr.map((categoryName, categoryIndex) => {
            return (
              <li
                key={categoryIndex}
                onClick={() => onClickCategory(categoryIndex)}
                className={value === categoryIndex ? "active" : ""}
              >
                {categoryName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default Categories;
