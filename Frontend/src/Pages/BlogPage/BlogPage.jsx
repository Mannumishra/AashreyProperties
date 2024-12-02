import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);

    // Fetch blogs from the API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/get-blogs');
                const data = await response.json();

                if (data.success) {
                    setBlogs(data.data);  // Set the fetched blogs to the state
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <>
            {/* ----- BreadCrumb ---- */}
            <section className="page__title p_relative">
                <div className="bg-layer parallax-bg" data-parallax="{&quot;y&quot;: 20}" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }}></div>
                <div className="container">
                    <div className="content-box p_relative">
                        <h1 className="title">Blog</h1>
                        <ul className="bread-crumb">
                            <li><Link to={`/`}><span className="icon-icon-16" />Home</Link></li>
                            <li><span className="icon-57" />Blog</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="blog__section__two see__pad">
                <div className="container">
                    <div className="row">
                        {blogs.map((item) => (
                            <div className="col-xl-4 col-lg-6 col-md-12 pb-30" key={item._id}>
                                <div className="news__block__one">
                                    <div className="inner-box">
                                        <div className="image-box">
                                            <figure className="image">
                                                <Link to={`/blog/${item._id}`}>
                                                    <img src={item.image} alt={item.blogName}  style={{height:200 }}/>
                                                </Link>
                                            </figure>
                                        </div>
                                        <div className="lower__content">
                                            <div className="author__info">
                                                <ul>
                                                    {/* <li>
                                                        <Link to={``}><span className="icon-icon-22" /> {item.author}</Link>
                                                    </li> */}
                                                    <li>
                                                        <Link to={``}><span className="icon-icon-23" /> {new Date(item.createdAt).toLocaleDateString()}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="news__title">
                                                <h5>{item.blogName}</h5>
                                            </div>
                                            <div className="news__text">
                                                <p>{item.blogDescription.replace(/(<([^>]+)>)/gi, "").substring(0, 100)}...</p>
                                            </div>
                                            {/* <div className="more__btn">
                                                <Link to={`/blog/${item._id}`}>Read More <span className="icon-57" /> </Link>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogPage;
