const { app } = require('@azure/functions');
const { runPlaywrightTests } = require('../index.js'); // Import the Playwright test function

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *', // Runs every 5 minutes
    handler: async (myTimer, context) => {
        try {
            context.log("Executing Playwright test...");
            await runPlaywrightTests(context);
            context.log("Playwright test executed successfully!");
        } catch (error) {
            context.log("Error executing Playwright test:", error);
        } finally {
            context.log("Timer function processed request.");
        }
    }
});
