import app from "./app.js";
import { connectToMongoDB } from "./database/connection.js";

// Connect to Mongo DB database
connectToMongoDB()
  .then(() => {
    app.listen(5000, () => {
      console.log(`App listening on http://localhost:5000`);
    });
  })
  .catch((error) => console.log(error));
