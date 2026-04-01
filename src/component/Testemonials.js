import React, { memo } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testemonials = memo(() => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 3000,
    };

    const testimonials = [
        {
            name: "Guy Hawkins",
            date: "June 28,2024 04:56 pm",
            rating: 4.5,
            image: "/images/model.png",
            feedback: "One King West offers spacious suites and a great location. The historic charm combined with modern amenities made our stay very enjoyable.",
        },
        {
            name: "Albert Flores",
            date: "June 08, 2024 03:00 pm",
            rating: 4.5,
            image: "/images/model2.png",
            feedback: "Excellent service and well-appointed rooms at One King West. The hotel’s proximity to key attractions in downtown Toronto is a huge plus.",
        },
        {
            name: "Robert Fox",
            date: "June 08, 2024 03:00 pm",
            rating: 4.5,
            image: "/images/model3.png",
            feedback: "Fantastic stay at One King West! The central location is unbeatable, with comfortable rooms and excellent city views. Highly recommend!",
        },
        {
            name: "Guy Hawkins",
            date: "June 28,2024 04:56 pm",
            rating: 4.5,
            image: "/images/model.png",
            feedback: "One King West offers spacious suites and a great location. The historic charm combined with modern amenities made our stay very enjoyable.",
        },
        {
            name: "Albert Flores",
            date: "June 08, 2024 03:00 pm",
            rating: 4.5,
            image: "/images/model2.png",
            feedback: "Excellent service and well-appointed rooms at One King West. The hotel’s proximity to key attractions in downtown Toronto is a huge plus.",
        },
        {
            name: "Robert Fox",
            date: "June 08, 2024 03:00 pm",
            rating: 4.5,
            image: "/images/model3.png",
            feedback: "Fantastic stay at One King West! The central location is unbeatable, with comfortable rooms and excellent city views. Highly recommend!",
        },
    ];

    return (
        <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
                <div className="testimonial-box" key={index}>
                    <div className='main-sell'>
                        <div className='user_row'>
                            <div className='user_image'>
                                <img src={testimonial.image} alt="" />
                            </div>
                            <div className='user_name'>
                                <p className="name">{testimonial.name}</p>
                                <span className="position">{testimonial.date}</span>
                            </div>
                        </div>
                        <div className='rating_sell'>
                            <img src="/images/border-star.png" alt="" />
                            {testimonial.rating}
                        </div>
                    </div>
                    <p>{testimonial.feedback}</p>
                </div>
            ))}
        </Slider>
    );
});

Testemonials.displayName = 'Testemonials';

export default Testemonials;