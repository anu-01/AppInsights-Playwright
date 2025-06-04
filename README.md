# **Automated Playwright Login Test for Synthetic Monitoring and availability tracking**

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

<li>
 Set APPLICATIONINSIGHTS_CONNECTION_STRING in Azure portal for Function App <br/>
 Go to Azure Portal → Application Insights and copy the Instrumentation Key / Connection String. <br/>
 Go to Azure Portal → Function App -> Settings -> Environment Variables and set it there <br/>

 ``
APPLICATIONINSIGHTS_CONNECTION_STRING=your_connection_string_here
``

</li>
</ol>

## Monitoring Test Results in Application Insights

- Go to Azure Portal → Application Insights.

- Navigate to "Investigate" --> "Availability".

- Click "Custom Availability Tests".

- View the results of the Playwright test runs.
  
  <img width="949" alt="image" src="https://github.com/user-attachments/assets/d041660c-497f-4780-aa7d-afc424e9fa28" />

- Create Alerts in Application Insights

    - Navigate to **Alerts** → **New Alert Rule**
    - Set condition: availabilityResults/availabilityPercentage < 100
    - Notify via Email/Teams    


## Why This Solution is Needed?

- Ensures Login Reliability: Automates login testing to identify failures proactively.

- Synthetic Monitoring: Provides real-time monitoring of website availability.

- Early Detection: Detects authentication issues before they impact users.

- Scalable: Runs in Azure Functions, eliminating the need for a dedicated server.

- Integrated with Application Insights: Allows tracking of availability trends over time.
