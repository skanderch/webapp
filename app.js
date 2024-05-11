const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use EJS as the template engine
app.set('view engine', 'ejs');

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Custom middleware to verify the time of the request
function checkWorkingHours(req, res, next) {
    const currentDay = new Date().getDay();
    const currentHour = new Date().getHours();
  
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour <= 17) {
      next();
    } else {
      res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
  }
  
  // Apply the custom middleware to all routes
  app.use(checkWorkingHours);

// Define the routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});