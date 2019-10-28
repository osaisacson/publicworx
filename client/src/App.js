import React from "react";
import "./sass/style.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // To use the 'this' keyword, we need to bind it to our function
    // this.handleClick = this.handleClick.bind(this);
  }

  // const [show, setShow] = React.useState(true);
  render() {
    return <div className="App"></div>;
  }
}

export default App;
