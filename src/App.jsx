import { Entry } from "./components/Entry";
import { Customize } from "./components/Customize";
import "./components/Entry.css";
import "./app.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TextField, IconButton, Button, Box } from "@mui/material";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("entry");

  function renderPage() {
    if (page == "entry") {
      return <Entry />;
    } else {
      return <Customize />;
    }
  }

  return (
    <div className="App">
      <div className="nav">
        <Button
          variant={page == "entry" ? "contained" : "outlined"}
          onClick={() => setPage("entry")}
        >
          Entry
        </Button>
        <Button
          variant={page == "add" ? "contained" : "outlined"}
          onClick={() => setPage("add")}
        >
          Add
        </Button>
        
      </div>

      {renderPage()}

      {/* <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Entry />}></Route>
            <Route path="add-schema" element={<Customize />}></Route>
          </Route>
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
