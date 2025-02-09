# Demo Credit Wallet MVP

An API for managing user wallets, transactions, and funds.

## Features

- Register users (Blacklist check)
- Fund wallet
- Transfer funds
- Withdraw funds

## Tech Stack

- Node.js (LTS)
- TypeScript
- Knex.js (ORM)
- MySQL
- Jest (Testing)

## API Documentation

https://docs.google.com/document/d/1Hrx6GJ5wlTICYWTRIXPJ1vR-KkPXM3SvzG7DD2FfpyQ/edit?usp=sharing

## Database Schema

![E-R Diagram](<public/Lendsqr%20(1).png>)

## Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Configure `.env`
4. Run migrations: `knex migrate:latest`
5. Start the server: `npm run dev`

## Testing

This project uses Jest for unit testing. The test cases cover both positive and negative scenarios for wallet operations.

### Running Tests

Run the following command to execute the test suite:

```sh
npx jest --config jest.config.js
```

### Jest Unit Tests

#### User Registration

- ✅ Successfully registers a new user
- ❌ Fails to register with an existing email
- ❌ Fails if required fields are missing

#### Fund Wallet

- ✅ Successfully funds wallet
- ❌ Fails with invalid amount (e.g., negative or zero)
- ❌ Fails if user does not exist

#### Transfer Funds

- ✅ Successfully transfers funds between users
- ❌ Fails if sender has insufficient balance
- ❌ Fails if receiver does not exist
- ❌ Fails if sender and receiver are the same

#### Withdraw Funds

- ✅ Successfully withdraws funds
- ❌ Fails if user has insufficient balance
- ❌ Fails with invalid amount (e.g., negative or zero)
