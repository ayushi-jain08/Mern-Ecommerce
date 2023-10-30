import React from 'react'
import Carousel from 'react-material-ui-carousel'
import img1 from "../../Images/co.jpg"
import img2 from "../../Images/samsung.jpg"
import img3 from "../../Images/shoes.jpg"
import img4 from "../../Images/headphone.jpg"


const data = [
    "https://img.freepik.com/free-photo/laptop-shopping-bags-online-shopping-concept_1423-189.jpg?w=1060&t=st=1693237044~exp=1693237644~hmac=8a6d76a2b014b71f10d5916572216c6caa9805e4ade5d068311cc48a3c518534",
    "https://as1.ftcdn.net/v2/jpg/06/08/33/82/1000_F_608338242_F0H6UlUbpy1zyZxHupehwom6HaqlRzxK.jpg",
    "https://img.freepik.com/free-photo/discount-shopping-season-with-sale_23-2150165932.jpg?w=1060&t=st=1693237124~exp=1693237724~hmac=d51511403a05460c3a13dfbd08d85ec008670519deb9992b18c3088f147077c4",
    "https://img.freepik.com/free-photo/cropped-image-woman-inputting-card-information-key-phone-laptop-while-shopping-online_1423-68.jpg?w=1060&t=st=1693237145~exp=1693237745~hmac=4a2f1531a08962b6ac36a5cee0faccbd8fdc8d5a0276237bf3e1275258bc1378"
  ]
  
const Banner = () => {
  return (
    <>
      <div className="container">
        <div className="banner">
<div className="left">
<Carousel
  className='carousel' 
  autoPlay={true}
  animation='slide'
  indicators={true}
  cycleNavigation={true}
  indicatorIconButtonProps={{
    style:{color:'white', borderRadius:0, height:'70px', bottom:'70px', zIndex:'999'}
  }}
  activeIndicatorIconButtonProps = {{
    style:{color:'gray'}
  }}
>
{data.map((image,i) => {
          return(
           <div className="img" key={i}>
             <img src={image} alt=""  className='banner-img' width={200} height={200}/>
           </div>
          )
        })}

</Carousel>
</div>
<div className="right">
<div className="upper">
 <div className="img">
 <img src={img2} alt="" style={{objectPosition:'top'}}/>
 </div>
   <div className="img">
   <img src={img1} alt=""  width={200} height={200}/>
   </div>
</div>
<div className="lower">
<div className="img">
<img src={img3} alt=""  width={200} height={200} />
</div>
 <div className="img">
 <img src={img4} alt=""  width={200} height={200} />
 </div>
</div>
</div>
        </div>
      </div>
    </>
  )
}

export default Banner
