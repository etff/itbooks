import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import MainPage from "./MainPage/MainPage";
import BookDetail from "./BookDetail/BookDetail";
import Search from "./Search/Search";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Auth from "../../hoc/auth";

const AppRouter = () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/book/:bookId" component={BookDetail} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/login" component={Auth(Login, false)} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
};

export default AppRouter;
