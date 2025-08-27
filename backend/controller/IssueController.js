import Issue from '../models/Issues.model.js';
import mongoose from 'mongoose';

export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createIssue = async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  try {
    const issue = new Issue({
      title,
      description,
      status: status || "Open",
    });

    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateIssue = async (req, res) => {
  try {
    let { id } = req.params;

    id = id.replace(/['"]/g, "").trim();
    console.log("Sanitized ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid id" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "Request body is empty" });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    res.status(200).json({ success: true, data: updatedIssue });
  } catch (error) {
    console.error("Error updating issue:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.json({ message: "Issue deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
