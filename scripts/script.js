$(document).ready(() => {
  // Initial check and set state of control buttons
  checkFormFieldsAndSetButtonState();

  // Function to check form fields and set button state
  function checkFormFieldsAndSetButtonState() {
    const formFields = $(
      "#job-description-form input:not(#deadline), #job-description-form textarea"
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
    // Set max-height to the scrollHeight of the content
    accordionContent.css(
      "max-height",
      accordionContent.prop("scrollHeight") + "px"
    );
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

  const addJobToTracker = (jobObject) => {
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
          console.log("Success:", response);
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
        },
      });
    }
  };

  jobForm.submit((event) => {
    event.preventDefault();

    const jobTitleValue = $("#job-title").val();
    const jobOrgValue = $("#job-org").val();
    const jobLocationValue = $("#job-location").val();
    const applicationLinkValue = $("#application-link").val();
    const deadlineValue = $("#job-title").val();
    const jobDescriptionValue = $("#job-description").val();

    const jobObject = {
      jobTitle: jobTitleValue,
      jobOrg:jobOrgValue,
      jobLocation: jobLocationValue,
      applicationLink: applicationLinkValue,
      jobDescription: jobDescriptionValue,
    };

    if (deadlineValue) {
      jobObject.deadline = deadlineValue;
    }

    addJobToTracker(jobObject);
  });
});
