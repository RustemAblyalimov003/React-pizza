import { Pizaa } from "../redux/slices/cartSlice";

export const getPizzaCartPropsFromLS = () => {
  let pizzaArrFromLS: Pizaa[] = JSON.parse(localStorage.getItem("pizzaArr"));
  let pizzaCountFromLS: number = JSON.parse(localStorage.getItem("pizzaCount"));
  let pizzaFullPriceFromLS: number = JSON.parse(
    localStorage.getItem("pizzaFullPrice")
  );
  return { pizzaArrFromLS, pizzaCountFromLS, pizzaFullPriceFromLS };
};
