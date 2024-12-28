import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PaymentForm() {
  const [unpaidStudents, setUnpaidStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnpaidStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5001/unpaid-fees');
        setUnpaidStudents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching unpaid students:', err);
        setLoading(false);
      }
    };

    fetchUnpaidStudents();
  }, []);

  const handlePayment = async (userId) => {
    try {
      const response = await axios.post('http://localhost:5001/pay-fee', { userId });
      if (response.status === 200) {
        alert('Payment successful');
        setUnpaidStudents(unpaidStudents.filter(student => student.id !== userId)); // Update the list of unpaid students
      }
    } catch (err) {
      alert('Payment failed');
    }
  };

  return (
    <div className="payment-form-container">
      <div className="payment-box bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Pay Now Button for Current User */}
        {unpaidStudents.length > 0 && (
          <div className="current-user-section mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pay Fee</h2>
            <p className="text-xl font-semibold text-gray-700">Fee Amount: 1000</p>
            <button
              type="button"
              className="w-full p-3 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
              onClick={() => handlePayment(unpaidStudents[0].id)} // Pass the current user's ID
            >
              Pay Now
            </button>
          </div>
        )}

        {/* Unpaid Students List Section */}
        {loading ? (
          <p className="text-center text-gray-700">Loading unpaid student data...</p>
        ) : (
          <div className="unpaid-students-list mt-6 max-h-64 overflow-y-scroll">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Other Unpaid Students</h3>
            {unpaidStudents.length > 0 ? (
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-gray-700 border-b">Student Name</th>
                    <th className="px-4 py-2 text-gray-700 border-b">Outstanding Dues</th>
                  </tr>
                </thead>
                <tbody>
                  {unpaidStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-4 py-2 border-b text-gray-800">{student.name}</td>
                      <td className="px-4 py-2 border-b text-gray-800">1000</td>
                      <td className="px-4 py-2 border-b text-gray-800">
                        {/* Only show Pay Now button for the logged-in user */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-700">No unpaid students found for this month and the previous month.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentForm;
