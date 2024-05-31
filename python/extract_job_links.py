import sys
import json
from bs4 import BeautifulSoup
import pandas as pd

def extract_job_links(email_content):
    soup = BeautifulSoup(email_content, 'html.parser')
    
    links = []

    # Find all job blocks
    job_blocks = soup.find_all('table', bgcolor="#FFFFFF")

    for job_block in job_blocks:
        # Extract job link
        link_tag = job_block.find('a', href=True)
        if link_tag:
            links.append(link_tag['href'])

    return links

def parse_job_alerts(emails):
    all_links = []

    for email_content in emails:
        all_links.extend(extract_job_links(email_content))

    return all_links

def main():
    # Read input emails from the file
    email_file_path = sys.argv[1]
    with open(email_file_path, 'r') as file:
        emails = json.load(file)

    # Parse the job alerts
    all_links = parse_job_alerts(emails)

    # Convert to DataFrame and print as JSON
    df = pd.DataFrame(all_links, columns=["Link"])
    print(df.to_json(orient="records"))

if __name__ == "__main__":
    main()
