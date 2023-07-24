import React from "react";
import "./App.css";
import FooterComponent from "./components/footer";
import HeaderComponent from "./components/header";
import FormComponent from "./components/form";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <FormComponent />
      <FooterComponent />
    </div>
  );
}

export default App;
