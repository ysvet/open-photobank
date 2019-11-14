import React from 'react';

import styles from './PhotoCardCaption.module.css';

const PhotoCardCaption = (props) => {
    return (
        <div  className={styles.PhotoCardCaption}>
            <div>
                <h3>{props.title}</h3>
            </div>
            {/* <hr /> */}
            <div>
                <p>{props.categoryTitle}</p>
            </div>
        </div>

    );
};

export default PhotoCardCaption;