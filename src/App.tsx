import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./Map";
import Maintain from "./Maintain";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [resources, setResources]: any[] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await retrieveMarkers();
    })();
  }, [resources.length]);

  const retrieveMarkers = async () => {
    const response = await axios({
      method: "get",
      url: process.env.REACT_APP_URL,
    });
    setResources(response.data);
    setLoaded(true);
  };

  return (
    <Router>
      {loaded && (
        <Routes>
          <Route path="/" element={<Map resources={resources} />} />
          <Route path="maintain" element={<Maintain resources={resources} />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
