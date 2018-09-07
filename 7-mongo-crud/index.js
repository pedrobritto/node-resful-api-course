const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Connecting to MongoDB
 */
mongoose
  .connect("mongodb://0.0.0.0:27017/playground")
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
 * Creating documents
 */

// (async () => {
//   const course = new Course({
//     name: "React Course",
//     author: "Camis",
//     tags: ["node", "frontend"],
//     isPublished: true
//   });

//   const result = await course.save();
//   console.log(result);
// })();

/**
 * Querying documents
 */

// (async () => {
//   const courses = await Course.find();
//   console.log(courses);
// })();

/**
 * Querying documents
 * Refined settings
 */

// (async () => {
//   const courses = await Course.find({ isPublished: true })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// })();

/**
 * Querying documents
 * Refined settings
 */

// (async () => {
//   try {
//     const pageNumber = 2;
//     const pageSize = 10;

//     const courses = await Course.find({ isPublished: { $in: [true, false] } })
//       .sort({ name: 1 })
//       .select({ name: 1, tags: 1 })
//       .count();
//     console.log(courses);
//   } catch (err) {
//     console.log(err);
//   }
// })();

/**
 * Update Document - Query First
 */

async function updateCourse(id) {
  try {
    const course = await Course.findById(id);
    if (!course) return;

    const result = await course
      .set({
        isPublished: true,
        author: "Another author"
      })
      .save();

    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

// updateCourse("5b9284c40aaf544bdf06c633");

/**
 * Update document - Update first
 * Updating directly in the DB, without retrieving first
 */

async function updateCourseUpdateFirst(id) {
  try {
    // Update and return changed attributes
    // const updateResult = await Course.update(
    //   { _id: id },
    //   {
    //     $set: {
    //       author: "Pedro",
    //       isPublished: false
    //     }
    //   }
    // );

    // console.log(updateResult);

    // OR:
    // Update and return updated object
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: {
          author: "Pedro",
          isPublished: false
        }
      },
      { new: true }
    );
    console.log(course);
  } catch (err) {
    console.log(err);
  }
}

// updateCourseUpdateFirst("5b9284c40aaf544bdf06c633");

/**
 * Remove Document
 */

async function removeCourse(id) {
  try {
    // const result = await Course.deleteOne({ _id: id });
    // console.log(result);

    const course = await Course.findByIdAndRemove(id);
    console.log(course);
  } catch (err) {
    console.log(err);
  }
}

async function removeUnpublishedCourses() {
  try {
    const result = await Course.deleteMany({ isPublished: false });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

removeUnpublishedCourses();
