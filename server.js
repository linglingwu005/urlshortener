// server.js - Main application file
const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// URL Schema
const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  customCode: {
    type: String,
    unique: true,
    sparse: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Url = mongoose.model('Url', urlSchema);

// Routes

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Create short URL
app.post('/shorten', async (req, res) => {
  const { longUrl, customCode } = req.body;
  
  // Validate URL
  try {
    new URL(longUrl);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  
  try {
    // Check if custom code is provided
    if (customCode) {
      // Check if custom code already exists
      const existingUrl = await Url.findOne({ customCode });
      if (existingUrl) {
        return res.status(400).json({ error: 'Custom code already in use' });
      }
      
      const url = new Url({
        longUrl,
        shortCode: shortid.generate(),
        customCode
      });
      
      await url.save();
      return res.json({ 
        shortUrl: `${req.protocol}://${req.get('host')}/${url.customCode}`,
        stats: `${req.protocol}://${req.get('host')}/stats/${url.customCode}`
      });
    }
    
    // Generate a random short code
    const shortCode = shortid.generate();
    const url = new Url({
      longUrl,
      shortCode
    });
    
    await url.save();
    return res.json({ 
      shortUrl: `${req.protocol}://${req.get('host')}/${url.shortCode}`,
      stats: `${req.protocol}://${req.get('host')}/stats/${url.shortCode}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Redirect to original URL
app.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    // Try to find by custom code first
    let url = await Url.findOne({ customCode: code });
    
    // If not found, try to find by short code
    if (!url) {
      url = await Url.findOne({ shortCode: code });
    }
    
    if (!url) {
      return res.status(404).render('404');
    }
    
    // Increment click count
    url.clicks++;
    await url.save();
    
    return res.redirect(url.longUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get URL stats
app.get('/stats/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    // Try to find by custom code first
    let url = await Url.findOne({ customCode: code });
    
    // If not found, try to find by short code
    if (!url) {
      url = await Url.findOne({ shortCode: code });
    }
    
    if (!url) {
      return res.status(404).render('404');
    }
    
    res.render('stats', { url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
