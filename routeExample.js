import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DashBoard from "./Components/dashboard/dashBoard";
import NavBar from "./Components/layout/navbar";
import TaskDetail from "./Components/projects/TaskDetail";
import SignIn from "./Components/auth/signin";
import SignUp from "./Components/auth/signup";
import newTask from "./Components/projects/newTask";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route path="/task/:id" component={TaskDetail} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/newTask" component={newTask} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
