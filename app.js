/**
 * Main application file.
 * 
 * NOTE: This file contains many required packages, but not all of them - you may need to add more!
 */

// Setup Express
const express = require("express");
const app = express();
const port = 3000;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine(
    'handlebars',
    handlebars({
        helpers: {
            ifEq: function (a, b, options) {
                if (a == b) {
                    return options.fn(this);
                }
                return options.inverse(this);
            },
        },
        defaultLayout: 'main',
    })
);
app.set("view engine", "handlebars");

// Setup body-parser
app.use(express.urlencoded({ extended: false }));

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

//set up tiny 
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Setup middleware
app.use(require("./middleware/toaster-middleware.js"));
const { addUserToLocals } = require('./middleware/auth-middleware.js');
app.use(addUserToLocals);

// Setup routes
app.use(require("./routes/application-routes.js"));
app.use(require('./routes/auth-routes.js'));
app.use(require('./routes/account-routes.js'));
app.use(require('./routes/article-routes.js'));

// Start the server running.
app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});
