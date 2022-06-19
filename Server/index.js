
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js'

// Initialize express into app
const app = express();

dotenv.config(); // Initialize dotenv


// Setup body-parser so we can properly send requests
app.use(bodyParser.json({ limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}))
app.use(cors())


// Setup Middlewares
app.get('/', (req, res) => {
  res.status(200).json({message: 'This is the home page'})
})

app.use('/posts', postRoutes);


// Connect to database
// https://mongodb.com/cloud/atlas

const PORT = process.env.PORT || 5000; // Heroku generates a customer environment port on deployment

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
  .catch((err) => console.log(err.message));


// mongoose.set('useFindAndModify', false)









