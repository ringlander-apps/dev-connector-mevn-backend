# API requirements for **registering** a user

### 1. There **should** be a **'GET'** route 'api/v1/auth/test'

1. Request **should** return:

   - Status: 200
   - JSON('This is a test');

   [Test case](../../tests/routes/api/auth/auth.test.js "Testing GET Request")

### 2. There **should** be a **'POST'** route 'api/v1/auth/register'

1. The following parameters **should** be attached in the request body:

   - Name (parameter name: 'name')
     - **TC-001** 'name' is required
     - **TC-002** 'name' should be between 2 and 30 characters long
   - Email (parameter name: 'email')
     - **TC-003** Parameter 'email' IS required
     - **TC-009** Parameter 'email' SHOULD be unique
     - **TC-004** Parameter 'email' SHOULD be of valid format
   - Password (parameter name: 'password')
     - **TC-005** Parameter 'password' IS required
     - **TC-006** Parameter 'password' SHOULD be between 6 and 30 characters long
   - Confirmation Password (parameter name: 'password2')
     - **TC-007** Parameter 'password2' IS required
     - **TC-008** Parameter 'password2' SHOULD match 'password'

2.
