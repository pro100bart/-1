### About:
This is repository contains Currency and Exchange api automation smoketests

### Endpoints description:
API Doc: 
http://qa-test.cloudbeds.com/app_dev.php/api/v1/doc

    Currency :
    /api/v1/currencies/
    	GET  /api/v1/currencies/
    	POST  /api/v1/currencies/
    /api/v1/currencies/{id}
        DELETE  /api/v1/currencies/{id}
        GET  /api/v1/currencies/{id}

    Exchange:
    /api/v1/exchange/
        POST /api/v1/exchange/

### Test cases:
    Currency:
        - Get all currencies as user
        - Create and delete currency as admin
        - Get currency by id 510 as user
    Exchange:
        - Do exchange of 15 from currency id 86 to currency id 87 as user

### System requirements:
OS: Linux, Mac

### Tools:
- 	 node.js

Necessary npm packages (described in package.json):
- 	cucumber
- 	https
-   request
-   assert
-   faker

### How to:
To run the tests just follow the steps:

1) Clone the repository
2) Install node modules

    cd test
    
    npm install

3) Run the tests


    /node_modules/cucumber/bin/cucumber-js features/currencyAndExchangeSmokeTest.feature


