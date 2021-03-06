const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" }
];

router.get("/", (req, res) => {
  return res.json(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res
      .status(404)
      .json({ error: "Course with given ID wasn't found." });
  }
  res.json(course);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res
      .status(404)
      .json({ error: "Course with given ID wasn't found." });
  }

  const courseIndex = courses.indexOf(course);

  courses.splice(courseIndex, 1);
  res.json(course);
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

module.exports = router;
