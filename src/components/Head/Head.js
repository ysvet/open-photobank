import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ title, content }) => {
  return (
    <div>
      <Helmet>
        <meta charset='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />

        <title>open photobank | {title} </title>
        <meta name='description' content={content} />
      </Helmet>
    </div>
  );
};

export default Head;
