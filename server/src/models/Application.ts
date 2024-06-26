import mongoose, { InferSchemaType } from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Required"],
    },
    resumeUrl: {
      type: String,
      required: [true, "Required"],
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Required"],
    },
    status: {
      type: String,
      required: [true, "Required"],
    },
  },
  { timestamps: true }
);

type applicationSchemaInferType = InferSchemaType<typeof applicationSchema>;

applicationSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    if ("_id" in returnedObject) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  },
});

const applicationModel = mongoose.model<applicationSchemaInferType>(
  "Application",
  applicationSchema
);

export default applicationModel;
