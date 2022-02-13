import logo from "./logo.svg";
import "./App.css";
import { Input } from "./components/Input/Input";
import { cities } from "./tr-data";
import { useEffect, useState } from "react";
import { Box } from "./components/Box/Box";
import {
  bearing,
  getCardinalDirection,
  getDistanceFromLatLonInKm,
} from "./calculator";

function App() {
  const [city, setCity] = useState("");
  const [counter, setCounter] = useState(0);
  const [input, setInput] = useState("");
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    setCity(cities[Math.floor(Math.random() * cities.length)]);
    setPredictions([{}, {}, {}, {}, {}]);
  }, []);

  const onClick = async () => {
    const prediction = cities.find((x) => x.name === input);
    if (prediction.name == city.name && counter < 6 && input.length > 0) {
      const tmp = calculate(prediction);
      tmp.color = "#3FBD58";
      await addToPredictions(tmp);
      setTimeout(function () {
        if (
          !alert(
            "Tebrikler! " +
              city.name +
              " konumunu " +
              (counter + 1) +
              ". hakkinizda dogru bildiniz!"
          )
        ) {
          window.location.reload();
        }
      }, 500);
    } else if (prediction && counter < 4 && input.length > 0) {
      const tmp = calculate(prediction);
      addToPredictions(tmp);
      setCounter(counter + 1);
      setInput("");
    } else if (prediction) {
      const tmp = calculate(prediction);
      addToPredictions(tmp);
      setCounter(counter + 1);
      setInput("");
      setTimeout(function () {
        if (!alert("Malesef Basaramadiniz ! \n Cevap: " + city.name)) {
          window.location.reload();
        }
      }, 500);
    }
  };

  const addToPredictions = (prediction) => {
    const predictionsCopy = [...predictions];
    predictionsCopy[counter] = {
      ...prediction,
    };
    setPredictions(predictionsCopy);
  };

  const calculate = (prediction) => {
    const bearingValue = bearing(
      prediction.lat,
      prediction.lon,
      city.lat,
      city.lon
    );
    const distance = getDistanceFromLatLonInKm(
      prediction.lat,
      prediction.lon,
      city.lat,
      city.lon
    );
    console.log(city.name, prediction.name);
    // console.log(getCardinalDirection(bearingValue), distance);
    const result = {
      city: prediction.name,
      direction: getCardinalDirection(bearingValue),
      distance: parseInt(distance) + " km",
      color: "#FF4C33",
    };
    return result;
  };

  return (
    <div>
      <div className="svg-div">
        <svg className="svg" fill="#FF9633">
          <path id="city" d={city?.d} />
        </svg>
      </div>

      {predictions.map((prediction, index) => (
        <div key={index}>
          <Box data={prediction} />
        </div>
      ))}

      <div className="row-apply">
        <Input
          value={input}
          onChangeInput={(e) => {
            setInput(e.target.value);
          }}
          cities={cities}
        />
        <button className="btn btn-primary rounded-btn" onClick={onClick}>
          Tahmin Et
        </button>
      </div>
      <div
        className="demo"
        onClick={() => {
          window.open("https://github.com/gurkanucar", "_blank");
        }}
      >
        github.com/gurkanucar
      </div>
    </div>
  );
}

export default App;
