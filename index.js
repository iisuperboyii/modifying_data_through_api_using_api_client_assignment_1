const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('./schema');
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(express.static('static'));


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.post('/menu', async (req, res) => {
  const { name, description, price } = req.body;
  const menuItem = new MenuItem({ name, description, price });

  try {
    const savedItem = await menuItem.save();
    res.status(201).json({ message: 'Menu item created', item: savedItem });
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error });
  }
});

app.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
