function CurrencyField({
  name,
  listOfCurrencies,
  selectCurrency,
  onChangeCurrency,
  sum,
  onChangeInput
}) {
  return (
    <div>
      <input
        name={name}
        type="number"
        className="input"
        value={sum}
        onChange={onChangeInput}
      />
      <select
        className="select"
        value={selectCurrency}
        onChange={onChangeCurrency}
      >
        {listOfCurrencies.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyField;
