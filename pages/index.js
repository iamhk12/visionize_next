// components/ImageGeneratorForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageGeneratorForm = () => {
  const [text, setText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/generate?text=${encodeURIComponent(text)}`);
      setImageURL(response.data.output.pop());
    } catch (error) {
      setError('An error occurred while generating the image.');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-semibold mb-8">Generate Image</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter text..."
          className="px-4 py-2 rounded-lg bg-gray-800 text-white outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 rounded-lg text-white font-semibold uppercase tracking-wider transition duration-300 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={loading || text.trim() === ''}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      {imageURL && (
        <div className="mt-8">
          <img src={imageURL} alt="Generated Image" className="w-sm max-w-[85%] rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default function Page(){
  return (
    <ImageGeneratorForm />
  );
};
