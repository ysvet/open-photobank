import React from 'react';

import styles from './CategoryCard.module.css';

const CategoryCard = ({ catName, catDescription, catImageLink }) => {
  const displayCatCard = (
    <div className={styles.CatCard}>
      <img alt={catName} src={catImageLink} className={styles.CatImage} />
      <div className={styles.CatCardBody}>
        <div className={styles.CatCardText}>
          <h2>{catName}</h2>
          <h3>{catDescription}</h3>
        </div>
      </div>
    </div>
  );

  return <div>{displayCatCard}</div>;
};

export default CategoryCard;
