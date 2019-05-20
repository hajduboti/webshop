var bcrypt = require("bcrypt");

bcrypt.hash("2123123123", 12).then(hash =>{
  console.log(hash);
});