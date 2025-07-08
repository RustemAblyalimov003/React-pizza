import React from "react";
import qs from "qs";
import { useAppDispatch, useAppselector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

import { filtrsType, setCategoryId, setFilters } from "../redux/slices/FilterSlice";
import Categories from "../components/Categories";
import Sort, { sortCategoryArr } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";

import { fetchPizzas } from "../redux/slices/PizzasSlice";
const Home: React.FC = () => {
  const categoryId = useAppselector((state) => state.filter.categoryId);
  const { sortProperty } = useAppselector((state) => state.filter.sort);
  const sortOrder = useAppselector((state) => state.filter.sortOrder);
  const pizzas = useAppselector((state) => state.pizza.pizzas);
  const searchValue = useAppselector((state) => state.filter.searchValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMounted = React.useRef<boolean>(false);
  const isSearch = React.useRef<boolean>(false);

  function onChangeCategory(id: number) {
    dispatch(setCategoryId(id));
  }

  async function pizzasFetch() {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortProperty;
    const order = sortOrder !== "" ? sortOrder : "";
    const search =
      searchValue.toLowerCase() !== ""
        ? `&search=${searchValue.toLowerCase()}`
        : "";
    dispatch(fetchPizzas({ category, sortBy, order, search }));
  }

  React.useEffect(() => {
    if (window.location.search) {
      const parsed = qs.parse(window.location.search.substring(1));

      const sortProperty = (parsed.sortProperty as string) || "rating";
      const sort = sortCategoryArr.find(
        (obj) => obj.sortProperty === sortProperty
      ) || sortCategoryArr[0];

      const params: filtrsType = {
        categoryId: Number(parsed.categoryId) || 0,
        sortOrder: (parsed.sortOrder as string) || "asc",
        sort,
        searchValue: (parsed.searchValue as string) || "",
      };

      if (
        categoryId === params.categoryId &&
        sortOrder === params.sortOrder
      ) {
        pizzasFetch();
      }

      dispatch(
        setFilters({
          params,
          sort,
        })
      );

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isSearch.current === false) {
      pizzasFetch();
    }
    isSearch.current = false;
  }, [categoryId, sortProperty, sortOrder, searchValue]);

  React.useEffect(() => {
    if (isMounted.current === true) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty,
        sortOrder,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortProperty, sortOrder]);

  return (
    <>
      {" "}
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id: number) => onChangeCategory(id)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.map((object) => {
          return <PizzaBlock key={object.id} {...object} />;
        })}
      </div>
    </>
  );
};

export default Home;
