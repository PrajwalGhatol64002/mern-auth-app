import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("You are connected to the database");
  } catch (err) {
    console.error(err);
  }
};

// enabling debug mode
// mongoose.set("debug", true);

// module.exports = connect;
export default connect;
