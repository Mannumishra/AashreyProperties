import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProperty = () => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        category: '',
        price: 0,
        areaSize: '',
        bedrooms: 0,
        bathrooms: 0,
        yearBuilt: 0,
        location: '',  // ID reference for location
        mapLink: '',
        vendor: '',  // ID reference for vendor (to be set from sessionStorage)
        status: 'Pending',
        state: '',
        locality: '',
        images: []   // Store image files directly
    });

    const [locations, setLocations] = useState([]);
    const [propertyCategory, setPropertyCategory] = useState([]);
    const [propertyType, setPropertyType] = useState([]);
    const [currentState, setCurrentState] = useState('');
    const [currentLocality, setCurrentLocality] = useState('');
    const [isLoading, setIsloding] = useState(false);


    const navigate = useNavigate();
    


    const fetchPropertyCategories = async () => {
        try {
            const response = await axios.get(`https://api.aashreyrealtors.com/api/v1/get-property-category`);
            if (response.data.success) {
                setPropertyCategory(response.data.data);
            } else {
                toast.error('Failed to load locations');
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
            toast.error('An error occurred while fetching locations');
        }
    };
    const fetchPropertyTypes = async () => {
        try {
            const response = await axios.get(`https://api.aashreyrealtors.com/api/v1/properties/types`);
            if (response.data.success) {
                setPropertyType(response.data.data);
            } else {
                toast.error('Failed to load locations');
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
            toast.error('An error occurred while fetching locations');
        }
    };

    // Fetch locations from the API
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`https://api.aashreyrealtors.com/api/v1/get-all-location`);
                if (response.data.success) {
                    setLocations(response.data.data);
                } else {
                    toast.error('Failed to load locations');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
                toast.error('An error occurred while fetching locations');
            }
        };

        fetchLocations();
        fetchPropertyCategories();
        fetchPropertyTypes();

        // Get vendor ID from sessionStorage
        const user = JSON.parse(sessionStorage.getItem('hansBuilderUser'));
        if (user && user._id) {
            setFormData(prevState => ({ ...prevState, vendor: user._id }));
        } else {
            toast.error('Vendor ID not found in session storage');
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleStateChange = (state) => {
        setCurrentState(state);
        const locality = locations.find(loc => loc.state === state)?.locality || [];
        setCurrentLocality(locality[0] || '');
        const locationId = locations.find(loc => loc.state === state)?._id || '';  // Store the location ID
        setFormData(prevState => ({
            ...prevState,
            state,
            locality: locality[0] || '',
            location: locationId
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevState => ({ ...prevState, images: files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloding(true);
    
        const data = new FormData();
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach(file => {
                    data.append('images', file);
                });
            } else {
                data.append(key, formData[key]);
            }
        }
    
        try {
            const response = await axios.post(`https://api.aashreyrealtors.com/api/v1/create-property`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            toast.success('Property Added Successfully');
            navigate('/profile');
        } catch (error) {
            console.error('There was an error!', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsloding(false);
        }
    };

    // useEffect(()=>{
    //     window.scrollTo({
    //         top:0,
    //         behavior:'smooth'
    //     })
    // })
    
    return (
        <>
            <section className="page__title p_relative">
                <div className="bg-layer parallax-bg" data-parallax="{&quot;y&quot;: 20}" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }}>
                </div>
                <div className="container">
                    <div className="content-box p_relative">
                        <h1 className="title">Add Property</h1>
                        <ul className="bread-crumb">
                            <li><Link to={`/profile`}><span className="icon-icon-16" />Profile</Link></li>
                            <li><span className="icon-57" />Add Property</li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="d-form container my-5">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="title" className="form-label">Property Title</label>
                        <input type="text" onChange={handleInputChange} name="title" value={formData.title} className="form-control" id="title" required />
                    </div>

                    

                    <div className="col-md-4">
                        <label htmlFor="type" className="form-label">Type</label>
                        <select onChange={handleInputChange} name="type" value={formData.type} className="form-select" id="type" required>
                            <option>Select Property Type</option>
                            {propertyType && propertyType.map((type,ind)=>(
                                <option key={ind} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select onChange={handleInputChange} name="category" value={formData.category} className="form-select" id="category" required>
                            <option>Select Property Category</option>
                            {propertyCategory && propertyCategory.map((category)=>(
                                <option value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" onChange={handleInputChange} name="price" value={formData.price} className="form-control" id="price" required />
                    </div>

                    

                    <div className="col">
                        <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                        <input type="number" onChange={handleInputChange} name="bedrooms" value={formData.bedrooms} className="form-control" id="bedrooms" />
                    </div>

                    <div className="col">
                        <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
                        <input type="number" onChange={handleInputChange} name="bathrooms" value={formData.bathrooms} className="form-control" id="bathrooms" />
                    </div>
                    <div className="col-6 col-lg-auto">
                        <label htmlFor="areaSize" className="form-label">Area Size (sq ft)</label>
                        <input type="text" onChange={handleInputChange} name="areaSize" value={formData.areaSize} className="form-control" id="areaSize" required />
                    </div>

                    <div className="col-6 col-lg-auto">
                        <label htmlFor="yearBuilt" className="form-label">Year Built</label>
                        <input type="number" onChange={handleInputChange} name="yearBuilt" value={formData.yearBuilt} className="form-control" id="yearBuilt" />
                    </div>
                    
                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea onChange={handleInputChange} name="description" value={formData.description} className="form-control" id="description" required></textarea>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="state" className="form-label">State</label>
                        <select onChange={(e) => handleStateChange(e.target.value)} name="state" value={currentState} className="form-select" id="state" required>
                            <option value="">Select State</option>
                            {locations.map(loc => (
                                <option key={loc._id} value={loc.state}>{loc.state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="locality" className="form-label">Locality</label>
                        <select onChange={handleInputChange} name="locality" value={formData.locality} className="form-select" id="locality" required>
                            <option value="">Select Locality</option>
                            {locations.find(loc => loc.state === currentState)?.locality.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="images" className="form-label">Images <span className='text-danger'>(Maximum : 4)</span></label>
                        <input type="file" onChange={handleFileChange} name="images" className="form-control" id="images" multiple />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`btn-1 ${isLoading ? 'not-allowed':'allowed'}`} >{isLoading ? "Please Wait..." : "Add Property"}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddProperty