import logo from "./logo.svg";
import "./App.css";

function App() {
  var lengthWord = 8;
  var words = require("an-array-of-french-words").filter(
    (d) => d.length === lengthWord
  );

  var choosenWord = words[Math.floor(Math.random() * words.length)];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{choosenWord}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
