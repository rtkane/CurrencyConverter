"use client";

import { useState } from "react";

export default function CurrencyConverter() {
  const [currencyList, setCurrencyList] = useState([
    { id: 1, currencyCode: "USD", exchangeRate: 1.0 },
  ]);

  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(String);
  const [newCurrencyCode, setNewCurrencyCode] = useState("");
  const [newExchangeRate, setNewExchangeRate] = useState("");
  const [operation, setOperation] = useState("converter");

  const getExchangeRate = (currencyCode: string): number => {
    const currency = currencyList.find((c) => c.currencyCode === currencyCode);
    if (!currency) {
      throw new Error(`Currency code '${currencyCode}' not found.`);
    }
    return currency.exchangeRate;
  };

  const handleConvert = () => {
    try {
      const fromRate = getExchangeRate(currencyFrom.toUpperCase());
      const toRate = getExchangeRate(currencyTo.toUpperCase());
      const result = (Number(amount) * toRate) / fromRate;
      setConvertedAmount(result.toFixed(2));
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDeleteCurrency = () => {
    if (!checkList(newCurrencyCode)) {
      alert("Currency Not in Data");
      setNewCurrencyCode("");
    } else {
      setCurrencyList((prevList) => {
        return prevList.filter(
          (currency) => currency.currencyCode !== newCurrencyCode.toUpperCase()
        );
      });
    }
  };

  const handleAddCurrency = () => {
    if (checkList(newCurrencyCode)) {
      alert("Currency Already in Data");
      setNewCurrencyCode("");
      setNewExchangeRate("");
    } else {
      if (newCurrencyCode && newExchangeRate) {
        setCurrencyList((prevList) => {
          if (
            prevList.some(
              (currency) =>
                currency.currencyCode === newCurrencyCode.toUpperCase()
            )
          ) {
            alert("Currency Already in Data");
            setNewCurrencyCode("");
            setNewExchangeRate("");
            return prevList;
          }

          return [
            ...prevList,
            {
              id: prevList.length + 1,
              currencyCode: newCurrencyCode.toUpperCase(),
              exchangeRate: parseFloat(newExchangeRate),
            },
          ];
        });
        setNewCurrencyCode("");
        setNewExchangeRate("");
      } else {
        alert("Please fill in both the currency code and exchange rate.");
      }
    }
  };

  const checkList = (newCurrencyCode: string): boolean => {
    for (let i = 0; i < currencyList.length; i++) {
      if (currencyList[i]?.currencyCode == newCurrencyCode) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>

      <div className="mb-4">
        <label htmlFor="operation" className="block text-lg mb-2">
          Choose Operation:
        </label>
        <select
          id="operation"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="converter">Currency Converter</option>
          <option value="addToTable">Add Currency to Table</option>
          <option value="deleteToTable">Delete Currenct from Table</option>
        </select>
      </div>

      {operation === "converter" && (
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            placeholder="Currency From (e.g., USD)"
            value={currencyFrom}
            onChange={(e) => setCurrencyFrom(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Currency To (e.g., PHP)"
            value={currencyTo}
            onChange={(e) => setCurrencyTo(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleConvert}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Convert
          </button>
        </div>
      )}

      {operation === "addToTable" && (
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-xl font-bold">Add New Currency</h2>
          <input
            type="text"
            placeholder="Currency Code (e.g., EUR)"
            value={newCurrencyCode}
            onChange={(e) => setNewCurrencyCode(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Exchange Rate"
            value={newExchangeRate}
            onChange={(e) => setNewExchangeRate(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddCurrency}
            className="p-2 bg-green-500 text-white rounded"
          >
            Add Currency
          </button>
        </div>
      )}

      {operation === "deleteToTable" && (
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-xl font-bold">Add New Currency</h2>
          <input
            type="text"
            placeholder="Currency Code (e.g., EUR)"
            value={newCurrencyCode}
            onChange={(e) => setNewCurrencyCode(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleDeleteCurrency}
            className="p-2 bg-red-500 text-white rounded"
          >
            Delete Currency
          </button>
        </div>
      )}

      {convertedAmount !== null && operation === "converter" && (
        <div className="p-4 bg-green-100 rounded">
          Converted Amount: {convertedAmount} {currencyTo}
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Currency ID</th>
            <th className="border border-gray-300 p-2">Currency Code</th>
            <th className="border border-gray-300 p-2">Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {currencyList.map((currency, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{currency.id}</td>
              <td className="border border-gray-300 p-2">
                {currency.currencyCode}
              </td>
              <td className="border border-gray-300 p-2">
                {currency.exchangeRate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
