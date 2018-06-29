import React from 'react';
import  "./link.css";

const Link = ({error, link}) => {
  if (error) return <p>{error}</p>
  return (
    link ?
    <h6>You can check out the new data here: <a href={link}>{link}</a></h6>
    :
    null  
  )
}

export default Link;