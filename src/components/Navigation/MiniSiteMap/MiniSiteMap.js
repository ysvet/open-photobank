import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import styles from './MiniSiteMap.module.css';

class MiniSiteMap extends Component {
  render() {
    const catalogItemCategory = (
      <div className={styles.MapElement}>
        <span>
          <NavLink to='/categories' exact={this.props.exact}>
            Categories {`>`}
          </NavLink>
        </span>
        <span>
          <NavLink to={this.props.catLink} exact={this.props.exact}>
            {' '}
            {this.props.catName}
          </NavLink>
        </span>
      </div>
    );

    const catalogItemContributor = (
      <div className={styles.MapElement}>
        <span>
          <NavLink to='/contributors' exact={this.props.exact}>
            Contributors {`>`}
          </NavLink>
        </span>
        <span>
          <NavLink to={this.props.contrLink} exact={this.props.exact}>
            {' '}
            {this.props.contrName}
          </NavLink>
        </span>
      </div>
    );

    const separator = <div className={styles.Separator}> | </div>;

    return (
      <div className={styles.MiniSiteMap}>
        {this.props.catLink ? <div> {catalogItemCategory} </div> : null}
        {this.props.catLink && this.props.contrLink ? (
          <div> {separator} </div>
        ) : null}
        {this.props.contrLink ? <div> {catalogItemContributor}</div> : null}
      </div>
    );
  }
}

export default MiniSiteMap;
