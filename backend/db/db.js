const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://gofood:12345@cluster0.sa7byp1.mongodb.net/gofood"


const db = async (err, result) => {

    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, })

    if (err) {
        console.log("error");
    }
    else {
        console.log('Connected to MongoDB');
        const fetched_data = await mongoose.connection.db.collection("food_items");
        global.food_items = await fetched_data.find().toArray()
        const foodcategory=  await mongoose.connection.db.collection("foodcategory");
        global.foodcategory = await foodcategory.find().toArray()
        
        
        // console.log(global.food_items);

        // console.log(fetched_data);
    }
}

module.exports = db;