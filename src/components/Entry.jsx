import { useState, useEffect } from "react";
// import Schemas from "../schemas.json";
import { TextField, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

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
        ></TextField>
        <br />
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

    return <h4>Enter a type to start recording</h4>;
  }

  function renderType() {
    return (
      <Autocomplete
        color="success"
        disablePortal
        onChange={(event, newValue) => {
          setType(newValue);
          setDict({ ...dict, ["type"]: newValue });
        }}
        id="combo-box-demo"
        options={Object.keys(schemas)}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="type" />}
      />
    );
  }

  return (
    <div className="main-entry">
      {renderType()}
      {renderFields()}
      <br />
      {/* <Button href="/add-schema" variant="outlined">Add Exercise</Button> */}
    </div>
  );
}

export { Entry };
