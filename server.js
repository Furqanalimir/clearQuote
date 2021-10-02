const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors')

//connecting db
connectDB();

app.use(express.json());
app.use(cors())

app.use('/api/user', require('./routes/register'));
app.use('/api/user', require('./routes/login'));
app.use('/api/user', require('./routes/userOperation'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});
