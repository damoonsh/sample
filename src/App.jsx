import { Button } from "@mui/material";
import { useState } from "react";
// import { BrowserRouter, HashRouter, Routes, Route} from "react-router-dom";

import { Entry } from "./components/Entry";
import { Customize } from "./components/Customize";
import "./app.css";

import AddIcon from '@mui/icons-material/Add';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

function App() {
  const [page, setPage] = useState("entry");

  function renderPage() {
    if (page == "entry") {
      return <Entry />;
    } else if (page == 'add') {
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
          <RadioButtonCheckedIcon/>
        </Button>
        <Button
          variant={page == "add" ? "contained" : "outlined"}
          onClick={() => setPage("add")}
        >
          <AddIcon></AddIcon>
        </Button>

      </div>
      {renderPage()}

      {/* <BrowserRouter basename="/sample">
        <Routes>
          <Route path="/">
            <Route index element={<Entry />}></Route>
            <Route path="/add-schema" element={<Customize />}></Route>
          </Route>
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
