import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const EditProperty = () => {
    const { id } = useParams(); // Property ID from URL
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'Rent',
        category: 'Floor',
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
        locality: ''
    });

    const [locations, setLocations] = useState([]);
    const [propertyCategory, setPropertyCategory] = useState([]);
    const [propertyType, setPropertyType] = useState([]);
    const [currentState, setCurrentState] = useState('');
    const [currentLocality, setCurrentLocality] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/get-property-by-id/${id}`);
                if (response.data.success) {
                    const property = response.data.data;
                    setFormData({
                        title: property.title,
                        description: property.description,
                        type: property.type,
                        category: property.category,
                        price: property.price,
                        areaSize: property.areaSize,
                        bedrooms: property.bedrooms,
                        bathrooms: property.bathrooms,
                        yearBuilt: property.yearBuilt,
                        location: property.location, // Assuming location ID is stored
                        mapLink: property.mapLink,
                        vendor: property.vendor,
                        status: property.status,
                        state: property.state,
                        locality: property.locality
                    });
                    setCurrentState(property.state);
                    setCurrentLocality(property.locality);
                } else {
                    toast.error('Failed to load property details');
                }
            } catch (error) {
                console.error('Error fetching property details:', error);
                toast.error('An error occurred while fetching property details');
            }
        };

        const fetchLocations = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/get-all-location`);
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

        const fetchPropertyCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/get-property-category`);
                if (response.data.success) {
                    setPropertyCategory(response.data.data);
                } else {
                    toast.error('Failed to load property categories');
                }
            } catch (error) {
                console.error('Error fetching property categories:', error);
                toast.error('An error occurred while fetching property categories');
            }
        };

        const fetchPropertyTypes = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/properties/types`);
                if (response.data.success) {
                    setPropertyType(response.data.data);
                } else {
                    toast.error('Failed to load property types');
                }
            } catch (error) {
                console.error('Error fetching property types:', error);
                toast.error('An error occurred while fetching property types');
            }
        };

        fetchPropertyDetails();
        fetchLocations();
        fetchPropertyCategories();
        fetchPropertyTypes();
    }, [id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.put(`http://localhost:8000/api/v1/update-property/${id}`, formData);
            toast.success('Property updated successfully');
            navigate('/all-properties');
        } catch (error) {
            console.error('There was an error!', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    if(!locations){
        return "Loading..";
    }

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Property</h4>
                </div>
                <div className="links">
                    <Link to="/all-properties" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="title" className="form-label">Property Title</label>
                        <input type="text" onChange={handleInputChange} name="title" value={formData.title} className="form-control" id="title" required />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea onChange={handleInputChange} name="description" value={formData.description} className="form-control" id="description" required></textarea>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="type" className="form-label">Type</label>
                        <select onChange={handleInputChange} name="type" value={formData.type} className="form-select" id="type" required>
                            {propertyType && propertyType.map((type, ind) => (
                                <option key={ind} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select onChange={handleInputChange} name="category" value={formData.category} className="form-select" id="category" required>
                            {propertyCategory && propertyCategory.map((category, ind) => (
                                <option key={ind} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" onChange={handleInputChange} name="price" value={formData.price} className="form-control" id="price" required />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="areaSize" className="form-label">Area Size (sq ft)</label>
                        <input type="text" onChange={handleInputChange} name="areaSize" value={formData.areaSize} className="form-control" id="areaSize" required />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                        <input type="number" onChange={handleInputChange} name="bedrooms" value={formData.bedrooms} className="form-control" id="bedrooms" />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
                        <input type="number" onChange={handleInputChange} name="bathrooms" value={formData.bathrooms} className="form-control" id="bathrooms" />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="yearBuilt" className="form-label">Year Built</label>
                        <input type="number" onChange={handleInputChange} name="yearBuilt" value={formData.yearBuilt} className="form-control" id="yearBuilt" />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="state" className="form-label">State</label>
                        <select onChange={(e) => handleStateChange(e.target.value)} name="state" value={currentState} className="form-select" id="state" required>
                            <option value="">Select State</option>
                            {locations && [...new Set(locations.map(location => location.state))].map((state, ind) => (
                                <option key={ind} value={state}>{state}</option>
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
                        <label htmlFor="status" className="form-label">Status</label>
                        <select onChange={handleInputChange} name="status" value={formData.status} className="form-select" id="status" required>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="col-12 text-end">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Property'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProperty;
