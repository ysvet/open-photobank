import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Dropdown.module.css';

class DropdownPeriod extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  render() {
    const menuItems = this.props.periods.map(period => (
      <li key={period.periodID}>
        <NavLink
          to={`/categories/${this.props.categoryID}/period/${period.periodID}`}
        >
          {period.periodName}
        </NavLink>
      </li>
    ));

    return (
      <div className={styles.Dropdown}>
        <div className={styles.button} onClick={this.showDropdownMenu}>
          Filter by period
        </div>

        {this.state.displayMenu ? (
          <ul>
            <li>
              <NavLink to={`/categories/${this.props.categoryID}`}>
                Clear filter
              </NavLink>
            </li>
            {menuItems}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default DropdownPeriod;
