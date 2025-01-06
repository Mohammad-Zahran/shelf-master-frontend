import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const ReviewPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    name: '',
    email: user ? user.email : '',
    rating: '',
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        title: 'Please login to submit a review',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      Swal.fire({
        title: 'Invalid Rating',
        text: 'Please provide a rating between 1 and 5.',
        icon: 'error',
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/testimonials', reviewData);
      console.log('Review added:', response.data);
      Swal.fire({
        title: 'Review Added!',
        text: 'Your review has been successfully added.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true
      });
      setReviewData({
        name: '',
        email: user ? user.email : '',
        rating: '',
        comment: ''
      });
    } catch (error) {
      console.error('Error adding review:', error.response.data);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add review. Please try again later.',
        icon: 'error',
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Add a Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" value={reviewData.name} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={reviewData.email} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required disabled={user ? true : false} />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
          <input type="number" id="rating" name="rating" value={reviewData.rating} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" min="1" max="5" required />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea id="comment" name="comment" value={reviewData.comment} onChange={handleInputChange} rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required></textarea>
        </div>
        <div className="flex justify-center mt-3">
          <button
            type="submit"
            className="btn bg-green text-white w-48"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewPage;
