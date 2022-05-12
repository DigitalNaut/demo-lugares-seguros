import { Routes, Route } from "react-router-dom";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Home from "pages/Home";
import AppBar from "components/AppBar";
import EditPlace from "pages/EditPlace";
import useAppBar from "components/AppBar/UseAppBar";

import "./App.css";
import ViewPlace from "pages/ViewPlace";

function App() {
  const { title, hasBackButton, configAppBar } = useAppBar();

  return (
    <div className="App">
      <AppBar title={title} hasBackButton={hasBackButton} />
      <Routes>
        <Route path="/" element={<Home configAppBar={configAppBar} />} />
        <Route
          path="places/new"
          element={<EditPlace configAppBar={configAppBar} />}
        />
        <Route
          path="places/:id/edit"
          element={<EditPlace configAppBar={configAppBar} />}
        />
        <Route
          path="places/:id/view"
          element={<ViewPlace configAppBar={configAppBar} />}
        />
        <Route
          path="*"
          element={
            <h1>
              <FontAwesomeIcon icon={faTriangleExclamation} /> Error 404: No
              encontrado
            </h1>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
