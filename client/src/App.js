import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UrlsPage from './pages/UrlsPage';
import InfoPage from './pages/InfoPage';
import NotFoundPage from './pages/NotFoundPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/info/:identifier" component={InfoPage} />
          <Route exact path="/urls" component={UrlsPage} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
