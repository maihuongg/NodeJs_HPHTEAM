// decorator-composition tronng structual
import mongoose from "mongoose";

// Decorator: logDecorator
function logDecorator(schema) {
  schema.pre("save", function (next) {
    console.log("Saving note...");
    next();
  });

  schema.post("save", function () {
    console.log("Note saved!");
  });

  return schema;
}

// Composition: addValidation
function addValidation(schema) {
  schema.path("title").validate(function (value) {
    return value.length <= 50;
  }, "Title must not exceed 50 characters");

  return schema;
}

const NoteSchema = logDecorator(addValidation(new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)));

export default mongoose.model("Note", NoteSchema);