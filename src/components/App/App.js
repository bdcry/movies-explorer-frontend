import "./App.css";
import { Route, Switch } from "react-router-dom";

import Login from "../Login/Login";
import Register from "../Register/Register";

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/signin'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
