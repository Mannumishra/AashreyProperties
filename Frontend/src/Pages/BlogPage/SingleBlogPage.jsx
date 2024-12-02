import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SingleBlogPage = () => {
    const { id } = useParams(); // Extract the blog ID from the URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch single blog by ID
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`https://api.aashreyrealtors.com/api/v1/get-blog/${id}`);
                const data = await response.json();

                if (data.success) {
                    setBlog(data.data); // Set the blog data
                } else {
                    setError('Blog not found!');
                }
            } catch (err) {
                setError('Failed to fetch the blog. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    // Show loading spinner or error message if applicable
    if (loading) {
        return <div className="container text-center"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="container text-center"><p>{error}</p></div>;
    }

    return (
        <>
            {/* ----- BreadCrumb ----- */}
            <section className="page__title p_relative">
                <div className="bg-layer parallax-bg" data-parallax="{&quot;y&quot;: 20}" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }}></div>
                <div className="container">
                    <div className="content-box p_relative">
                        <h1 className="title">Blog Details</h1>
                        <ul className="bread-crumb">
                            <li><Link to={`/`}><span className="icon-icon-16" />Home</Link></li>
                            <li><Link to={`/blog`}><span className="icon-57" />Blog</Link></li>
                            <li><span className="icon-57" />{blog.blogName}</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ----- Blog Details ----- */}
            <section className="blog__section__two see__pad">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="news__block__one">
                                <div className="inner-box">
                                    <div className="image-box text-center">
                                        <img src={blog.image} alt={blog.blogName} style={{ maxWidth: '100%', height: 'auto' }} />
                                    </div>
                                    <div className="lower__content mt-4">
                                        <div className="author__info">
                                            <ul>
                                                <li>
                                                    <span className="icon-icon-23" /> {new Date(blog.createdAt).toLocaleDateString()}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="news__title">
                                            <h2>{blog.blogName}</h2>
                                        </div>
                                        <div className="news__text mt-3">
                                            <div
                                                dangerouslySetInnerHTML={{ __html: blog.blogDescription }}
                                            />
                                        </div>
                                        <div className="back__btn mt-4">
                                            <Link to="/blog" className="btn btn-primary">
                                                Back to Blogs
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SingleBlogPage;
