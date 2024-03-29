// 1. To Do install express and axios
import express from "express";
import axios from "axios";

// 2. Create an express app and set the port number.
const app = express();
const port = process.env.PORT || 3030;

// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async(req,res)=> {
    try {
        const result = await axios.get("https://secrets-api.appbrewery.com/random");
        res.render("index.ejs", {
            secret : result.data.secret,
            user: result.data.username,
        });
    } catch (error) {
        console.log(error.result.data);   //for developer (debug it)
        res.status(500);   //for client (server error)
    }
});

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.


// 6. Listen on your predefined port and start the server.
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}.`); 
});
