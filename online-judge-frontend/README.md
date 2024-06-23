
# Online Judge System

A web application for online judge(algorithm questions), built with MERN stack( MongoDB, Express, React and Node.js ).
This online judge application is used to practice programming to solve algorithm questions. It can compile and execute code, and test them with pre-constructed data. The output of the code will be captured by the system, and compared with the standard output. The system will then return the result.
Three languages are currently supported, including Java, Javascript and Python.
  
 
## Description

This application is used to solve algorithm questions. You can submit the solution to see if it passes all test cases. Below are the available features.

- Token Based Authentication - Register, Login, Auto Login, User Profile, etc.
- Question Management - Create, Update, Delete question.
- Judging System - Judging Engine, Solution Template, Submission History, Multi-programming language support.
- Programming Languages - Three languages are currently supported, including Java, Javascript and Python.

The following functions are under development.
- Contest - Generate contest by randomly selecting four questions from the question library.
- Collaborative code editor - Different users can work on the same solution simultaneously.


### Tech Stack:
The Server is built with Express and MongoDB. The used libraries for server are listed as follows.

- RESTful API: express, express router, mongoose, cors
- Logging: morgan, winston
- User Authentication: jsonwebtoken, passport, cookie-parser, express-jwt

The Client is built with React and 3rd-party libraries

## Installation

Install project with npm

```bash
git clone https://github.com/ahmed-tahoon/Online-Judge-Mern
cd Online-Judge-Mern
npm install 

```
    
