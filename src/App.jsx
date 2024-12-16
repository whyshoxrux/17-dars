import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Country from "./components/Country"
import Navbarr from "./components/Navbarr"

function App() {
  return (
    <>
      <Navbarr />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/country/:name" element={<Country />} />
      </Routes>
    </>
  )
}

export default App
