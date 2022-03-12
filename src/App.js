import React, { useEffect, useState } from "react";
import "./styles.css";
import fetchCurrency from "./Fetch";
import CurrencyField from "./CurrencyField";

function App() {
  const [listOfCurrencies, setListOfCurrencies] = useState([]); //список валют
  const [toRub, setToRub] = useState(); //чью валюту конвертируем
  const [otherCurrency, setOtherCurrency] = useState(); // в какую валюту конвертируем
  const [inputRub, setInputRub] = useState(0); // ввод рублей
  const [inputOtherCurrency, setInputOtherCurrency] = useState(); //ввод валюты
  const [sumCurrency, setSumCurrency] = useState(0); //нижнее поле
  const [sumRub, setSumRub] = useState(0); //верхнее поле
  const [date, setDate] = useState();

  useEffect(() => {
    fetchCurrency().then((data) => {
      const { date, base, rates } = data;
      const listCurrencies = Object.keys(rates);
      const [firstKey] = listCurrencies;
      setDate(date);
      setListOfCurrencies(rates);
      setToRub(base);
      setOtherCurrency(firstKey);
    });
  }, []);

  useEffect(() => {
    const exchangeRate = listOfCurrencies[otherCurrency];
    if (!inputOtherCurrency) {
      setSumRub(inputRub);
      setSumCurrency(inputRub * exchangeRate);
    } else {
      setSumCurrency(inputRub);
      setSumRub(inputRub / exchangeRate);
    }
  }, [inputOtherCurrency, inputRub, otherCurrency, listOfCurrencies]);

  function tapFormInput(props, elem) {
    if (elem === "first") {
      setInputOtherCurrency();
      setInputRub(props.target.value);
    } else {
      setInputOtherCurrency(true);
      setInputRub(props.target.value);
    }
  }

  return (
    <div className="container">
      <div className="header"> </div>
      <div className="date">
        <p>КОНВЕРТЕР ВАЛЮТЫ </p>
        <p>По курсу ЦБ РФ {date}</p>
      </div>
      <div className="action">
        <CurrencyField
          name={"first"}
          listOfCurrencies={["RUB"]}
          selectCurrency={toRub}
          onChangeCurrency={(event) => setToRub(event.target.value)}
          sum={sumRub}
          onChangeInput={(props) => tapFormInput(props, "first")}
        />
        <button className="btn replacement"> ⇵ </button>
        <CurrencyField
          name="second"
          listOfCurrencies={Object.keys(listOfCurrencies)}
          selectCurrency={otherCurrency}
          onChangeCurrency={(event) => setOtherCurrency(event.target.value)}
          sum={sumCurrency}
          onChangeInput={(props) => tapFormInput(props, "second")}
        />
      </div>
    </div>
  );
}

export default App;
