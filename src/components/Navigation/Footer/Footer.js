import React from 'react';
import FooterItems from './FooterItems/FooterItems';

import styles from './Footer.module.css';


const footer = ( props ) => (
    <footer className={styles.Footer}>
        <nav>
             <FooterItems />
        </nav>
    </footer>
);

export default footer;