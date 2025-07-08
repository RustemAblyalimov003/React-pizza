import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
type FullPizzaType = {
  imageUrl: string;
  title: string;
  price: string;
};
const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<FullPizzaType>();
  const { id } = useParams();

  useEffect(() => {
    (async function fetchPizza() {
      try {
        const response = await axios.get(
          "https://679a59f6747b09cdccce9753.mockapi.io/items/" + id
        );
        setPizza(response.data);
      } catch (error) {
        alert("пицц нет");
      }
    })();
  }, []);

  if (!pizza) {
    return <h2>идет загрузка</h2>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p></p>
      <h4>{pizza.price} руб.</h4>
    </div>
  );
};
export default FullPizza;
