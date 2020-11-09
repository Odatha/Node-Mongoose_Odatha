const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

connect.then((db) => {
  console.log("Connected correctly to the server");

  Dishes.create({
    name: "Pizza_Creamy_Vegez",
    description: "test",
  })
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: { description: "Updated tese" },
        },
        {
          new: true,
        }
      ).exec();
    })
    .then((dish) => {
      console.log(dish);
      dish.comments.push({
        rating: 5,
        comment: "I'm having good expereince",
        author: "Od writes",
      });
      return dish.save();
    })
    .then((dish) => {
      console.log(dish);
      return Dishes.deleteOne({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
