const mongoose = require('mongoose');

const app = require('./app');
const mongoUrl = process.env.DB_MONGO_URL.replace('<KEY>', 'immfAdeLhAHHB0DW');

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, tls: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
