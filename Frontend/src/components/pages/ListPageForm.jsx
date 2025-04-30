// src/components/ListPageForm.jsx
import { useState } from 'react';
import { connectWallet, createAndListProperty } from '../../utils/web3functions';
import Button from '../common/Button';
import { PinataSDK } from 'pinata';

// ——— Define your gateway string up front ———
const rawGateway = import.meta.env.VITE_GATEWAY_URL;
const gateway = rawGateway.startsWith('http')
  ? rawGateway
  : `https://${rawGateway}`;

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,   // put your JWT in .env
  pinataGateway: gateway,                       // full URL now
});

export default function ListPageForm() {
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
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    if (f && f.size > 100 * 1024) {
      alert('File must be <100KB');
      return;
    }
    setFile(f);
  };

  const handleUploadImage = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
    try {
      setUploadStatus('Uploading…');
      const { cid } = await pinata.upload.public.file(file);

      // build a proper string URL
      const ipfsLink = `${gateway}/ipfs/${cid}`;

      setFormData((p) => ({ ...p, tokenURI: ipfsLink }));
      setUploadStatus('Image uploaded!');
    } catch (err) {
      console.error(err);
      setUploadStatus('Upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tokenURI) {
      alert('Upload image first');
      return;
    }
    setLoading(true);
    try {
      const { account, contract } = await connectWallet();
      const result = await createAndListProperty(formData, account, contract);
      alert(`Property listed with ID: ${result.propertyId}`);
    } catch (err) {
      console.error(err);
      alert('Listing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>List Property</h2>

      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
        required
      />

      <input
        type="number"
        name="area"
        value={formData.area}
        onChange={handleChange}
        placeholder="Area (sq ft)"
        required
      />

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button type="button" onClick={handleUploadImage} disabled={!file}>
        {uploadStatus || 'Upload Image'}
      </Button>

      <select
        name="tagIndex"
        value={formData.tagIndex}
        onChange={handleChange}
        required
      >
        <option value={0}>Beachside</option>
        <option value={1}>Luxury</option>
        <option value={2}>Rooftop</option>
        <option value={3}>Apartment</option>
      </select>

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price (Wei)"
        required
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Listing…' : 'List Property'}
      </Button>
    </form>
  );
}
