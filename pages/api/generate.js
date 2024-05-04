import Replicate from 'replicate';
// import dotenv from 'dotenv';

// dotenv.config();

export default async function handler(req, res) {

  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: 'Text parameter is required.' });
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
    userAgent: 'https://www.npmjs.com/package/create-replicate'
  });

  try {

    console.log('Generating image...');
    const output = await replicate.run(
      "kuprel/min-dalle:2af375da21c5b824a84e1c459f45b69a117ec8649c2aa974112d7cf1840fc0ce",
      {
        input: {
          text,
          top_k: 128,
          seamless: false,
          grid_size: 1,
          save_as_png: false,
          temperature: 1,
          progressive_outputs: false,
          supercondition_factor: 16
        }
      }
    );

    res.status(200).json({ output });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while generating the image.' });
  }
}
