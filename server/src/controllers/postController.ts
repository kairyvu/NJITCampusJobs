import employerModel from "../models/Employer";
import jobModel from "../models/Job";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import fieldValidate from "../utils/fieldValidate";

const postController = {
  getAllPostsFromAnEmployer: async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    const employer = await employerModel.findById(req.params.id).populate({
      path: "jobPosts",
      populate: {
        path: "applicants",
        populate: {
          path: "accepted rejected pending",
          populate: {
            path: "student",
            select: "fullName profilePicture"
          },
        },
      },
    }).lean();
    if (!employer) {
      return res.status(404).json({ error: "User Not Found" });
    }
    return res.status(200).json(employer?.jobPosts);
  },

  updateAPost: async (req: AuthenticatedRequest, res: Response) => {
    const newPost = fieldValidate.processNewPost(req.body);
    const post = await jobModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    await post.updateOne({ $set: newPost });
    return res.status(200).json("Post has been updated");
  },

  createNewPost: async (req: AuthenticatedRequest, res: Response) => {
    const job = fieldValidate.processNewPost(req.body);
    const { title, externalApplication, jobDescription, location, salary } =
      job;

    const user = await employerModel.findById(req.user);
    if (!user) return res.status(404).json({ error: "User Not Found" });
    const newJob = new jobModel({
      employer: user._id,
      title,
      externalApplication,
      jobDescription,
      location,
      salary,
    });

    const savedJob = await newJob.save();
    user.jobPosts = user.jobPosts.concat(savedJob._id);
    await user.save();
    return res.status(200).json(savedJob);
  },
};

export default postController;
