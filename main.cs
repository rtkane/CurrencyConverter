using System;
using System.Collections.Generic;
using System.Linq;

public class CurrencyConverter
{
    private readonly List<Currency> currencyList;

    public CurrencyConverter()
    {
        currencyList = new List<Currency>
        {
            new Currency { Id = 1, CurrencyCode = "USD", ExchangeRate = 1.0m }
        };
    }

    private bool TryGetExchangeRate(string currencyCode, out decimal rate)
    {
        currencyCode = currencyCode.ToUpper();
        var currency = currencyList.FirstOrDefault(c => c.CurrencyCode == currencyCode);

        if (currency != null)
        {
            rate = currency.ExchangeRate;
            return true;
        }

        rate = 0;
        return false;
    }

    public decimal ConvertCurrency(string currencyFrom, string currencyTo, decimal amount)
    {
        if (!TryGetExchangeRate(currencyFrom, out decimal fromRate))
        {
            throw new ArgumentException($"Currency '{currencyFrom}' not found.");
        }

        if (!TryGetExchangeRate(currencyTo, out decimal toRate))
        {
            throw new ArgumentException($"Currency '{currencyTo}' not found.");
        }

        if (amount < 0)
        {
            throw new ArgumentException("Amount cannot be negative.");
        }

        return (amount * toRate) / fromRate;
    }

public void AddCurrency(string currencyCode, decimal exchangeRate)
{
    currencyCode = currencyCode.ToUpper();

    if (currencyList.Any(c => c.CurrencyCode == currencyCode))
    {
        throw new ArgumentException($"Currency '{currencyCode}' already exists.");
    }

    if (exchangeRate <= 0)
    {
        throw new ArgumentException("Exchange rate must be positive.");
    }

    // Round to two decimal places
    exchangeRate = Math.Round(exchangeRate, 2);

    int newId = currencyList.Max(c => c.Id) + 1;
    currencyList.Add(new Currency { Id = newId, CurrencyCode = currencyCode, ExchangeRate = exchangeRate });
}


    public void DeleteCurrency(string currencyCode)
    {
        currencyCode = currencyCode.ToUpper();
        var currency = currencyList.FirstOrDefault(c => c.CurrencyCode == currencyCode);

        if (currency == null)
        {
            throw new ArgumentException($"Currency '{currencyCode}' not found.");
        }

        currencyList.Remove(currency);
    }

    public void DisplayCurrencies()
    {
        if (!currencyList.Any())
        {
            Console.WriteLine("No currencies available.");
            return;
        }

        Console.WriteLine("\nCurrency ID | Currency Code | Exchange Rate");
        currencyList.ForEach(c => Console.WriteLine($"{c.Id} | {c.CurrencyCode} | {c.ExchangeRate}"));
    }
}

public class Currency
{
    public int Id { get; set; }
    public string CurrencyCode { get; set; }
    public decimal ExchangeRate { get; set; }
}

class Program
{
    public static void Main()   
    {
        try
        {
            CurrencyConverter converter = new CurrencyConverter();

            // Add currencies
            converter.AddCurrency("EUR", 0.85m);
            converter.AddCurrency("PHP", 43.1232m);

            Console.WriteLine("\n--- Available Currencies ---");
            converter.DisplayCurrencies();

            // Perform conversion
            decimal result = converter.ConvertCurrency("USD", "EUR", 100);
            Console.WriteLine($"\nConverted Amount: {result} EUR");

            // Delete a currency
            converter.DeleteCurrency("PHP");

            Console.WriteLine("\n--- Currencies After Deletion ---");
            converter.DisplayCurrencies();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"\nError: {ex.Message}");
        }
    }
}
