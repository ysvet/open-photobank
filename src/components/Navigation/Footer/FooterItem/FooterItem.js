import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './FooterItem.module.css';


const footerItem = ( props ) => (
          <li className={styles.FooterItem}>
            <NavLink
              to={props.link}
              exact={props.exact}
              activeClassName={styles.active}>{props.children}</NavLink>
           </li>
       );

export default footerItem;