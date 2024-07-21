const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
 let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  return userswithsamename.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
 let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validusers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken, username
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }  
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
   // Extract email parameter and find users with matching email
    const isbn = req.params.isbn
    const review=req.param.reviews
    let filtered_books = Object.values(books).filter((book) => book.isbn === isbn);
    
    if (filtered_books.length > 0) {
        // Select the first matching user and update attributes if provided
        let filtered_book = filtered_books[0];
        
       filtered_book.array.forEach(book => {
        book.review=review
       });
        
        // Replace old user entry with updated user
        books = books.filter((book) => book.isbn != isbn);
        books.push(filtered_books);
        
        // Send success message indicating the user has been updated
        res.send(`Book with the name ${name} updated.`);
    } else {
        // Send error message if no user found
        res.send("Unable to find user!");
    }
  
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
