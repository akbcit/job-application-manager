# Job Application Tracker V1.0

## Overview
Job Application Tracker V1.0 is a tool designed to streamline the process of tracking job applications, summarizing job descriptions, and managing resumes. It leverages Natural Language Processing (NLP) to extract technical skills from job descriptions and provides the flexibility to modify resumes in HTML format and download them as PDF files. 

Video demo is added here - [Job Application Manager](https://vimeo.com/945574687)

## Features
1. **Application Tracking**: Easily keep track of the jobs you are applying to, including their current status.
2. **NLP Summary and Skill Extraction**: Utilizes Language Model (LLM) to summarize job descriptions and extract technical skills, aiding in understanding job requirements.
3. **Resume Customization**: Allows modification of resumes in HTML format and enables downloading them as PDF files for easy sharing.

## Installation Steps
1. **Clone Repository**: Clone the repository locally using the following link: [Job Application Manager](https://github.com/akbcit/job-application-manager)
2. **Install Dependencies**: Install node modules using npm or yarn by running:
    ```
    npm install
    ```
    or
    ```
    yarn install
    ```
3. **Set Environment Variables**: Create a `.env` file and add the following environment variables:
    ```
    OPEN_AI_API_KEY=<Your_OpenAI_API_Key>
    PORT=3004
    ```
   Ensure you have an OpenAI developer account and obtain an API key. Additionally, set the port to 3004.
4. **OpenAI API Key**: Create an OpenAI developer account, obtain an API key, and manage usage limits. Note that adding a $5 payment may be required, but it provides a significant number of tokens.

## Roadmap
1. **Status Update**: Enhance the application to modify tracked jobs and update their status seamlessly.
2. **Applicability Estimation**: Implement functionality to estimate the applicability of a job based on the entered job description, providing insights into potential matches.
3. **Summary Enhancement**: Improve the summary feature by updating it based on the skills mentioned in the job description that the applicant may possess.

## Contact Information
For any questions or assistance, please reach out to kumaraditya.ca@gmail.com.

---
By following these steps, users can efficiently manage their job applications, leverage NLP for better understanding, and customize resumes to enhance their job search process.
