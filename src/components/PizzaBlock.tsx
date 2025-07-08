import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { setPizza } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { Pizaa } from "../redux/slices/cartSlice";
type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
}) => {
  const [activeSize, setActiveSize] = React.useState<number>(0);
  const [activeType, setActiveType] = React.useState<number>(types[0]);
  const typesArr: string[] = ["тонкое", "традиционное"];

  const dispatch = useAppDispatch();

  function pizzaTypeChange(index: number): void {
    setActiveType(index);
  }

  function addPizza(): void {
    const obj: Pizaa = {
      id: undefined,
      title,
      imageUrl,
      type: typesArr[activeType],
      size: sizes[activeSize],
      price:
        activeSize === 0
          ? price
          : activeSize === 1
          ? Math.round(price * 1.5)
          : Math.round(price * 1.8),
      count: 1,
      fullPrice: 0,
    };
    dispatch(setPizza(obj));
  }
  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((index) => {
            return (
              <li
                key={index}
                onClick={() => pizzaTypeChange(index)}
                className={activeType === index ? "active" : ""}
              >
                {typesArr[index]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? "active" : ""}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">
          {activeSize === 0
            ? price
            : activeSize === 1
            ? Math.round(price * 1.5)
            : Math.round(price * 1.8)}
          ₽
        </div>
        <button
          onClick={() => addPizza()}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
