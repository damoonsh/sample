import { useState } from 'react';

function App() {

  const [type, setType] = useState('');
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);

  async function click() {

    const body = {
      type: type,
      reps: Number(reps),
      sets: Number(sets),
    }

    console.log(body)

    const response = await fetch("https://flask-mongo-383020.ue.r.appspot.com/add/", {
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)}
      );
    // console.log(response)
  }

  function typeChange(e) {setType(e.target.value);}
  function repsChange(e) {setReps(e.target.value);}
  function setsChange(e) {setSets(e.target.value);}



  return (
    <div className="App">
      <h1>Main thing</h1>
      
      Type:
        <input cols="5" rows="1" onChange={typeChange} value={type}></input> <br />
      Reps: 
        <textarea cols="5" rows="1" onChange={repsChange} value={reps}></textarea> <br />
      Sets: 
        <textarea cols="5" rows="1" onChange={setsChange} value={sets}></textarea> <br />
      
      <br></br>
      <button onClick={click}>record</button>
    </div>
  )
}

export default App
