import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UrlsPage from './pages/UrlsPage';
import InfoPage from './pages/InfoPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/info/:identifier" component={InfoPage} />
          <Route exact path="/urls" component={UrlsPage} />
        </div>
      </Router>
    );
  }
}

export default App;
