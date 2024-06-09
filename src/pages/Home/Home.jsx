import React, { useEffect, useState } from "react";
import "./Home.css";
import { useCoins } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoins, currency } = useCoins();
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoins);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoins.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoins);
  }, [allCoins, currency]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cruptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="Search crypto...."
            onChange={inputHandler}
            list="coinlist"
            value={input}
            required
          />
          <datalist id="coinlist">
            {allCoins.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((coin, index) => {
          return (
            <Link to={`/coin/${coin.id}`} className="table-layout" key={coin.id}>
              <p>{coin.market_cap_rank}</p>
              <div className="crypto">
                <img src={coin.image} alt={coin.name} className="crypto-img" />
                <p>
                  {coin.name} - {coin.symbol}
                </p>
              </div>
              <p>
                {currency.symbol} {coin.current_price.toLocaleString()}
              </p>
              <p
                style={{ textAlign: "center" }}
                className={
                  coin.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {Math.floor(coin.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="market-cap">
                {currency.symbol} {coin.market_cap.toLocaleString()}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
