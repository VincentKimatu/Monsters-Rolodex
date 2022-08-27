import { Component } from 'react';

import CardList from './components/card-list/card-list.component.jsx';
import SearchBox from './components/search-box/search-box.components.jsx';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  // Constructor RUNS first
  constructor() {
    super();

    // Initial values of state
    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  // componentDidMount RUNS every time the web/app starts
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
      response.json().then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {}
        )
      )
    );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();

    this.setState(
      () => {
        return { searchField };
      },
      () => {}
    );
  };

  // render() comes with components class
  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <SearchBox
          className="search-box"
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
