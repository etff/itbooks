import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./commons/Header";
import MainPage from "./MainPage/MainPage";

const AppRouter = () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
        </Switch>
      </>
    </Router>
  );
};

export default AppRouter;
