import express from 'express';
import { getAllIssues } from '../controller/IssueController.js';
import { createIssue } from '../controller/IssueController.js';
import { updateIssue } from '../controller/IssueController.js';
import { deleteIssue } from '../controller/IssueController.js';

const router = express.Router();


router.get("/", getAllIssues);
router.post("/",createIssue);   
router.put("/:id", updateIssue);
router.delete("/:id",deleteIssue );


export default router;