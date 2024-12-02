import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllQuery = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 10; // Items per page

    // Fetch all data from the API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/get-popup`);
            setUsers(res.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate total pages
    const totalPages = Math.ceil(users.length / limit);

    // Get current page data
    const currentUsers = users.slice((currentPage - 1) * limit, currentPage * limit);

    // Navigate to the next or previous page
    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Delete user
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/deletepopup/${id}`);
            if (res.status === 200) {
                setUsers(users.filter((user) => user._id !== id));
                Swal.fire({
                    title: 'Success!',
                    text: 'Your query has been delete successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                  });
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user');
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Users</h4>
                </div>
            </div>

            <section className="dis-table">
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Looking For</th>
                                <th scope="col">Message</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            ) : currentUsers.length > 0 ? (
                                currentUsers.map((user, index) => (
                                    <tr key={user._id}>
                                        <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.lookingfor}</td>
                                        <td>{user.message}</td>
                                        <td>{new Date(user.createdAt).toLocaleString()}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="pagination mt-3 d-flex justify-content-center">
                    <button
                        className="btn btn-primary me-2"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange('prev')}
                    >
                        Previous
                    </button>
                    <span className="align-self-center">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="btn btn-primary ms-2"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange('next')}
                    >
                        Next
                    </button>
                </div>
            </section>
        </>
    );
};

export default AllQuery;
