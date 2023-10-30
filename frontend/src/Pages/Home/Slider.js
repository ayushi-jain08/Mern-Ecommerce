import React from 'react'
import Carousel from 'react-material-ui-carousel'

const data = [
    "https://as1.ftcdn.net/v2/jpg/04/65/46/52/1000_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg",
    "https://as2.ftcdn.net/v2/jpg/06/03/89/21/1000_F_603892114_0uv5aqaqZRNwJAGai6JaCToWv39C92G6.jpg",
    "https://as1.ftcdn.net/v2/jpg/06/34/99/70/1000_F_634997061_8b85Lt4Qt37XF1RfivctWEoQ1JzdJS9F.jpg",
    "https://as2.ftcdn.net/v2/jpg/06/08/33/79/1000_F_608337928_0SIUcayje9KJofXRR4VbuQh87Y9JuPXB.jpg",
    "https://i.ytimg.com/vi/1j_ejU8dNl4/maxresdefault.jpg"
  ]
const Slider = () => {
  return (
    <>
      <Carousel className='carousel' 
      autoPlay={true}
      animation='slide'
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
    >
 {data.map((image,i) => {
          return(
            <img src={image} alt=""  className='full-slider' key={i} />
          )
        })}
      </Carousel>
    </>
  )
}

export default Slider
