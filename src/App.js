import React, { useEffect, useState } from "react";

function App() {
  const [trains, setTrains] = useState([]);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4444/vonat")
      .then((res) => res.json())
      .then((data) => setTrains(data));
  }, []);

  const handleChange = (e) => {
    fetch(`http://localhost:4444/vonat?vonatId=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setEvents(data));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue=""
            onChange={(e) => handleChange(e)}
          >
            {trains.map((train) => (
              <option key={train.vId} value={train.vId}>
                {train.vNev}
              </option>
            ))}
          </select>
        </div>
        {events && 
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Áll</th>
                  <th scope="col">Óra</th>
                  <th scope="col">Perc</th>
                  <th scope="col">Jelleg</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, key) => (
                  <tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <td>{event.allId}</td>
                    <td>{event.ora}</td>
                    <td>{event.perc}</td>
                    <td>{event.jelleg === "I" ? "Indulás" : "Érkezés"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
