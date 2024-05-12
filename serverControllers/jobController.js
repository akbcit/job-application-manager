import { v4 as uuidv4 } from 'uuid';
import { addJobToTracker } from '../data/utils/addJobToTracker.js';
import { getAllJobsFromTracker } from '../data/utils/getAllJobsFromTracker.js';
import { summarizeJDLLM } from '../llm/llmMethods/llmMethods.js';

export const getUpdatedSummaryFromLLM = async (req, res) => {
    const currentSummary = req.body;
    console.log(req.body);
    summarizeJDLLM();
    return res.status(200).send({updatedResume:currentSummary});
};

export const summarizeJD = async (req, res) => {
    const jobObject = req.body;
    const summaryObj =  await summarizeJDLLM(jobObject);
    return res.status(200).send({summaryObj:summaryObj});
};


export const addToTracker = async (req, res) => {
    const jobObject = req.body;
    const jobId = uuidv4();
    jobObject.jobId = jobId;
    addJobToTracker(jobObject);
    return res.status(200).send({jobObject:jobObject});
};

export const getAllJobs = async (req, res) => {
    const allJobs = await getAllJobsFromTracker();
    if(allJobs && allJobs.length>0){
        return res.status(200).send({allJobs:allJobs});
    }
    else{
        return res.status(200).send({allJobs:[]});
    }
};

