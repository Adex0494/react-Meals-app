import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useState, useEffect } from "react";

const AvailableMeals = () => {
  const [theMeals, setTheMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchTheMeals = async () => {
    try {
      const response = await fetch(
        "https://react-45d3a-default-rtdb.firebaseio.com/meals.json"
      );
      const data = await response.json();
      //console.log(data);
      setTheMeals(data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      setIsError(true);
      //throw error;
    }
  };

  useEffect(() => {
    fetchTheMeals();
  }, []);

  if (isError) return <p className={classes.MealsLoading}>{errorMessage}</p>;

  if (isLoading) return <p className={classes.MealsLoading}>Loading</p>;

  const mealList = theMeals.map((meal) => (
    <MealItem
      title={meal.name}
      description={meal.description}
      price={meal.price}
      key={meal.id}
      id={meal.id}
    ></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
