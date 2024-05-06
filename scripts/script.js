$(document).ready(() => {
  // Initial check and set state of control buttons
  checkFormFieldsAndSetButtonState();

  // Function to check form fields and set button state
  function checkFormFieldsAndSetButtonState() {
    const formFields = $(
      "#job-description-form input, #job-description-form textarea"
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

  // Placeholder click functions
  $("#sumarize-description").click(
    function () {
      if (!$(this).prop("disabled")) {
        console.log("Clicked");
      }
    }
  );

    // Placeholder click functions
    $("#update-summary").click(
      function () {
        if (!$(this).prop("disabled")) {
          console.log("Clicked");
        }
      }
    );

  $("#estimate-applicability").click(
      function () {
        if (!$(this).prop("disabled")) {
          console.log("Clicked");
        }
      }
    );

  const summaryParaEleWithAIContent = $(".summary-ai-para");
  const summaryParaEleContent = summaryParaEleWithAIContent.text();
  const updateSummaryButton = $("#updateSummary");
  
  const accordionBtn = $("#accordion-btn");
  const accordionContent = $("#accordion-content");

  accordionBtn.click(() => {
    console.log("hi")
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
    $.ajax({
      url: "http://localhost:3004/api/summary/update-summary",
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
});
