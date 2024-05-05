export const getUpdatedSummaryFromLLM = async (req, res) => {
    const currentSummary = req.body;
    console.log(req.body);
    return res.status(200).send({updatedResume:currentSummary});
};
