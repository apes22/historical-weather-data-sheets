import React from 'react';

const Link = ({error, link}) => {
  if (error) {
    return <div>{error}</div>
  }
  return (
    link ?
     <div>
      You can check out the new data here! <a href={link}>{link}</a>
      </div>
        :
      null
      
  )
}

export default Link;