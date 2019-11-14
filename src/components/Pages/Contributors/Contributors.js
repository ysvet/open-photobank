import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Head from '../../Head/Head';
import Spinner from '../../UI/Spinner/Spinner';
import TitleBlock from '../../TitleBlock/TitleBlock';
import ContributorCard from './ContributorCard/ContributorCard';
import { getAllContributors } from '../../../store/actions/contributor';

import styles from './Contributors.module.css';

const Contributors = ({
  getAllContributors,
  contributor: { contributors, loading }
}) => {
  useEffect(() => {
    getAllContributors();
  }, [getAllContributors]);

  let photoContributorsCards = contributors.map(contributor => (
    <Link
      key={contributor.contributorID}
      to={{ pathname: `/contributors/${contributor.contributorID}` }}
    >
      <ContributorCard
        contrName={contributor.name}
        contrWeb={contributor.web}
        contrEmail={contributor.email}
      />
    </Link>
  ));

  const contributorsPage = (
    <Fragment>
      <Head title='Contributors' content='Contributors' />
      <div className={styles.Container}>
        <TitleBlock pageTitle={'Contributors'} />
        <div>
          <div className={styles.Contributors}>{photoContributorsCards}</div>
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {contributors === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>{contributorsPage}</Fragment>
      )}
    </Fragment>
  );
};

Contributors.propTypes = {
  getAllContributors: PropTypes.func.isRequired,
  contributor: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    contributor: state.contributor
  };
};

export default connect(mapStateToProps, { getAllContributors })(Contributors);
