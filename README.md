# Local League "Companies" endpoint

## Installation

```sh
npm install @localleague/companies-endpoint 
```

## Usage

Import the endpoint package & pass a Restify server instance:
```javascript
require('@localleague/companies-endpoint')(server);
```
And you're good to go!

## Test 

Run migration, which creates a "company" table in the test database:
```sh
npm run db:test:migrate 
```

Run integration tests for the endpoint:
```sh
npm run test:integration 
```
## Documentation

The documentation for the endpoint is generated using the [OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md) specifications and [Swagger](https://swagger.io).

Using the path "/swagger.json" the JSON representation of the docs can be retrieved and used in the [Swagger Editor](http://editor.swagger.io) for reading and testing.

## Todo

1. Create unit tests

## Issues
