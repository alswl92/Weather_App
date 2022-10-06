import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import classNames from 'classnames';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState ('clear');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=79d76ff73ef86878f23adfc015f6a137`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        setWeather(response.data.weather[0].main)
        console.log(weather)
      })
      setLocation('')
    }
  }

  const className = classNames({
    'app Clear' : true,
    'app Rain' : weather === 'Rain' || weather === 'Drizzle' || weather ==='Thunderstorm',
    'app Clouds' : weather === 'Clouds' || weather === "Mist"
  })

  
  return (
    <div className= {className} >
      <div className="container">
        <div className="search">
          <input value = {location} onKeyPress = {searchLocation} onChange = {event => setLocation(event.target.value)} type = "text" placeholder='Enter Your City...'/>
        </div>
      <div className='top'>
        <h3>{data.name}</h3>
        {data.main ? <h1>{data.main.temp}F</h1> : null}
        {data.weather ? <h4>{data.weather[0].main}</h4> : null}
      </div>
      <div className={data.main ? 'bottom' : 'init'}>
        <div className="min_temp">
          {data.main ? <h2>{data.main.temp_min}°F</h2> : null}
          <h3>Min Temp</h3>
        </div>
        <div className="max_temp">
        {data.main ? <h2>{data.main.temp_max}°F</h2> : null}
          <h3>Max Temp</h3>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
