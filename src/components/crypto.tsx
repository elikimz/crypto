import React, { useEffect, useState } from 'react';

// Define a type for the cryptocurrency data
interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
}

const CryptoList: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const data: Crypto[] = await response.json();
      setCryptos(data);
      setFilteredCryptos(data);
    };
   
    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    const filtered = cryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCryptos(filtered);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-400 to-blue-500 min-h-screen p-4">
      <h1 className="text-4xl font-bold text-white text-center mb-6">Cryptocurrency Prices</h1>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter by cryptocurrency name"
        className="block w-full md:w-1/3 mx-auto p-2 border border-gray-200 rounded-md mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg mb-6">
        <table className="min-w-full">
          <thead className="bg-blue-600 text-white uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-2 sm:px-4 text-left">Name</th>
              <th className="py-3 px-2 sm:px-4 text-left">Symbol</th>
              <th className="py-3 px-2 sm:px-4 text-left">Price (USD)</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm font-light">
            {filteredCryptos.map(crypto => (
              <tr key={crypto.id} className="border-b border-gray-200 hover:bg-blue-100 transition duration-200">
                <td className="py-3 px-2 sm:px-4">{crypto.name}</td>
                <td className="py-3 px-2 sm:px-4">{crypto.symbol.toUpperCase()}</td>
                <td className="py-3 px-2 sm:px-4 font-semibold text-blue-600">${crypto.current_price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="bg-blue-600 text-white py-4 text-center">
        <p className="text-sm">Powered by KimTech</p>
        <p className="text-sm">Email: elijahkimani1293@gmail.com</p>
        <p className="text-sm">Phone: 0791337188</p>
      </footer>
    </div>
  );
};

export default CryptoList;
