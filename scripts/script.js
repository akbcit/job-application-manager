const getAllJobs = async () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:3004/api/job",
      type: "GET",
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, status, error) {
        reject(error);
      },
    });
  });
};

const parseInbox = async (emailFrom, searchDate) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:3004/api/job-alerts/gmail-parse/${emailFrom}/${searchDate}/`,
      type: "GET",
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, status, error) {
        reject(error);
      },
    });
  });
};

async function updateJobStatus(jobId, updatedStatus) {
  try {
    const response = await $.ajax({
      url: `http://localhost:3004/api/job/update/${jobId}/${updatedStatus}`,
      type: "PUT",
    });
    console.log("Update Response:", response);
  } catch (error) {
    console.error("Error updating job status:", error);
  }
}

const getJobLinks = async () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:3004/api/job-alerts/links",
      type: "GET",
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, status, error) {
        reject(error);
      },
    });
  });
};

$(document).ready(async () => {
  const jobTrackerTable = $("#job-tracker-table");

  async function populateJobs() {
    try {
      const response = await getAllJobs();
      console.log(response);
      const jobs = response.allJobs;
      console.log(jobs);
      const $table = $("#job-tracker-table tbody");
      $table.empty();

      // Append each job to the table
      jobs.forEach((job, index) => {
        const descId = `desc-${index}`;
        const skillsId = `skills-${index}`;
        const $row = $(`
            <tr>
                <td>${job.jobTitle}</td>
                <td>${job.experienceRequired}</td>
                <td>${job.jobOrg}</td>
                <td>${job.jobLocation}</td>
                <td><a href="${
                  job.applicationLink
                }" target="_blank">Link</a></td>
                <td><button class="toggle-btn" onclick="$('#${descId}').toggle()">Description</button></td>
                <td>${job.deadline}</td>
                <td><button class="toggle-btn" onclick="$('#${skillsId}').toggle()">Skills</button></td>
                <td>
                    <select name="statusDropdown" class="status-dropdown" data-job-id="${
                      job.jobId
                    }"><option value="Not Applied" ${
                          job.status === "Not Applied" ? "selected" : ""
                        }>Not Applied</option>
                        <option value="Applied" ${
                          job.status === "Applied" ? "selected" : ""
                        }>Applied</option>
                        <option value="Interviewed" ${
                          job.status === "Interviewed" ? "selected" : ""
                        }>Interviewed</option>
                        <option value="Offered" ${
                          job.status === "Offered" ? "selected" : ""
                        }>Offered</option>
                        <option value="Rejected" ${
                          job.status === "Rejected" ? "selected" : ""
                        }>Rejected</option>
                    </select>
                </td>
            </tr>
            <tr id="${descId}" style="display:none;">
                <td colspan="8">${job.jobDescription}</td>
            </tr>
            <tr id="${skillsId}" style="display:none;">
                <td colspan="8">${job.techSkillsArr.join(", ")}</td>
            </tr>
        `);
        $("#job-tracker-table tbody").append($row);
      });

      // After populating jobs
      $("#job-tracker-table").on("change", ".status-dropdown", function () {
        const jobId = $(this).data("job-id");
        const updatedStatus = $(this).val();
        updateJobStatus(jobId, updatedStatus);
      });
    } catch (error) {
      console.error("Error getting jobs:", error);
    }
  }

  async function populateLinks() {
    try {
      const response = await getJobLinks();
      const links = response.links;
      console.log(links);
      const $table = $("#links-tracker-table tbody");
      $table.empty();

      // Append each link to the table
      links.forEach((link, index) => {
        const $row = $(`
                <tr>
                <td><a href="${link.link}" target="_blank">Link</a></td>
                    <td>${link.date}</td>
                    <td>${link.source}</td>
                </tr>
            `);
        $("#links-tracker-table tbody").append($row);
      });
    } catch (error) {
      console.error("Error getting links:", error);
    }
  }

  populateLinks();

  populateJobs();

  // Initial check and set state of control buttons
  checkFormFieldsAndSetButtonState();

  // Function to check form fields and set button state
  function checkFormFieldsAndSetButtonState() {
    const formFields = $(
      "#job-description-form input:not(#deadline):not(#tech-skills):not(#total-experience), #job-description-form textarea"
    );
    let allFilled = true;
    formFields.each(function () {
      if ($(this).val() === "") {
        allFilled = false;
      }
    });

    $(".control-btn").prop("disabled", !allFilled);
  }

  // Event handler to check form changes
  $("#job-description-form input, #job-description-form textarea").on(
    "input",
    () => {
      checkFormFieldsAndSetButtonState();
    }
  );

  const summaryParaEleWithAIContent = $(".summary-ai-para");
  const summaryParaEleContent = summaryParaEleWithAIContent.text();
  const updateSummaryButton = $("#update-summary");

  const accordionBtn = $("#accordion-btn");
  const accordionContent = $("#accordion-content");

  const alertElement = $(".form-alert");

  $("#inbox-scan-form").on("submit", async function (event) {
    event.preventDefault();
    const emailFrom = $("#emailFrom").val();
    const searchDate = $("#searchDate").val();
    $(".scan-btn").prop("disabled", true).addClass("disabled");

    try {
      const response = await parseInbox(emailFrom, searchDate);
      console.log("Response received:", response);
      await populateLinks();
    } catch (error) {
      console.error("Error processing inbox:", error);
    } finally {
      $(".scan-btn").prop("disabled", false).removeClass("disabled");;
    }
  });

  accordionBtn.click(() => {
    console.log("hi");
    // Check current max-height to determine the action
    if (
      accordionContent.css("max-height") === "0px" ||
      accordionContent.css("max-height") === "none"
    ) {
      expandAccordion();
    } else {
      contractAccordion();
    }
  });

  const expandAccordion = () => {
    // Temporarily set max-height to none to calculate the full height of the content
    accordionContent.css("max-height", "none");
    let fullHeight = accordionContent.height(); // Get the actual height of the content

    // Now set max-height to this full height
    accordionContent.css("max-height", fullHeight + "px");
  };

  const contractAccordion = () => {
    accordionContent.css("max-height", 0);
  };

  const getUpdatedSummary = () => {
    console.log("hi");
    $.ajax({
      url: "http://localhost:3004/api/job/update-summary",
      type: "POST",
      data: summaryParaEleContent,
      success: function (response) {
        console.log("Success:", response);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  };

  updateSummaryButton.click(getUpdatedSummary);

  const jobForm = $("#job-description-form");

  const addJobToTracker = async (jobObject) => {
    return new Promise((resolve, reject) => {
      if (
        jobObject.jobTitle &&
        jobObject.jobOrg &&
        jobObject.jobLocation &&
        jobObject.applicationLink &&
        jobObject.jobDescription
      ) {
        $.ajax({
          url: "http://localhost:3004/api/job/add-job",
          type: "POST",
          data: jobObject,
          success: function (response) {
            // Resolve the promise with the response
            resolve(response);
          },
          error: function (xhr, status, error) {
            // Reject the promise with the error
            reject(error);
          },
        });
      }
    });
  };

  const summarizeDescription = async (jobObject) => {
    return new Promise((resolve, reject) => {
      if (
        jobObject.jobTitle &&
        jobObject.jobOrg &&
        jobObject.jobLocation &&
        jobObject.applicationLink &&
        jobObject.jobDescription
      ) {
        $.ajax({
          url: "http://localhost:3004/api/job/summarize-jd",
          type: "POST",
          data: jobObject,
          success: function (response) {
            // Resolve the promise with the response
            resolve(response);
          },
          error: function (xhr, status, error) {
            // Reject the promise with the error
            reject(error);
          },
        });
      } else {
        reject("Invalid job object provided");
      }
    });
  };

  jobForm.submit(async (event) => {
    event.preventDefault();

    const jobTitleValue = $("#job-title").val();
    const jobOrgValue = $("#job-org").val();
    const jobLocationValue = $("#job-location").val();
    const applicationLinkValue = $("#application-link").val();
    const deadlineValue = $("#deadline").val();
    const jobDescriptionValue = $("#job-description").val();
    const experienceRequired = $("#total-experience").val();
    const techSkillsArr = $("#tech-skills").val().split(",");

    const jobObject = {
      jobTitle: jobTitleValue,
      jobOrg: jobOrgValue,
      jobLocation: jobLocationValue,
      applicationLink: applicationLinkValue,
      jobDescription: jobDescriptionValue,
    };

    if (deadlineValue) {
      jobObject.deadline = deadlineValue;
    } else {
      jobObject.deadline = "NA";
    }

    if (experienceRequired) {
      jobObject.experienceRequired = experienceRequired;
    }

    if (techSkillsArr) {
      jobObject.techSkillsArr = techSkillsArr;
    }
    $(".control-btn").prop("disabled", true);
    await addJobToTracker(jobObject);
    await populateJobs();
    $(".control-btn").prop("disabled", false);
  });

  const sumarizeDescriptionBtn = $("#sumarize-description");

  sumarizeDescriptionBtn.click(async () => {
    const jobTitleValue = $("#job-title").val();
    const jobOrgValue = $("#job-org").val();
    const jobLocationValue = $("#job-location").val();
    const applicationLinkValue = $("#application-link").val();
    const deadlineValue = $("#job-title").val();
    const jobDescriptionValue = $("#job-description").val();

    const jobObject = {
      jobTitle: jobTitleValue,
      jobOrg: jobOrgValue,
      jobLocation: jobLocationValue,
      applicationLink: applicationLinkValue,
      jobDescription: jobDescriptionValue,
    };

    if (deadlineValue) {
      jobObject.deadline = deadlineValue;
    }
    try {
      $(".control-btn").prop("disabled", true);
      const jsonResponse = await summarizeDescription(jobObject);
      $(".control-btn").prop("disabled", false);

      let response =
        typeof jsonResponse === "string"
          ? JSON.parse(jsonResponse)
          : jsonResponse;

      const details = JSON.parse(response.summaryObj);

      // Check and populate tech skills and experience if available
      if (details.tech_skills_array) {
        $("#tech-skills").val(details.tech_skills_array.join(", "));
        jobObject.techSkillsArr = details.tech_skills_array;
        $(".hidden-summary-fields").show();
      }

      if (details.experience_required) {
        jobObject.experienceRequired = details.experienceRequired;
        $("#total-experience").val(details.experience_required);
      }

      expandAccordion();
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
