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
      execSync('npm run test:api', { stdio: 'inherit' });
      console.log('✅ API tests passed!');
      return true;
    } catch (error) {
      console.log(`❌ Attempt ${attempt}/${MAX_RETRIES} failed`);

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