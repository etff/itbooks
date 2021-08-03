import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import MainPage from "./MainPage/MainPage";
import BookDetail from "./BookDetail/BookDetail";

const AppRouter = () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/book/:bookId" component={BookDetail} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
};

export default AppRouter;
