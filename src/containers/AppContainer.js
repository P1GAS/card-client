import { useState, useEffect } from "react";
import App from "../components/app";

import { addCard } from "../servers";
import getFullYear from "../helpers/get-full-year";

const AppContainer = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [CVV, setCVV] = useState("");
  const [amount, setAmount] = useState("");
  const [expirationDateMonth, setExpirationDateMonth] = useState("");
  const [expirationDateYear, setExpirationDateYear] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");

  const [errors, setErrors] = useState({
    cardNumber: "",
    CVV: "",
    amountHandler: "",
    expirationDateMonth: "",
    expirationDateYear: "",
  });

  useEffect(() => {
    if (
      cardNumber.length < 16 ||
      CVV.length < 3 ||
      !amount ||
      !expirationDateMonth ||
      expirationDateYear < getFullYear()
    ) {
      setIsButtonDisabled(true);
      return;
    }

    setIsButtonDisabled(false);
  }, [cardNumber, CVV, amount, expirationDateMonth, expirationDateYear]);

  const disableError = (errorName) => {
    setErrors((prevErrors) => {
      const errors = { prevErrors };
      errors[errorName] = "";
      return errors;
    });
  };

  const setCardNumberHandler = (value) => {
    if (value.length > 16) {
      return;
    }
    return setCardNumber(value);
  };

  const setCVVHandler = (value) => {
    if (value.length > 3) {
      return;
    }
    return setCVV(value);
  };

  const setAmountHandler = (value) => setAmount(value);

  const setExpirationDateMonthHandler = (value) => {
    if (value > 12) {
      setErrors((errors) => ({
        ...errors,
        expirationDateMonth: "Только от 1 до 12",
      }));
      return;
    } else {
      setErrors((errors) => ({ ...errors, expirationDateMonth: "" }));
    }

    return setExpirationDateMonth(value);
  };

  const setExpirationDateYearHandler = (value) => {
    if (value.length > 3 && value < getFullYear()) {
      setErrors((errors) => ({
        ...errors,
        expirationDateYear: "Год прошёл",
      }));
    } else {
      setErrors((errors) => ({ ...errors, expirationDateYear: "" }));
    }

    setExpirationDateYear(value);
  };

  const submitData = async () => {
    try {
      setServerError("");
      setIsLoading(true);
      const {
        data: { id },
      } = await addCard({
        cardNumber,
        expirationDateMonth,
        expirationDateYear,
        CVV,
        amount,
      });
      setIsLoading(false);
      setId(id);
    } catch (error) {
      setIsLoading(false);
      setServerError(error.response?.message || "Что-то пошло не так");
    }
  };

  return (
    <App
      cardNumber={cardNumber}
      CVV={CVV}
      amount={amount}
      expirationDateMonth={expirationDateMonth}
      expirationDateYear={expirationDateYear}
      setCardNumberHandler={setCardNumberHandler}
      setCVVHandler={setCVVHandler}
      setAmountHandler={setAmountHandler}
      setExpirationDateMonthHandler={setExpirationDateMonthHandler}
      setExpirationDateYearHandler={setExpirationDateYearHandler}
      errors={errors}
      disableError={disableError}
      isButtonDisabled={isButtonDisabled}
      serverError={serverError}
      isLoading={isLoading}
      submitData={submitData}
      id={id}
    />
  );
};

export default AppContainer;
