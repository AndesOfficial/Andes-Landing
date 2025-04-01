import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet-async";
const SocietyForm = () => {
  const [society, setSociety] = useState("");
  const [wingHouseNumber, setWingHouseNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending the form data via an Axios POST request
      await axios.post('/api/submitForm', { society, wingHouseNumber, phoneNumber });

      // Navigate to the homepage after successful submission
      navigate('/');
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      
      // Show toast notification on error
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Andes Laundry - Society Form</title>
        <meta name="description" content="Submit your society details to join Andes Laundry." />
      </Helmet>
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-blue-100">
        <div className="md:w-1/2 w-full p-6 mt-16 md:ml-36">
          <form
            onSubmit={handleSubmit}
            className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 mx-auto"
          >
            <div className="mb-6">
              <label
                htmlFor="society"
                className="block text-lg font-semibold text-gray-700"
              >
                Select your Society here
              </label>
              <select
                id="society"
                value={society}
                onChange={(e) => setSociety(e.target.value)}
                className="mt-2 block w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Select Society
                </option>
                <option value="Society1">Society 1</option>
                <option value="Society2">Society 2</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="wingHouseNumber"
                className="block text-lg font-semibold text-gray-700"
              >
                Wing and House Number
              </label>
              <input
                type="text"
                id="wingHouseNumber"
                value={wingHouseNumber}
                onChange={(e) => setWingHouseNumber(e.target.value)}
                className="mt-2 block w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., B-201"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="phoneNumber"
                className="block text-lg font-semibold text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-2 block w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 1234567890"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 text-lg font-semibold bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="md:w-1/2 w-full flex justify-center items-center p-6 hidden md:block">
          <img
            src="https://via.placeholder.com/500" // Replace with your image URL
            alt="Form Illustration"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        
        {/* Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default SocietyForm;