if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const moviesRouter = require('./movies/moviesRouter')
const reviewsRouter = require('./reviews/reviewsRouter')
const theatersRouter = require('./theaters/theatersRouter')


app.use(express.json());
app.use(cors());
app.use('/movies',moviesRouter)
app.use('/reviews',reviewsRouter)
app.use('/theaters',theatersRouter)

app.use((request, _response, next) => {
  next({ status: 404, message: `Not found: ${request.originalUrl}` });
});

// Error handler
app.use((error, _request, response, _next) => {
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
});
module.exports = app;
