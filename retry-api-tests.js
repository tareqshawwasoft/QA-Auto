const { execSync } = require('child_process');

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runApiTests() {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${MAX_RETRIES} - Running API tests...`);

      // Run Newman with output capture to check for failures
      const output = execSync('npm run test:api', {
        encoding: 'utf8',
        stdio: ['inherit', 'pipe', 'pipe']
      });

      // Check if there are any failures in the output by looking for non-zero failed count
      const lines = output.split('\n');
      let hasFailures = false;

      for (const line of lines) {
        if (line.includes('│') && line.includes('failed')) {
          // Extract the failed count from the table
          const parts = line.split('│');
          if (parts.length >= 3) {
            const failedCount = parseInt(parts[2].trim());
            if (failedCount > 0) {
              hasFailures = true;
              break;
            }
          }
        }
      }

      if (hasFailures) {
        throw new Error('API tests failed - found failed assertions');
      }

      console.log('✅ API tests passed!');
      return true;
    } catch (error) {
      console.log(`❌ Attempt ${attempt}/${MAX_RETRIES} failed: ${error.message}`);

      if (attempt < MAX_RETRIES) {
        console.log(`⏳ Waiting ${RETRY_DELAY/1000} seconds before retry...`);
        await sleep(RETRY_DELAY);
      } else {
        console.log('💥 All API test attempts failed');
        throw error;
      }
    }
  }
}

runApiTests().catch(() => {
  console.log('🚨 API tests failed after all retries');
  process.exit(1);
});