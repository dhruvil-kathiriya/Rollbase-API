# Rollbase API

This repository contains an API implementation for interacting with Rollbase, designed to facilitate various operations and integrations with Rollbase applications.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The Rollbase API simplifies communication with Rollbase applications by providing endpoints and functionalities to manage Rollbase resources programmatically.

## Features

- Authentication with Rollbase
- Retrieve, create, update, and delete records in Rollbase applications
- Perform operations specific to Rollbase application customization and configurations

## Getting Started

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/dhruvil-kathiriya/Rollbase-API.git
    ```
2. Navigate to the project directory:

   ```bash
   cd Rollbase-API
    ```
2. Install dependencies:

   ```bash
   npm install

    ```

## Configuration

Before using the Rollbase API, you need to set up configuration details for Rollbase authentication. Create a .env file in the root directory and add the following:

```env
SESSION_SECRET = your_SESSION_SECRET
SMTP_USER = your_smtp_username
SMTP_PASS = your_smtp_password

```
Replace your_rollbase_base_url, your_rollbase_username, and your_rollbase_password with your Rollbase base URL, username, and password.
## Usage
After setting up the configuration, start the server:

```bash
npm start

```
The API endpoints will be accessible at http://localhost:8003.

### API Endpoints
The Rollbase API provides the following endpoints:

- `POST /auth`: Authenticate with Rollbase
- `GET /records`: Retrieve all records
- `GET /records/:id`: Retrieve a record by ID
- `POST /records`: Create a new record
- `PUT /records/:id`: Update a record by ID
- `DELETE /records/:id`: Delete a record by ID

### Technologies Used

- Node.js
- Express.js
- MongoDB 

### Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, feel free to open an issue or create a pull request. 

### License
This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
