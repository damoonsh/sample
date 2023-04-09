import { Entry } from './components/Entry';
import { Customize } from './components/Customize';
import './components/Entry.css'
import './app.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    
    <div className="App">
      <h1>Recorder</h1>
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Entry/>}></Route>
          <Route path='add-schema' element={<Customize/>}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
      
    </div>
  )
}

export default App
