import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Dropdown.module.css';

class Dropdown extends React.Component {
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
    const menuItems = this.props.categories.map(category => (
      <li key={category.categoryID}>
        <NavLink
          to={`/locations/${this.props.locationID}/category/${category.categoryID}`}
        >
          {category.categoryName}
        </NavLink>
      </li>
    ));

    return (
      <div className={styles.Dropdown}>
        <div className={styles.button} onClick={this.showDropdownMenu}>
          Filter by category
        </div>

        {this.state.displayMenu ? (
          <ul>
            <li>
              <NavLink to={`/locations/${this.props.locationID}`}>
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

export default Dropdown;
