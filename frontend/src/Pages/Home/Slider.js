import React from 'react'
import Carousel from 'react-material-ui-carousel'

const data = [
    "https://img.freepik.com/free-photo/laptop-shopping-bags-online-shopping-concept_1423-189.jpg?w=1060&t=st=1693237044~exp=1693237644~hmac=8a6d76a2b014b71f10d5916572216c6caa9805e4ade5d068311cc48a3c518534",
    "https://img.freepik.com/free-photo/full-shot-woman-online-fashion-shopping_23-2150460083.jpg?w=1060&t=st=1693237099~exp=1693237699~hmac=92a0fe8fffe6e311958362ef7a0defca677bcb7226d835707456c1aaf6d081ab",
    "https://img.freepik.com/free-photo/discount-shopping-season-with-sale_23-2150165932.jpg?w=1060&t=st=1693237124~exp=1693237724~hmac=d51511403a05460c3a13dfbd08d85ec008670519deb9992b18c3088f147077c4",
    "https://img.freepik.com/free-photo/cropped-image-woman-inputting-card-information-key-phone-laptop-while-shopping-online_1423-68.jpg?w=1060&t=st=1693237145~exp=1693237745~hmac=4a2f1531a08962b6ac36a5cee0faccbd8fdc8d5a0276237bf3e1275258bc1378"
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
            <img src={image} alt=""  className='full-slider' />
          )
        })}
      </Carousel>
    </>
  )
}

export default Slider
