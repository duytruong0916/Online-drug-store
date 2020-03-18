const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const {importData} = require("./DataImport");  // For data import
require("dotenv").config();

const authRouters = require('./routes/auth');
const userRouters = require('./routes/user');
const productRouters = require('./routes/product');
const orderRouters = require('./routes/order');

//  APPLICATION
const app = express();

// CONNECT TO MONGODB DATABASE AND IMPORT DATA FROM MOCK_DATA FILE
mongoose
  .connect(
    process.env.DATABASE,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Database connected");
    //  IMPORT DATA HERE!!!!!! Already did, so no need to import again
    // importData("../data/MOCK_DATA.csv")
  })
  .catch(err => {
    console.log(err);
  });

// USERFUL MIDDLEWARES
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//ROUTEER MIDDLEWARES
app.use('/api',authRouters);
app.use('/api',userRouters);
app.use('/api',productRouters);
app.use('/api',orderRouters);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
