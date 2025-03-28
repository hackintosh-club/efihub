#!/bin/bash

# GitHub API URL for the organization repositories
API_URL="https://api.github.com/orgs/hackintosh-club/repos?per_page=100"

# Fetch the data from the GitHub API
response=$(curl -s "$API_URL")

# Check if the response is valid JSON
if echo "$response" | jq -e . >/dev/null 2>&1; then
    # Parse the JSON response and generate the Markdown list
    echo "# Hackintosh Club Repositories" >repos.md
    echo "" >>repos.md

    echo "$response" | jq -r '.[] | "- [**\(.name)**](/r/\(.name) \"\(.description // "")\")"' >>repos.md
else
    echo "Failed to fetch data from GitHub API."
    exit 1
fi
