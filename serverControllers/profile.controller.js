export const getProfileSummary = (req, res) => {
  const email = req.params.email;
  return res.status(200).send({ success: "Ok" });
};
