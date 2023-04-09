import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { TextField, IconButton, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Padding } from "@mui/icons-material";
import "./customize.css";

function Customize() {
  const [type, setTyp] = useState("");
  const [keys, setKeys] = useState([]);
  const [value, setValue] = useState("");

  function add() {
    if (!(keys.includes(value) || value == "")) {
      setKeys([...keys, value]);
      setValue("");
    }
  }

  function removeKey(index) {
    const newKeys = [...keys];
    newKeys.splice(index, 1);
    setKeys(newKeys);
  }

  async function addSchema() {
    // const URL = "https://flask-mongo-383020.ue.r.appspot.com/create_schema/";
    const URL = " http://127.0.0.1:8080/create_schema/";

    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"type": type, "keys": keys}),
    });

    console.log(response)
  }

  function renderKeys() {
    if (keys.length < 1) {
      return <p>Add at least one field is needed</p>;
    }

    return (
      <div>
        {keys.map((key, i) => (
          <ListItem>
            <ListItemText primary={key} />
            <IconButton onClick={() => removeKey(i)} aria-label="delete">
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </ListItem>
        ))}
        <Button
          className="create"
          onClick={addSchema}
          size="small"
          variant="contained"
        >
          <p>Create Exercise </p>
        </Button>
      </div>
    );
  }

  return (
    <div className="main">
      <TextField
        className="type"
        required
        value={type}
        size="small"
        label="type"
        variant="outlined"
        onChange={(e) => setTyp(e.target.value)}
      />
      <br />
      <div className="key">
        <TextField
          value={value}
          size="small"
          label="key"
          variant="outlined"
          onChange={(e) => setValue(e.target.value)}
        />

        <Button
          onClick={add}
          size="large"
          variant="contained"
        >
          +
        </Button>
      </div>

      <List>{renderKeys()}</List>
      <Button href="/" variant="contained">Back</Button>
    </div>


  );
}

export { Customize };
