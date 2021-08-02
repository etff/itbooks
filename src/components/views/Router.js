import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./commons/Header";
import Footer from "./Footer/Footer";
import MainPage from "./MainPage/MainPage";

const AppRouter = () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
};

export default AppRouter;
