# **Automated Playwright Login Test with Azure Timer Trigger Function**

## Overview

This project sets up an Azure Timer Trigger Function to execute a Playwright test that performs a login operation on a sample website (https://www.saucedemo.com/). The test results are then sent to Azure Application Insights for synthetic monitoring and availability tracking.

By implementing this solution, organizations can:

- Automatically test website login functionality at regular intervals.

- Detect login failures proactively and resolve them before impacting users.

- Monitor site availability using Azure Application Insights Availability Tests.

- Automate synthetic monitoring to track system health in real time.

## Features

✅ Runs every 5 minutes using an Azure Timer Trigger.<br>
✅ Launches a browser and performs a login test using Playwright.<br>
✅ Logs success and failure events to Application Insights.<br>
✅ Enables synthetic monitoring to track login availability.<br>
✅ Can be deployed to Azure Functions for cloud execution.<br>

## Prerequisites

Ensure you have the following installed:

- Azure Functions Core Tools (npm install -g azure-functions-core-tools@4)

- Node.js (LTS version recommended)

- Azure CLI (az login to authenticate)

- An active Azure Subscription with Application Insights set up

## Setup and Installation
<ol>
  <li>
Clone the repository    
    
   ``git clone repository-url  ``
   <br>
   ``  cd AppInsights-Playwright ``
    
   
</li>
  
<li> Install dependencies <br>
  
  ``npm install``
</li>

<li>  Set up Azure Function Project

Initialize an Azure Function project if not already done:
``func init``
</li> 
<li> 
 Create a Timer Trigger Function
``
func new --name timerTrigger1 --template "Timer trigger" --language JavaScript
  ``
</li> 
  <li> 
 Configure Application Insights

Go to Azure Portal → Application Insights.

Copy the Instrumentation Key / Connection String.

Create a .env file in the root of the project and add:
``
APPLICATIONINSIGHTS_CONNECTION_STRING=your_connection_string_here
``
</li> 
  <li> 
  Run the Function Locally
    
   ``func start``
  </li>
  </ol>
  
## Deployment to Azure

<ol>
  <li> Login to Azure

``az login``
</li>
<li>
 Create an Azure Function App

``az functionapp create --resource-group <resource-group-name> --consumption-plan-location <location> --runtime node --name <function-app-name> --storage-account <storage-account-name>``
</li>
<li>
 Deploy the function

``func azure functionapp publish <function-app-name>``
</li>
</ol>

## Monitoring Test Results in Application Insights

- Go to Azure Portal → Application Insights.

- Navigate to "Availability".

- Click "Custom Availability Tests".

- View the results of the Playwright test runs.
  
  <img width="949" alt="image" src="https://github.com/user-attachments/assets/d041660c-497f-4780-aa7d-afc424e9fa28" />


## Why This Solution is Needed?

- Ensures Login Reliability: Automates login testing to identify failures proactively.

- Synthetic Monitoring: Provides real-time monitoring of website availability.

- Early Detection: Detects authentication issues before they impact users.

- Scalable: Runs in Azure Functions, eliminating the need for a dedicated server.

- Integrated with Application Insights: Allows tracking of availability trends over time.
