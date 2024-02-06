require('dotenv').config();

// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();
const path = require('path')
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

// Express using json - DO NOT MODIFY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    keys: ['doihjsaiuhdasdpiasjui']
}));

app.use(authRouter);  

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));






// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));