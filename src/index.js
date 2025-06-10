require('dotenv').config();
const playwright = require('playwright');
const appInsights = require('applicationinsights');


// Debugging: Print env variable to check if it's loaded correctly
console.log("App Insights Key:", process.env.APPLICATIONINSIGHTS_CONNECTION_STRING);

// Initialize Application Insights
appInsights
  .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
  .setSendLiveMetrics(true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true) // Enables retry caching for telemetry
  .setInternalLogging(true, true) // Enables internal logging for debugging
  .start();
const client = appInsights.defaultClient;
async function runPlaywrightTests(context) {
    const timestamp = new Date().toISOString();

    try {
        context.log(`[${timestamp}] Running Playwright login test...`);
        // context.log("browser.browserType:", playwright.chromium.name());
        context.log("Executable Path for PW:", playwright.chromium.executablePath());


        // Launch Browser
        const browser = await playwright.chromium.launch({             
            // executablePath: path.resolve('./node_modules/playwright-core/.local-browsers/chromium-1169/chrome-win/chrome.exe'), // Adjust path as needed
                headless: true });
        const page = await browser.newPage();

        // Navigate to login page
        await page.goto('https://www.saucedemo.com/');

        // Perform Login
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // Verify successful login
        await page.waitForSelector('.inventory_list', { timeout: 5000 });

        // Log Success to Application Insights
        client.trackAvailability({
            name: "SauceDemo Login Test",
            success: true,
            duration: 5000, // Execution time
            runLocation: "Azure Function",
            message: "Login successful",
            time: new Date()
        });

        context.log("✅ Playwright login test successful.");
        await browser.close();
    } catch (error) {
        context.log("❌ Playwright login test failed:", error);

        // Log Failure to Application Insights
        client.trackAvailability({
            name: "SauceDemo Login Test",
            success: false,
            duration: 0,
            runLocation: "Azure Function",
            message: error.message,
            time: new Date()
        });
    }
}

module.exports = { runPlaywrightTests };
