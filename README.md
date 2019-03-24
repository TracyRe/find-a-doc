# _Find-a-Doc_

#### Doctor finder project for Epicodus

_Published_ **March 24 2019**<br>
_Author_ **Tracy Reith**

1. [Description](#description)
1. [Learning Objective](#learning-objective)
1. [Target Audience/Users](#target-audience/users)
1. [User Stories](#user-stories)
1. [Product Requirements](#product-requirements)
1. [Non-technical Requirements](#non-technical-requirements)
1. [Assumptions](#assumptions)
1. [Development Specs](#development-specs)
1. [Installation](#installation)
1. [Known Bugs](#known-bugs)
1. [Technologies Used](#technologies-used)
1. [License](#license)

### Description
When you are sick, you need a doctor. This application will help you locate a doctor in your city who can treat your symptoms and underlying cause. Created for Epicodus Front End Development course.

### Learning Objective
Make API calls and return data to the user.

### Target Audience/Users
* Sick people / people with a medical condition
* Parents of sick children
* People who don't have a primary care physician

### User Stories
**As a** parent,<br>
**I want** to enter my child's symptoms,<br>
**So that** I find a doctor who can treat her.

**As a** parent,<br>
**I want** to know how I can contact doctors,<br>
**So that** I can set up an appointment to see my child.

**As a** patient,<br>
**I want** to see where each doctor is located,<br>
**So that** I can choose the most convenient for me.

**As a** patient,<br>
**I want** to know which doctors are accepting new patients,<br>
**So that** I don't waste time contacting doctors that aren't accepting new patients.

**As a** patient,<br>
**I want** to find a specific doctor,<br>
**So that** I can get information about that doctor.

### Product Requirements
* The user should be able to enter a medical issue and get back a list of doctors, in the Portland area, who treat that issue
* The user should be able to search for a doctor by name
* Doctor information returned needs to include: doctor name (first and last), address, phone number, website, whether doctor is accepting new patients
* When no results are found, the application should give a polite message to that effect

### Non-technical Requirements
* The application should be self-apparent how to use: when people are sick or stressed, their cognitive capacity is reduced

### Assumptions
* Doctors may have multiple practices with multiple phone numbers and addresses
* Practice addresses and phone numbers may be duplicated in the database
* Not all practices list a website
* For the purpose of this project, I will use
 * Only the first practice address available
 * Only the first phone number available in the first practice listed
 * A website only if listed for the first practice listed 

### Development Specs

Specification | Input | Output
------------- | ----- | ------
Entering symptom should return list of doctors tagged with that symptom | "sore throat" | "Dr Jane Jones, Dr Osman Khan, Dr Ed Smith"
Entering doctor name (first, last, or first and last) should return list of doctors with that name | "Torkelson" | "Dr Anna Torkelson, Dr Ed Torkelson, Dr Evan Torkelson"
Doctor details consist of: doctor name (first and last), address, phone number, website,  accepting new patients (Y/N) | "Ed Torkelson" | "Ed Torkelson, 1960 NW 167th Place, Suite 204, Beaverton OR 97006, (503) 614-8735‬, https://www.providence.org/, Accepting New Patients"
If no results are found, return a message that no results are found | "Twisted noodles" | "We're sorry, we are unable to find anything to match your search. Try different words to describe your symptoms."

### Installation
* Clone from https://github.com/TracyRe/find-a-doc.git
* Run `$ npm install`
* Get an API key from [BetterDoctor API](https://developer.betterdoctor.com/)

### Known Bugs
* None identified

### Technologies Used
* HTML
* Sass with variables and mixins
* Javascript with jQuery
* API

### License
[MIT](./LICENSE.txt)

Copyright (c) 2019 Tracy Reith
