import React,{useState, useEffect} from 'react';

import './App.css';

const apikey = "at_IfkkxTa4ayXnxnmNnTLaXFNtF8pgP"
const apikey_geo = "AIzaSyCUX02AmWe49tpHWD2o9k1kbmUYcqZkJyE"

function App() {
  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [valueIp, setValueIp] = useState("8.8.8.8")
  const [maps, setMaps] = useState("https://www.google.com/maps/embed/v1/place?key=AIzaSyCUX02AmWe49tpHWD2o9k1kbmUYcqZkJyE&q=Space+Needle,Seattle+WA")

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setValueIp(query)
}

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apikey}&ipAddress=${valueIp}`);
      const data = await res.json();
      setInfo(data);
      setMaps(`https://www.google.com/maps/embed/v1/place?key=AIzaSyCUX02AmWe49tpHWD2o9k1kbmUYcqZkJyE&q=${data.location.city},${data.location.region}+${data.location.country}`)
      console.log(data)
      setLoading(false);
    }
    fetchData();
  }, [valueIp]);

  return (
   
    <div className="App">
      {loading 
      ? <h1>Loading...</h1>  
      : <div className="app__body"> 
        <div className="app__header">
          <h2>IP Address Tracker</h2>
          <div className="app__search">
            <form onSubmit={handleSubmit}>
              <input data-testid="input" className="app__search__input" placeholder="Search for any IP address" value={query} onChange={e => setQuery(e.target.value)}></input>
              <button data-testid="button" type="submit" onClick={handleSubmit}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004"><path d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"/></svg></button>         
            </form>
          </div>
          <div className="app__info">
            <div className="app__info__section">
              <h6>IP ADDRESS</h6>
              <h4>{info.ip}</h4>
            </div>
            <div className="app__info__section">
              <h6>LOCATION</h6>
              <h4>{info.location.city}, {info.location.country}, {info.location.region}</h4>
            </div>
            <div className="app__info__section">
              <h6>TIMEZONE</h6>
              <h4>{info.location.timezone}</h4>
            </div>
            <div className="app__info__section">
              <h6>ISP</h6>
              <h4 data-testid="ISP">{info.isp}</h4>
            </div>
          </div>
        </div>
        <div className="app__map" >
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            src={maps}>
          </iframe>
        </div> 
      </div>
}

    </div>
  );
}

export default App;
