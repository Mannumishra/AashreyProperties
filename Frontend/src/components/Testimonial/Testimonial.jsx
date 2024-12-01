import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';

const testimonials = [
    {
        id: 1,
        image: 'https://avatars.githubusercontent.com/u/138967484?v=4',
        name: 'Harsh Vardhan Mishra',
        position: 'Home Buyer',
        review: 'Aashrey Realtors made the home-buying process seamless and stress-free. From finding the perfect property to finalizing the sale, their team was professional and attentive to every detail.',
        rating: 5.0
    },
    {
        id: 2,
        image: 'https://avatars.githubusercontent.com/u/145193630?v=4',
        name: 'Mannu Sharma',
        position: 'Rental Client',
        review: 'Finding a rental property was never this easy! Aashrey Realtors offered a wide range of options, and their team ensured a smooth and hassle-free renting experience.',
        rating: 4.8
    },
    {
        id: 3,
        image: 'https://avatars.githubusercontent.com/u/89571620?v=4',
        name: 'Gourav Panchal',
        position: 'Investor',
        review: 'I recently purchased a property through Aashrey Realtors, and the experience was excellent. Their expertise in the market helped me make a smart investment with confidence.',
        rating: 4.9
    },
    {
        id: 4,
        image: 'https://avatars.githubusercontent.com/u/90000000?v=4',
        name: 'Simran Kaur',
        position: 'Seller',
        review: 'Selling my home was effortless with Aashrey Realtors. They handled everything professionally, and I got the best deal in no time. Highly recommend them!',
        rating: 5.0
    },
    {
        id: 5,
        image: 'https://avatars.githubusercontent.com/u/80000000?v=4',
        name: 'Rohit Verma',
        position: 'Tenant',
        review: 'Renting a property through Aashrey Realtors was a pleasant experience. The team was very responsive and made sure all my requirements were met.',
        rating: 4.7
    }
];



const Testimonial = () => {
    return (
        <>
            <section className="testimonial__section see__pad p_relative">
                <div className="layer__bg">
                    <div className="anim-icon">
                        <div data-parallax="{&quot;x&quot;: -200}" className="icon layer-bg" style={{ backgroundImage: 'url(assets/images/shape/shape-04.png)' }} />
                    </div>
                    <div className="container">
                        <div className="sec-title text-center">
                            <div className="sub__title">
                                <span>Our Testimonial</span>
                            </div>
                            <h2>What Our Client <span> Says </span> </h2>
                        </div>
                        <OwlCarousel 
                            className="testimonial-carousel owl-theme" 
                            loop 
                            margin={10} 
                            nav 
                            items={3} 
                            dots={false} 
                            autoplay
                            autoplayTimeout={3000}
                            responsive={{
                                0: { items: 1 },
                                600: { items: 2 },
                                1000: { items: 3 }
                            }}
                        >
                            {testimonials.map(testimonial => (
                                <div key={testimonial.id} className="testimonial__block">
                                    <div className="inner__box">
                                        <div className="image__box">
                                            <figure className="image">
                                                <img src={testimonial.image} alt={testimonial.name} />
                                            </figure>
                                        </div>
                                        <div className="review">
                                            <ul>
                                                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                                                    <li key={i}><span className="icon-icon-43" /></li>
                                                ))}
                                                <li><span>{testimonial.rating.toFixed(1)}</span></li>
                                            </ul>
                                        </div>
                                        <div className="test__monial__text">
                                            <p>{testimonial.review}</p>
                                        </div>
                                        <div className="t__title">
                                            <h5>{testimonial.name}</h5>
                                            <p>{testimonial.position}</p>
                                        </div>
                                        <div className="icon__outer">
                                            <span className="icon-quote" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Testimonial;
