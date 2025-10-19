# Backend Wizards — Stage 0 Task

## Description

This is a simple RESTful API built with Node.js and Express.js that returns my personal profile information along with a andom cat fact fetched dynamically from the [Cat Facts API](https://catfact.ninja/fact).

### Features

- GET `/me` endpoint returns a json data of something like this:
  {
  "status": "success",
  "user": {
  "email": "afakiryahamman@gmail.com",
  "name": "Hamman Afakirya",
  "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-17T14:05:22.345Z",
  "fact": "The cat appears to be the only domestic companion animal not mentioned in the Bible."
  }

#### Dependencies

express: Web server framework
express-rate-limit: Prevent too many requests
-Devdependencies
nodemon: to watch for changes

Setup Instructions

1 Clone the Repository

```bash
git clone https://github.com/Afaks-11/Backen-Wizard-HNG-Stage-0-Task.git
cd Backen-Wizard-HNG-Stage-0-Task

2 npm install
3 create an env file for the PORT nuber or || 8000
4 npm start
```

Github repo 
https://github.com/Afaks-11/Backen-Wizard-HNG-Stage-0-Task.git
