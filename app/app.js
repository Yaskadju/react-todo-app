import "./styles/main.scss"
import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import Todos from "./components/Todos"

function App() {
  return (
    <div className="container">
      <header>
        <h1>Todos</h1>
      </header>
      <Todos />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept()
}
