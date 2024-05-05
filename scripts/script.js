$(document).ready(() => {
  const summaryParaEleWithAIContent = $(".summary-ai-para");
  const summaryParaEleContent = summaryParaEleWithAIContent.text();
  console.log(summaryParaEleContent);
  const updateSummaryButton = $("#updateSummary");

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
