# Storefront Backend Project

# Image Processing API project

This is a simple project that was required in my advanced web-development track course of UDACITY.

## Instructions:

**To install all the packages**: Type "npm install" ot "yarn" in the terminal. 

**To Setup Database**: Create a ".env" file and to it your all the database variables you will need in the "database.json" file. 
                       The database is running on por "5432".

**To Run the server**: Type "npm start" in the terminal at the root directory. The server is running on port "3000"

**To Run Unit Tests**: Type "npm test" in the terminal at the root directory.


  

### The ENV variables
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefronttest
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123
ENV=test
BCRYPT_PASSWORD=mysecretpassword
SALT_ROUNDS=10
TOKEN_SECRET=fuckinsecrettoken


**NOTE** ENDPOINT documentation and RELATIONAL SCHEMA is written in the REQUIREMENTS.md

**NOTE** To run the your test database set the environment variable "ENV" in the ".env" file to "test". Else set it to "dev".
