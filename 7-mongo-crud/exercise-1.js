const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Connecting to MongoDB
 */

mongoose
  .connect("mongodb://0.0.0.0:27017/exercise_1")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

/**
 * Creating a Schema
 */

const courseSchema = Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean
});

/**
 * Compiling a model
 */

const Course = mongoose.model("Course", courseSchema);

/**
 * Querying
 */

async function getCourses() {
  try {
    return await Course.find({ tags: "backend", isPublished: true })
      .sort({ name: 1 })
      .select({ name: 1, author: 1 });
  } catch (err) {
    console.log(err);
  }
}

async function showCourses() {
  try {
    const courses = await getCourses();
    console.log(courses);
  } catch (err) {
    console.log(err);
  }
}
showCourses();
