<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

### System management API for pharmacy drug database using [NestJS](https://github.com/nestjs/nest).

## Drumed Medicine: RESTful API for Medication Management

Drumed Medicine provides a comprehensive RESTful API designed for efficient and secure medication management. This API is crafted to meet the needs of healthcare professionals and patients, ensuring robust security, data integrity, and usability. Below, we outline the key features and best practices that make Drumed Medicine a reliable solution for managing medications.

### Authentication
Drumed Medicine employs a multi-layered authentication system to safeguard access to the API:

Email-Based Authentication: Users authenticate using their email addresses. Passwords are securely managed through advanced cryptographic methods, including hashing and salting, to protect sensitive information.

Encrypted Code Verification: Post-login, users receive an encrypted verification code via email. This code is essential for confirming the user’s identity and ensuring secure access.

Secure Links: Verification links sent via email are securely generated and contain temporary tokens. These links are used to validate the authentication process, preventing unauthorized access and ensuring secure communication.

### Rate Limiter
To defend against abusive behaviors such as Distributed Denial of Service (DDoS) attacks and brute force attempts, Drumed Medicine includes a rate limiter:

Request Throttling: The rate limiter restricts the number of requests that can be made by a user in a given timeframe. This helps in mitigating server overload and ensures fair access for all users.

Activity Monitoring: Traffic patterns are continuously monitored to detect and respond to unusual activities. In case of suspicious behavior, additional protective measures, such as IP blocking or extra verification, may be applied.

### Logging
A detailed logging system is integral to Drumed Medicine, enhancing transparency and facilitating issue resolution:

Activity Logs: Every API request is logged with relevant details, including the user’s identity, request type, and timestamp. This logging aids in tracking API usage and performance.

Error and Exception Logs: Errors and exceptions are recorded with comprehensive context, which supports effective troubleshooting and maintenance.

Security and Compliance Logs: Authentication events and sensitive operations are logged to ensure compliance with security standards and regulatory requirements, providing a clear audit trail.

### Sanitization and Validation
Ensuring data integrity and security is a top priority for Drumed Medicine, achieved through rigorous sanitization and validation practices:

Input Sanitization: All incoming data is sanitized to eliminate potentially harmful elements, preventing attacks like SQL injection and ensuring data security.

Data Validation: The API validates input data to ensure it adheres to expected formats, contains required fields, and complies with allowed values. This prevents erroneous or malicious data from being processed or stored.

Protection Against Malicious Data: Data validation also includes checks to prevent the introduction of harmful data, preserving the integrity and functionality of the system.

### Detailed Documentation: Swagger
To enhance usability and facilitate integration, Drumed Medicine provides detailed API documentation:

Swagger Documentation: Comprehensive API documentation is available through Swagger. This interactive documentation includes clear descriptions of endpoints, parameters, request and response formats, and error codes. Swagger’s user-friendly interface allows developers to explore and test the API directly, streamlining the development process and improving overall API usability.
In conclusion, Drumed Medicine offers a robust and secure RESTful API for medication management. With its advanced authentication mechanisms, effective rate limiting, comprehensive logging, stringent data validation, and detailed Swagger documentation, the API is designed to provide a secure, reliable, and user-friendly experience for managing medications.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Images
<p align="center">
  <img src="src\0_utils\1.jpg" width="600">
  <img src="src\0_utils\2.jpg" width="600">
</p>