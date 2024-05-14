# Job Application Tracker V1.0

## Overview
Job Application Tracker V1.0 is a locally hosted tool designed to streamline the process of tracking job applications, summarizing job descriptions, and managing resumes. It leverages Natural Language Processing (NLP) to extract technical skills from job descriptions and provides the flexibility to modify resumes in HTML format and download them as PDF files. 

Video demo is added here - [Job Application Manager](https://vimeo.com/945574687)

## Prerequisites
- Node.js installed
- Working knowledge of HTML, CSS, and JavaScript for resume customization
- Gmail account
- LinkedIn Account with job alerts set up that are received on teh gmail account

## Features
1. **Application Tracking**: Easily keep track of the jobs you are applying to, including their current status.
2. **Inbox Scanning**: Scan your inbox to extract links out of job alert emails.
3. **NLP Summary and Skill Extraction**: Utilizes Language Model (LLM) to summarize job descriptions and extract technical skills, aiding in understanding job requirements.
4. **Resume Customization**: Allows modification of resumes in HTML format and enables downloading them as PDF files for easy sharing.

## Installation Steps
1. **Clone Repository**: Clone the repository locally using the following link: [Job Application Manager](https://github.com/akbcit/job-application-manager)
2. **Customise resume**: Change the resume contents and styling to suit your requirements (Do not modify css selectors, if you must, then make apprporiate chnages in script.js)
3. **Install Dependencies**: Install node modules using npm or yarn by running:
    ```
    npm install
    ```
    or
    ```
    yarn install
    ```
4. **Set Environment Variables**: Create a `.env` file and add the following environment variables:
    ```
    OPEN_AI_API_KEY=<Your_OpenAI_API_Key>
    PORT=3004
    ```
   Ensure you have an OpenAI developer account and obtain an API key. Additionally, set the port to 3004.
5. **OpenAI API Key**: Create an OpenAI developer account, obtain an API key, and manage usage limits. Note that adding a $5 payment may be required, but it provides a significant number of tokens.
6. **Run Development Server**: To run the development server, use the following command:
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
7. **Set up MongoDB**: Ensure that MongoDB is properly set up. Add the MongoDB details to your `.env` file as shown below:

    ```env
    MONGODB_DATASOURCE_NAME=your_datasource_name
    MONGODB_DATABASE_NAME=your_database_name
    MONGO_COLLECTION_NAME=your_collection_name
    MONGO_API_KEY=your_mongo_api_key
    MONGO_API_URL=your_mongo_api_url
    GOOGLE_SCRIPT_URL=your_google_script_url

8. **Set up the Google Script**: Create a new Google Apps Script project and add the following code to handle the POST requests and save email data to MongoDB. The script should be deployed and should have access to the email in which you are receiving your job alerts. Also, add the URL to your `.env`.

## Google Apps Script

        ```javascript
        function doPost(e) {
          var rawData = e.postData.getDataAsString();
          var requestData;
        
          try {
            requestData = JSON.parse(rawData);
            console.log("Parsed Request Data: " + JSON.stringify(requestData));
          } catch (error) {
            console.log("Error parsing the POST data: " + error.toString());
            return ContentService.createTextOutput("Error parsing POST data: " + error.toString());
          }
        
          // Extract parameters from requestData
          var emailFrom = requestData.emailFrom;
          var collection = requestData.collection;
          var database = requestData.database;
          var dataSource = requestData.dataSource;
          var apiKey = requestData.apiKey;
          var mongoApiUrl = requestData.mongoApiUrl;
          var searchDate = requestData.searchDate;
        
          // Validate that all required parameters are present
          if (!emailFrom || !collection || !database || !dataSource || !apiKey || !mongoApiUrl || !searchDate) {
            return ContentService.createTextOutput("One or more required parameters are missing.");
          }
        
          var searchDateObj = new Date(searchDate);
          var prevDay = new Date(searchDateObj);
          prevDay.setDate(searchDateObj.getDate() - 1);
        
          // Format dates to 'yyyy/mm/dd' format required by Gmail search
          var formattedSearchDate = Utilities.formatDate(searchDateObj, Session.getScriptTimeZone(), "yyyy/MM/dd");
          var formattedPrevDay = Utilities.formatDate(prevDay, Session.getScriptTimeZone(), "yyyy/MM/dd");
        
          // Modify the Gmail search to include the date and sender
          var threads = GmailApp.search(`from:${emailFrom} after:${formattedPrevDay} before:${formattedSearchDate}`);
          Logger.log("Found " + threads.length + " threads.");
          var totalEmailsParsed = 0;
          var emailsProcessed = 0;
          var successfulInserts = 0;
          var failedInserts = 0;
        
          threads.forEach(thread => {
            var messages = thread.getMessages();
            totalEmailsParsed += messages.length;
            messages.forEach(message => {
              emailsProcessed++;
              var subject = message.getSubject();
              var body = message.getPlainBody();
              var links = extractLinks(body);
        
              // Prepare the data for MongoDB
              var data = JSON.stringify({
                "collection": collection,
                "database": database,
                "dataSource": dataSource,
                "document": {
                  "sender": emailFrom,
                  "date": searchDate,
                  "subject": subject,
                  "body": body,
                  "links": links
                }
              });
        
              var options = {
                "method": "post",
                "contentType": "application/json",
                "headers": {
                  "api-key": apiKey,
                },
                "payload": data
              };
        
              // Send the data to MongoDB
              var response = UrlFetchApp.fetch(mongoApiUrl, options);
              var jsonResponse = JSON.parse(response.getContentText());
        
              if (response.getResponseCode() == 200 && jsonResponse.insertedId) {
                successfulInserts++;
              } else {
                Logger.log("Failed to insert: " + (jsonResponse.errorMessage || "No error message provided"));
                failedInserts++;
              }
        
              // Optionally mark message as read
              message.markRead();
            });
          });
        
          var resultMessage = "Total emails parsed: " + totalEmailsParsed +
            ", Emails processed: " + emailsProcessed +
            ", Successful inserts: " + successfulInserts +
            ", Failed inserts: " + failedInserts + ".";
          Logger.log(resultMessage);
          return ContentService.createTextOutput(resultMessage);
        }
        
        function extractLinks(text) {
          var links = [];
          var regex = /(https?:\/\/[^\s]+)/g;
          var match;
          while ((match = regex.exec(text)) !== null) {
            links.push(match[0]);
          }
          return links;
        }



## Roadmap
1. **Status Update**: Enhance the application to modify tracked jobs and update their status seamlessly.
2. **Applicability Estimation**: Implement functionality to estimate the applicability of a job based on the entered job description, providing insights into potential matches.
3. **Summary Enhancement**: Improve the summary feature by updating it based on the skills mentioned in the job description that the applicant may possess.
4. **Enhanced Email Parse**: Improve email parsing to include better information and categorize job-related emails. 

## Contact Information
For any questions or assistance, please reach out to kumaraditya.ca@gmail.com.

---
By following these steps, users can efficiently manage their job applications, leverage NLP for better understanding, and customize resumes to enhance their job search process.
