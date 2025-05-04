import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import Swal from 'sweetalert2';

const imageHostingKey = import.meta.env.VITE_IMAGEHOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

export default function EditProfile() {
  const { id } = useParams();
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axiosPublic.get(`/users/profileById/${id}`).then(res => {
      setProfile(res.data);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Change 'PATCH' to 'PUT'
        const res = await axiosPublic.put(`/users/update/${id}`, profile); 
        if (res.data.success) {
            Swal.fire('Success!', 'Profile updated successfully.', 'success');
            navigate('/dashboard/user-profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        Swal.fire('Error', 'Something went wrong.', 'error');
    }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = res.data;
      const imageUrl = data.data.url;

      setProfile({ ...profile, photo: imageUrl });

      Swal.fire('Uploaded!', 'Photo uploaded successfully.', 'success');
    } catch (err) {
      Swal.fire('Error', 'Photo upload failed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto py-10">
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Upload New Photo</label>
        <input
          type="file"
          name="photo"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded"
        />
        {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
        {profile.photo && (
          <img src={profile.photo} alt="Profile" className="w-20 h-20 mt-2 rounded-full" />
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Role</label>
        <input
          type="text"
          name="role"
          value={profile.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-teal-900 text-white py-2 rounded hover:bg-teal-700"
      >
        {uploading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
