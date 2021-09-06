import { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Search } from '../pages/Search';

import { ErrorBoundary } from './ErrorBoundary';

export class Router extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
    if (process.env.NODE_ENV !== 'production') {
      console.group('ROUTER ERROR: COMPONENT DID CATCH');
      console.error(error, info);
      console.groupEnd();
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route exact path='/' component={Search} />
            <Route exact path='/search' component={Search} />

            <Route path='/:slug'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </Suspense>
      </ErrorBoundary>
    );
  }
}
