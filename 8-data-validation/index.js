const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Connecting to MongoDB
 */
mongoose
  .connect("mongodb://0.0.0.0:27017/8_data_validation")
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log(err));

/**
 * Creating a Schema
 */
const courseSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 240
    // match: /pattern/
  },
  category: {
    type: String,
    enum: ["web", "desktop", "mobile"],
    lowercase: true,
    // uppercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: "SYNC: A course should have at least one tag."
    }
    // validate: {
    //   isAsync: true,
    //   validator: (v, callback) => {
    //     setTimeout(() => {
    //       callback(v && v.length > 0);
    //     }, 1000);
    //   },
    //   message: "ASYNC: A course should have at least one tag."
    // }
  },
  date: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v), // changes the value when retrieving from DB
    set: v => Math.round(v) // changes the value when saving to DB
  },
  isPublished: Boolean
});

/**
 * Compiling a model
 */

const Course = mongoose.model("Course", courseSchema);

/**
 * Creating documents
 */

async function createCourse(courseObject) {
  try {
    const course = new Course(courseObject);
    const result = await course.save();
    console.log(result);
  } catch (exception) {
    // console.log(exception.message);
    // console.log(exception.errors);

    for (error in exception.errors) {
      console.log("Error:", exception.errors[error].message);
    }
  }
}

createCourse({
  name: "Node.js Course",
  category: "-",
  author: "Pedro Britto",
  // tags: ["node.js"],
  isPublished: true,
  price: 10
});
