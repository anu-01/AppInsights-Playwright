
# **Automated Playwright Login Test for Synthetic Monitoring and Availability Tracking**

## Overview

This project sets up an Azure Timer Trigger Function to execute a Playwright test that performs a login operation on a sample website (https://www.saucedemo.com). The test results are sent to Azure Application Insights for synthetic monitoring and availability tracking.

By implementing this solution, organizations can:

- Automatically test website login functionality at regular intervals.
- Detect login failures proactively and resolve them before impacting users.
- Monitor site availability using Azure Application Insights Availability Tests.
- Automate synthetic monitoring to track system health in real time.

## Features

- ✅ Runs every 5 minutes using an Azure Timer Trigger  
- ✅ Launches a browser and performs a login test using Playwright  
- ✅ Logs success and failure events to Application Insights  
- ✅ Enables synthetic monitoring to track login availability  
- ✅ Can be deployed to Azure Functions for cloud execution  

## Prerequisites

Ensure you have the following installed:

- Azure Functions Core Tools  
  ```bash
  npm install -g azure-functions-core-tools@4
  ```
- Node.js (LTS version recommended)  
- Azure CLI  
  ```bash
  az login
  ```
- An active Azure Subscription with Application Insights set up

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AppInsights-Playwright
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   - Install Playwright browsers:
     ```powershell
     $env:PLAYWRIGHT_BROWSERS_PATH=0; npx playwright install --with-deps
     ```
     This downloads browser binaries for Windows, which will later be pushed to the Azure Function App.

3. **Run the Function Locally**

   - Add the following settings in `local.settings.json`:
     ```json
     {
       "IsEncrypted": false,
       "Values": {
         "AzureWebJobsStorage": "UseDevelopmentStorage=true"
       }
     }
     ```
   - Run Azurite in a new terminal:
     ```bash
     azurite
     ```
     If Azurite is not recognized install it using this command:
      `` npm install -g azurite ``
      
   - Start the function app in a separate terminal:
     ```bash
     func start
     ```

## Deployment to Azure

1. **Login to Azure**
   ```bash
   az login
   ```

2. **Create an Azure Function App (Premium EP1 Plan)**  
   Use the Azure Portal to create the app.

3. **Set App Settings in Azure Portal**
   ```bash
   PLAYWRIGHT_BROWSERS_PATH=0
   ```

4. **Linux Function App Only**  
   Add Playwright browser binaries for Chromium Linux inside `node_modules/playwright-core/.local-browsers`. Download and extract the following:

   - https://cdn.playwright.dev/dbazure/download/playwright/builds/chromium/1161/chromium-linux.zip  
   - https://cdn.playwright.dev/dbazure/download/playwright/builds/chromium/1161/chromium-headless-shell-linux.zip

   <image src="https://github.com/user-attachments/assets/85545543-7c7c-4fe5-8021-265c67bc3dab" />

5. **Deploy the Function App**
   ```bash
   func azure functionapp publish <function-app-name>
   ```

## Monitoring Test Results in Application Insights

- Go to Azure Portal → Application Insights  
- Navigate to **Investigate** → **Availability**  
- Click **Custom Availability Tests**  
- View the results of Playwright test runs  

  <image src="https://github.com/user-attachments/assets/d041660c-497f-4780-aa7d-afc424e9fa28" />

- **Create Alerts in Application Insights**
  - Navigate to **Alerts** → **New Alert Rule**
  - Set condition: `availabilityResults/availabilityPercentage < 100`
  - Choose notification method: Email, Teams, etc.

## Why This Solution is Needed

- **Ensures Login Reliability**: Automates login testing to identify failures proactively  
- **Synthetic Monitoring**: Provides real-time monitoring of website availability  
- **Early Detection**: Detects authentication issues before they impact users  
- **Scalable**: Runs in Azure Functions, eliminating the need for a dedicated server  
- **Integrated with Application Insights**: Allows tracking of availability trends over time

## Learn More

To learn more about writing Playwright tests, visit the [Playwright Documentation](https://playwright.dev/docs/writing-tests).
