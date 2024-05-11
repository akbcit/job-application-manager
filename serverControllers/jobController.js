import { v4 as uuidv4 } from 'uuid';
import { addJobToTracker } from '../data/utils/addJobToTracker.js';

export const getUpdatedSummaryFromLLM = async (req, res) => {
    const currentSummary = req.body;
    console.log(req.body);
    return res.status(200).send({updatedResume:currentSummary});
};

export const addToTracker = async (req, res) => {
    const jobObject = req.body;
    const jobId = uuidv4();
    jobObject.jobId = jobId;
    addJobToTracker();
    return res.status(200).send({jobObject:jobObject});
};

