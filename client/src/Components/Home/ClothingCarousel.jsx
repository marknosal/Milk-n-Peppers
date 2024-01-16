import React from "react";
import { Image } from "semantic-ui-react";
import Slider from "react-slick";
import "../../index.css"
import { useNavigate } from "react-router-dom";

export default function ClothingCarousel({ images }) {
    const navigate = useNavigate()

    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    }

    const carouselItems = images.map((img, index) => (
        <div key={index}>
            <Image 
                src={img.image_path} 
                size='small' 
                onClick={() => handleClick(img.clothing_id)} 
                rounded 
            /> 
        </div>
    ))

    function handleClick(expandId) {
        navigate(`/clothes?expand=${expandId}`)
    }
    

    return (
        <Slider {...settings}>
            {carouselItems}
        </Slider>
    );
}