import React from 'react'

export const ImageView = ({image}) => {
  return (
    <div>
        {image && (<img src={image}/>)}
    </div>
  ) 
}

export default ImageView
