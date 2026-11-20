import { randomUUID } from 'node:crypto';

// Generate unique test data for registration and other test scenarios.
export function generateTestUser() {
  // UUID provides a practically collision-free identifier for each test run.
  const uniqueId = randomUUID().replace(/-/g, '');

  return {
    firstName: 'QA',
    lastName: 'Tester',
    street: 'Test Road',
    city: 'Nairobi',
    state: 'Nairobi',
    zipCode: '00100',
    phone: '0712345678',
    ssn: uniqueId.slice(0, 5),

    // Prefix identifies this as a Playwright portfolio test account.
    username: `pwqa_${uniqueId}`,
    email: `pwqa_${uniqueId}@example.com`,

    password: 'Test@12345',
  };
}