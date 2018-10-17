import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Auth from './components/auth';
import './styles/reset.css';
import './styles/app.css';
import { Provider } from 'react-redux';
import storeFactory from './lib/store';
import Home from './home/home';
import Nav from './header/nav';
import CreateGame from './components/create-game/create-game';
const store = storeFactory();



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Nav/>
            <main className="layout">
              <Route exact path='/'
                component={Home} />

              <Route exact path='/creategame'
                component={CreateGame} />
              <div>
                <Route exact path='/auth/:type' component={Auth}/>
              </div>
            </main>
            <footer>
              &copy; DeltaV
              <Link to='/'>About Us</Link>
            </footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
