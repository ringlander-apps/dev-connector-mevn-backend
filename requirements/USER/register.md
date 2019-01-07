# API requirements for **registering** a user

### 1. There **should** be a **'GET'** route 'api/v1/auth/test'

1. Request **should** return:

   - Status: 200
   - JSON('This is a test');

### 2. There **should** be a **'POST'** route 'api/v1/auth/register'

1. There **should** be parameters attached in the body:
   - Name
   - Email
     - (**should** be unique)
   - Password
   - Confirmation Password
2.
