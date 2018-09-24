/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';
import environment from '../environment';
import CreateUrlMutation from '../mutations/CreateUrlMutation';
import './HomePage.css';

type State = {
  destination: string,
  error: ?string,
};

type Props = {
  history: RouterHistory,
};

class HomePage extends React.Component<Props, State> {

  state: State = {
    destination: '',
    error: null,
  };

  onCreateUrl = async (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!this.state.destination) {
      this.setState({ error: 'Must enter a URL' });
      return;
    }
    try {
      const result = await CreateUrlMutation.commit(environment, this.state.destination);
      const identifier = result.createUrl.url.identifier;
      this.props.history.push(`/info/${identifier}`);
    } catch (err) {
      this.setState({ error: err.message || 'Something went wrong! :(' });
    }
  }

  render() {
    return (
      <div className='HomePage'>
        <h2 className='HomePage-header'>Url Shortener</h2>
        <form onSubmit={this.onCreateUrl}>
          <div className='HomePage-mainActions'>
            <div className='HomePage-shortenInputContainer'>
              <input
                type='text'
                value={this.state.destination}
                placeholder='Destination URL'
                onChange={evt => this.setState({ destination: evt.target.value })}
                className='HomePage-shortenInput'
              />
            </div>
            <button type='submit' className='HomePage-shortenInputButton'>Create</button>
          </div>
          <div className={classNames('HomePage-error', {
            'is-visible': !!this.state.error,
          })}>
            {this.state.error}
          </div>
        </form>
        <Link to='/urls' className='HomePage-allUrlsLink'>See all URLs</Link>
      </div>
    );
  }
}

export default withRouter(HomePage);
