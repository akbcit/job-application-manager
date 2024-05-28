// import { getResumePDF } from "../resumePdf/utils/getResumePDF.js";
import { CandidateRepo } from "../data/db/mongoRepos/candidate.repo.js";
import { UserRepo } from "../data/db/mongoRepos/user.repo.js";
import { ResumeRepo } from "../data/db/mongoRepos/resume.repo.js";

const candidateRepo = new CandidateRepo();
const userRepo = new UserRepo();
const resumeRepo = new ResumeRepo();

export const getResume = async (req, res) => {
  try {
    console.log("Starting PDF generation...");
    const resumePdfBuffer = await getResumePDF();
    console.log("PDF generation completed.");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
    console.log("Sending PDF...");
    res.send(resumePdfBuffer);
  } catch (error) {
    console.error("Failed to get PDF: ", error);
    res.status(500).send({ error: "Failed to download PDF." });
  }
};

export const createResume = async (req, res) => {
  // get email
  const email = req.params.email;
  const resume = req.body;
  // check if email is the same as user session email
  if (email !== req.session.user.email) {
    return res.status(401).send({ error: "Unauthorized access!" });
  }
  // check if candidate exists
};

export const getResumesForCandidate = async (req, res) => {
  // get email
  const email = req.params.email;
  // check if email is the same as user session email
  if (email !== req.session.user.email) {
    return res.status(401).send({ error: "Unauthorized access!" });
  }
  // find user by email
  const userDoc = await userRepo.findUser(email);
  if (!userDoc) {
    return res.status(404).send({ error: "User not found" });
  }
  // check if candidate exists
  const candidateDoc = await candidateRepo.findCandidateByEmail(email);
  if (!candidateDoc) {
    // create a candidate
    const newCandidate = {
      userId: userDoc.id,
      candidateEmail: email,
      candidateName: `${userDoc.firstName}${
        userDoc.lastName ? ` ${userDoc.lastName}` : ""
      }`,
      resumeIds: [],
    };
    const newCandidateDoc = await res.createCandidate(newCandidate);
    if (newCandidateDoc) {
      return res.status(200).send({ resumeVersions: [] });
    } else {
      return res
        .status(500)
        .send({ error: "Internal server error with adding candidate" });
    }
  }
  // get all resume versions for candidate
  const resumeVersionNames = await resumeRepo.getAllResumeVersionsForCandidate(
    candidateDoc.id
  );
  if (resumeVersionNames) {
    return res.status(200).send({ resumeVersions: resumeVersionNames });
  } else {
    return res.status(500).send({
      error:
        "Internal server error while getting resume versions for candidate",
    });
  }
};
