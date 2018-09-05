const express = require("express");
const app = express();
const Joi = require("joi");

// Enables request with json body to be sent.
app.use(express.json());

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" }
];

app.get("/", (req, res) => {
  res.send("hello!");
});

app.get("/courses", (req, res) => {
  return res.json(courses);
});

app.get("/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res
      .status(404)
      .json({ error: "Course with given ID wasn't found." });
  }
  res.json(course);
});

app.post("/courses", (req, res) => {
  const { error: validationError } = validateCourse(req.body);

  if (validationError) {
    return res.status(400).json(validationError.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.json(course);
});

app.put("/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res
      .status(404)
      .json({ error: "Course with given ID wasn't found." });
  }

  const { error: validationError } = validateCourse(req.body);

  if (validationError) {
    return res.status(400).json(validationError.details[0].message);
  }

  course.name = req.body.name;
  res.json(course);
});

app.delete("/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res
      .status(404)
      .json({ error: "Course with given ID wasn't found." });
  }

  const courseIndex = courses.indexOf(course);
  console.log(courseIndex);

  courses.splice(courseIndex, 1);
  res.json(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

function validateCourse(course) {
  // Validation schema
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  // Validation result
  return Joi.validate(course, schema);
}
