import { useState } from 'react';
import { connectWallet, createAndListProperty } from '../../utils/web3functions';
import Button from '../common/Button';
import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
  pinataJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MDQ4NTM5Ni0yMmRlLTQ0NzEtOWI5My04ZGJiNTk5ZTQyY2MiLCJlbWFpbCI6Im1lMjMwMDAzMDcwQGlpdGkuYWMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2JhODJlNzA0OTA3NDk0OTgwZWEiLCJzY29wZWRLZXlTZWNyZXQiOiJkYjY3ZDI4ZDcxYTRkMDAwN2MwNDMzNmFkZGVlODQ1ZDU4YWY0ZGFjODZiYTI4NTQ1YWE3MTQ0ZTIwY2ExMmYzIiwiZXhwIjoxNzc3NDk0OTc3fQ.K66caUuj0v2zvQnXlmrB9EwB4WTOu3VumHHv8-EYA3Y', // 🔐 Replace this with your actual JWT token
  pinataGateway:  import.meta.env.VITE_GATEWAY_URL,
});

function ListPageForm() {
  const [formData, setFormData] = useState({
    location: '',
    name: '',
    description: '',
    area: '',
    tokenURI: '',
    tagIndex: 0,
    price: '0',
  });

  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile.size / 1024 > 100) {
      alert('File must be <100KB');
      return;
    }
    setFile(selectedFile);
  };

  const handleUploadImage = async () => {
    if (!file) return alert('Please select a file');

    try {
      setUploadStatus('Uploading...');
      const upload = await pinata.upload.public.file(file);
      const ipfsLink = await pinata.gateways.public.convert(upload.cid);
      setFormData((prev) => ({ ...prev, tokenURI: ipfsLink }));
      setUploadStatus('Image uploaded!');
    } catch (err) {
      console.error(err);
      setUploadStatus('Upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tokenURI) return alert('Upload image first');
    setLoading(true);
    try {
      const { account, contract } = await connectWallet();
      const result = await createAndListProperty(formData, account, contract);
      alert(`Property listed with ID: ${result.propertyId}`);
    } catch (err) {
      console.error(err);
      alert('Listing failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>List Property</h2>
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} required />
      <input type="number" name="area" value={formData.area} onChange={handleChange} placeholder="Area (sq ft)" required />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button type="button" onClick={handleUploadImage} disabled={!file}>{uploadStatus || 'Upload Image'}</Button>
      <input type="number" name="tagIndex" value={formData.tagIndex} onChange={handleChange} placeholder="Tag Index" required />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (Wei)" required />
      <Button type="submit" disabled={loading}>{loading ? 'Listing...' : 'List Property'}</Button>
    </form>
  );
}

export default ListPageForm;
