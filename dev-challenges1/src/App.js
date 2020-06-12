import React from 'react';
import './App.css';

import NumberValidator from "./number-validator/NumberValidator.component";
import MovieTrailers from "./movie-trailers/MovieTrailers.component";

const ACTIVE_PANEL = {
  PROBLEM_1: 1,
  PRPOBLE_2: 2
};

const ACTIVE_PANEL_LABLE = {
  PROBLEM_1: 'Problem 1',
  PROBLEM_2: 'Problem 2'
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activePanel: ACTIVE_PANEL.PROBLEM_1
    }
  }

  switchToPanel = (type) => {
    this.setState({
      activePanel: type
    });
  }

  renderHeader = () => {
    let active = this.state.activePanel;
    let view = <div className="app-header">
      <div className={`app-header__item clickable ${ active === ACTIVE_PANEL.PROBLEM_1 ? 'active' : '' }`}
          onClick={ () => this.switchToPanel(ACTIVE_PANEL.PROBLEM_1) }>
          { ACTIVE_PANEL_LABLE.PROBLEM_1 }
      </div>
      <div className={`app-header__item clickable ${ active === ACTIVE_PANEL.PROBLEM_2 ? 'active' : '' }`}
          onClick={ () => this.switchToPanel(ACTIVE_PANEL.PROBLEM_2) }>
          { ACTIVE_PANEL_LABLE.PROBLEM_2 }
      </div>
    </div>;
    return view;
  }

  renderView = () => {
    if(this.state.activePanel === ACTIVE_PANEL.PROBLEM_1) {
      return <NumberValidator />;
    } else if(this.state.activePanel === ACTIVE_PANEL.PROBLEM_2){
      return <MovieTrailers />;
    }
  }

  render() {
    return (
      <div className="project-2">
        {
          this.renderHeader()
        }
        {
          this.renderView()
        }
      </div>
    );  
  }
}

export default App;
