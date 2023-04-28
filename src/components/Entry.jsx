import { useState, useEffect } from "react";
// import Schemas from "../schemas.json";
import { TextField, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import './Entry.css';

function Entry() {
  const [dict, setDict] = useState({});
  const [type, setType] = useState("");
  const [schemas, setSchemas] = useState({});

  useEffect(() => {
    fetchSchemas();
  }, []);

  async function fetchSchemas() {
    const URL = "https://flask-mongo-383020.ue.r.appspot.com/get_schemas/";
    // const URL = " http://127.0.0.1:8080/get_schemas/";

    const res = await fetch(URL, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
      },
    }).then((response) => response.json());

    const dict = {};
    for (const item of res) {
      dict[item["type"]] = item["keys"];
    }
    setSchemas(dict);
  }

  async function click() {

    const URL = "https://flask-mongo-383020.ue.r.appspot.com/add/";
    // const URL = " http://127.0.0.1:8080/add";
    // const date = new Date()
    // const ye = new Intl.DateTimeFormat('en', {year:'numeric'}).format(date)
    // const mo = new Intl.DateTimeFormat('en', {month: 'numeric'}).format(date)
    // const da = new Intl.DateTimeFormat('en', {day: 'numeric'}).format(date)

    // setDict({'day': `${ye}-${mo}-${da}`, 'time': date.toLocaleTimeString('it-IT') })

    console.log(dict)

    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dict),
    });

    setType('')
    setDict({})
  }


  function createFields() {
    return schemas[type].map((key, i) => (
      <>
        <TextField
          size="small"
          color="secondary"
          label={key}
          key={i}
          onChange={(event) =>
            setDict({ ...dict, [key]: Number(event.target.value) })
          }
        />
      </>
    ));
  }

  function renderFields() {
    if (type in schemas) {
      
      return (
        <div className="render-fields">
          {createFields()}
          <Button onClick={click} variant="contained" color="primary">Record</Button>
        </div>
      );
    }

    return <center>Choose an exercise</center>;
  }

  function renderType() {
    return (
      <Autocomplete
      className="type-input"
        color="success"
        disablePortal
        isOptionEqualToValue={(option, value) =>
          option.iso === value.iso
        }
        value={type}
        onChange={(event, newValue) => {
          setType(newValue);
          setDict({ ...dict, ["type"]: newValue });
        }}
        id="combo-box-demo"
        options={Object.keys(schemas)}
        // sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="type" />}
      />
    );
  }

  return (
    <div className="main-entry">
      {renderType()}
      {renderFields()}
      {/* <Button href="/add-schema" variant="outlined">Add Exercise</Button> */}
    </div>
  );
}

export { Entry };
