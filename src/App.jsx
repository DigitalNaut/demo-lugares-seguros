import { Routes, Route, useNavigate } from "react-router-dom";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useAppBar from "components/AppBar/UseAppBar";
import AppBar from "components/AppBar";
import WithFAB from "components/FAB";
import Home from "pages/Home";
import EditPlace from "pages/EditPlace";
import ViewPlace from "pages/ViewPlace";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const { title, hasBackButton, configAppBar } = useAppBar();

  return (
    <div className="App">
      <AppBar title={title} hasBackButton={hasBackButton} />
      <Routes>
        <Route
          path="/"
          element={<WithFAB onClick={() => navigate("/places/new")} />}
        >
          <Route path="" element={<Home configAppBar={configAppBar} />} />
        </Route>
        <Route
          path="places/new"
          element={<EditPlace configAppBar={configAppBar} />}
        />
        <Route
          path="places/:placeId/edit"
          element={<EditPlace configAppBar={configAppBar} />}
        />
        <Route
          path="places/:placeId/view"
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
