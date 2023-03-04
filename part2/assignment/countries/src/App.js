import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const lat = country.capitalInfo.latlng[0];
  const lng = country.capitalInfo.latlng[1];

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => response.data)
      .then((response) => {
        console.log("weather promise fulfilled");
        setWeather(response);
      });
  }, [country.capital, lat, lng]);

  return weather ? (
    <>
      <h1>Weather in {country.capital}</h1>
      <div>temperature {Number((weather.main.temp - 273).toFixed(2))} Celsius</div>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        title={weather.weather[0].description}
        // style={{ width: 200, height: 200 }}
      />
      <div>wind {weather.wind.speed} m/s</div> 
    </>
  ) : null;
};

const CountryRender = ({ countries, toggleShow }) => {
  return countries.length > 10 ? (
    <p>Too many matches, specify another filter</p>
  ) : countries.length > 1 ? (
    <div>
      {countries.map((person, id) => (
        <div key={id}>
          {person.name.common}
          <button onClick={() => toggleShow(person.name.common)}>show</button>
        </div>
      ))}
    </div>
  ) : countries.length === 1 ? (
    <div>
      <h1>{countries[0].name.common}</h1>
      <p>
        capital {countries[0].capital} <br />
        area {countries[0].area}
      </p>
      <h3>languages:</h3>
      <ul>
        {Object.values(countries[0].languages).map((person, id) => (
          <li key={id}>{person}</li>
        ))}
      </ul>
      <img
        src={countries[0].flags.svg}
        alt={countries[0].flags.alt}
        style={{ width: 200, height: 200 }}
      />
      <Weather country={countries[0]} />
    </div>
  ) : (
    <p>Found no matches, specify another filter</p>
  );
};

const App = () => {
  const [allCountries, setAllCountries] = useState(null);
  const [pattern, setPattern] = useState("");
  // const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log("effect run", "now fetching countries");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => response.data)
      .then((response) => {
        console.log("allcountries promise fulfilled");
        setAllCountries(response);
        console.log("render", response.length, "countries");
      });
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    setPattern(event.target.value);
  };

  const toggleShow = (person) => {
    console.log(`${person} is currently being shown`);
    setPattern(`"${person}"`);
  };

  if (allCountries) {
    console.log(pattern);
    const regex = /^(['"]).*\1$/.test(pattern)
      ? new RegExp("^" + pattern.replace(/"/g, "") + "$", "i")
      : new RegExp(`${pattern}`, "i");

    const countries = allCountries.filter((country) =>
      regex.test(country.name.common)
    );
    console.log(regex, countries);

    return (
      <>
        <div>
          find countries <input value={pattern} onChange={handleChange} />
        </div>

        {/* <div>{countries.map((person) => person.name.common)}</div> */}
        <CountryRender countries={countries} toggleShow={toggleShow} />
      </>
    );
  } else return <p>Please be Patient. We are Loading the Application</p>;
};

export default App;
