import React from 'react';
import Url from '../Url/Url';
import './UrlContainer.css';

const UrlContainer = props => {
  const urlEls = props.urls.map(url => {
    return (
      <Url 
        key={url.id}
        title={url.title}
        short_url={url.short_url}
        long_url={url.long_url}
      />
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
