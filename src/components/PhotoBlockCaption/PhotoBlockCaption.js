import React from 'react';
import { Link } from 'react-router-dom';

import styles from './PhotoBlockCaption.module.css';

const PhotoBlockCaption = (props) => {

    return (
        <div className={styles.PhotoBlockCaption}>
            <Link to={props.link}>{props.title}</Link>
        </div>
    );
};

export default PhotoBlockCaption;