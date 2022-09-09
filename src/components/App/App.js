import "./App.css";
import { Route, Switch } from "react-router-dom";

import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";

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
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
