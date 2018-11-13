import React, { Component } from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom'
import Landing from './components/Landing';
import ListIndex from './components/ListIndex';


class App extends Component {


  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">

        </header>
        <main>
          <nav>
          
            <div>
            <Link to='/'>Landing</Link>
            <Link to='/ListIndex'>Lists</Link>
            </div>
  
          </nav>
          <div>
          <Route exact path='/' component={Landing} />
          <Route path="/ListIndex" component={ListIndex} />
          </div>
        </main>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;