import React from 'react';
import  "./link.css";

const Link = ({error, link}) => {
  if (error) {
    return <div className="message grey-border-shadow"><p>{error}</p></div>
  }
  return (
    link ?
     <div  className="message grey-border-shadow">
      <h3>You can check out the new data here: <a href={link}>{link}</a></h3>
      </div>
        :
      null  
  )
}

export default Link;