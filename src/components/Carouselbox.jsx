import React from 'react';
/* import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit'; */
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './Home.css'

export default function Carouselbox(props) {
  return (

   
    <Carousel 
  data-bs-theme="dark" 
  className="transition-all duration-150 ease-in-out hover:scale-105 "

>
      
    <Carousel.Item>
    <Link to='/fresh'>
      <img
        className="d-block h-64 md:h-96 w-100 transition-all "
        src="https://img.wynk.in/unsafe/880x307/filters:no_upscale():strip_exif():format(webp)/https://s3.ap-south-1.amazonaws.com/discovery-prod-arsenal/tile/artwork/1720695684876_1720110189917_full-album-featuredbanner_(7).jpg"
        alt="First slide"
      />
       </Link>
      <Carousel.Caption>
        <h5 className='font text-black' >Fresh Arrival</h5>
        <p></p>
      </Carousel.Caption>
    </Carousel.Item>


    <Carousel.Item>
    <Link to='/hitsong'> <img
        className="d-block h-64 md:h-96 w-100" 
        src="https://img.wynk.in/unsafe/880x307/filters:no_upscale():strip_exif():format(webp)/https://s3.ap-south-1.amazonaws.com/discovery-prod-arsenal/arsenal/artworks/65a68ec7ed7dad04b5a74e4e/BANNER_94879319150057.png"
        alt="Second slide"
      />
       </Link>
      <Carousel.Caption>
        <h5 className='font text-stone-800'>Hit</h5>
        <p></p>
      </Carousel.Caption>
    </Carousel.Item>
   

    <Carousel.Item>
      <Link to='/trending'>
      <img
        className="d-block h-64 md:h-96 w-100"
        src="https://img.wynk.in/unsafe/880x307/filters:no_upscale():strip_exif():format(webp)/https://s3.ap-south-1.amazonaws.com/discovery-prod-arsenal/tile/artwork/1721898802285_hindi-full-album-featuredbanner_(1).jpg"
        alt="Third slide"
      />
      </Link>
      <Carousel.Caption>
        <h5 className='font'>Trending</h5>
        <p>
         
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}