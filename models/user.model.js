import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"; // import bcrypt for password hashing

// user schema definition
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user to the database
UserSchema.pre("save", async function (next) {
  // If the password is not modified, skip hashing
  // This is useful for avoiding unnecessary hashing on updates where the password remains unchanged
  if (!this.isModified("password")) return next();
  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);
  // Proceed to the next middleware or save operation
  next();
});

// Method to compare the password with the hashed password in the database
UserSchema.methods.comparePassword = function (password) {
  // Use bcrypt to compare the provided password with the stored hashed password
  return bcrypt.compare(password, this.password);
};

// Method to convert the user object to JSON, excluding the password field before 
// sending it to the client
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};  

export default model("User", UserSchema);
