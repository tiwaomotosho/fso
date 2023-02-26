import { useState, useEffect } from "react";
import axios from "axios";

const CountryRender = ({ countries }) => {
  return countries.length > 10 ? (
    <p>Too many matches, specify another filter</p>
  ) : countries.length > 1 ? (
    <div>
      {countries.map((person, id) => (
        <div key={id}>
          {person.name.common}
          <br />
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
    </div>
  ) : (
    <p>Found no matches, specify another filter</p>
  );
};

const App = () => {
  const [allCountries, setAllCountries] = useState(null);
  // const [countries, setCountries] = useState([]);
  const [pattern, setPattern] = useState("");

  useEffect(() => {
    console.log("effect run", "now fetching countries");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => response.data)
      .then((response) => {
        console.log("promise fulfilled");
        setAllCountries(response);
        console.log("render", response.length, "countries");
      });
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    setPattern(event.target.value);
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
        <CountryRender countries={countries} />
      </>
    );
  } else return <p>Please be Patient. We are Loading the Application</p>;
};

export default App;
