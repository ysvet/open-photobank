import React, { Fragment } from "react";

import styles from "./Description.module.css";

const Description = ({ description }) => {
  return (
    <div className={styles.Description}>
      <Fragment>
        <h1>{description}</h1>
        <hr />
      </Fragment>
    </div>
  );
};

export default Description;
