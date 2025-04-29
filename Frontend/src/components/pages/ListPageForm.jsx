import { useState } from 'react';
import { connectWallet, createAndListProperty } from '../../utils/web3functions';
import Button from '../common/Button';
import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
  pinataJwt: 'YOUR_JWT_HERE',
  pinataGateway: import.meta.env.VITE_GATEWAY_URL,
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

      <label>Location</label>
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />

      <label>Property Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />

      <label>Description</label>
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} required />

      <label>Area (sq ft)</label>
      <input type="number" name="area" value={formData.area} onChange={handleChange} placeholder="Area" required />

      <label>Upload Image (max 100KB)</label>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br></br>
      <Button type="button" onClick={handleUploadImage} disabled={!file}>
        {uploadStatus || 'Upload Image'}
      </Button>
      <br></br>

      <label>Category</label>
      <select name="tagIndex" value={formData.tagIndex} onChange={handleChange} required>
        <option value={0}>Beachside</option>
        <option value={1}>Luxury</option>
        <option value={2}>Rooftop</option>
        <option value={3}>Apartment</option>
      </select>

      <label>Price (in Wei)</label>
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />

      <Button type="submit" disabled={loading}>
        {loading ? 'Listing...' : 'List Property'}
      </Button>
    </form>
  );
}

export default ListPageForm;
