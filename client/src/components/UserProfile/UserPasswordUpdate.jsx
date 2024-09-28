import React, { useState } from 'react';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const UserPasswordUpdate = () => {

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const {currentPassword,newPassword,confirmPassword} = userInfo;
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation password do not match.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        // Reauthenticate the user before updating password
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Update the password
        await updatePassword(user, newPassword);
        setMessage('Password updated successfully.');
        toast.success('Password updated successfully.');
        
            
        setUserInfo({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
   
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full flex flex-col p-4 md:p-16 items-center bg-white">
          <h1 className="text-2xl font-semibold text-blue-400 hidden md:block">
            Change Password
          </h1>
          {/* Form container */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col mt-10 space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
              {/* old password */}
              <label htmlFor="name" className="flex flex-col w-full">
                <span className="mb-2 text-base font-medium text-gray-700">
                  Old Password <span className="text-red-500">*</span>
                </span>
                <input
                  onChange={handleChange}
                  name="currentPassword"  
                  type="password"
                  value={userInfo.currentPassword}
                  className="border-gray-300 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your old password"
                />
              </label>

              {/* new password */}
              <label htmlFor="phone" className="flex flex-col w-full">
                <span className="mb-2 text-base font-medium text-gray-700">
                  New Password <span className="text-red-500">*</span>
                </span>
                <input
                  onChange={handleChange}
                  name="newPassword"
                  type="password"
                  value={userInfo.newPassword}
                  className="border-gray-300 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your new password"
                />
              </label>
            </div>
            {/* confirm new password */}
            <label htmlFor="email" className="flex flex-col w-full md:w-1/2">
              <span className="mb-2 text-base font-medium text-gray-700">
                Confirm New Password <span className="text-red-500">*</span>
              </span>
              <input
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                value={userInfo.confirmPassword}
                className="border-gray-300 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your confirm new password"
                required
              />
            </label>
          <button  type="submit" className="bg-blue-500 md:w-40 md:m-auto p-4 text-base text-white font-semibold mt-10 rounded-lg hover:bg-blue-600 transition duration-300">
            Update Password
          </button>
          </form>
          {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
  );
};

export default UserPasswordUpdate;
