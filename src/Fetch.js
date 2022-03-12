const fetchCurrency = () => {
  return fetch("https://www.cbr-xml-daily.ru/latest.js", {
    method: "GET"
  }).then((res) => res.json());
};

export default fetchCurrency;
