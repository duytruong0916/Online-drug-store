const fs = require("fs");
const fastcsv = require("fast-csv");
var bcrypt = require("bcryptjs");
const User = require("./models/user");
const Product = require("./models/product");

// IMPORT DATA FROM MOCK_DATA FILE
exports.importData = filename => {
  if (!filename) {
    return "FILE NOT FOUND";
  }
  let stream = fs.createReadStream(filename);
  let csv_user_data = [];
  let csv_product_data = [];
  let csvStream = fastcsv
    .parse()
    .on("data", data => {
      csv_user_data.push({
        first_name: data[0],
        last_name: data[1],
        email: data[2],
        password: data[3],
        gender: data[4],
        phoneNumber: data[5],
        creditCardNumber: data[6]
      });
      csv_product_data.push({
        drugName: data[7],
        drugCompany: data[8],
        price: data[9],
        image: data[10],
        stock: data[11],
        drugCode: data[12]
      });
    })
    .on("end", () => {
      // remove the first line: header
      csv_user_data.shift();
      csv_product_data.shift();
      csv_product_data.forEach(product => {
        let newproduct = new Product(product);
        newproduct
          .save((err)=>{
            if(err){
              return console.log("FAILED TO SAVE PRODUCT");
            }
            console.log("SAVED!")
          })
      });
      csv_user_data.forEach(user => {
        let newuser = new User(user);
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newuser.password, salt, (err, hash) => {
            if (err) console.log(err);
            newuser.password = hash;
            newuser
            .save((err)=>{
              if(err){
                return console.log("FAILED TO SAVE PRODUCT");
              }
              console.log("SAVED!")
            });
          });
        });
      });
    });
  stream.pipe(csvStream);
};
