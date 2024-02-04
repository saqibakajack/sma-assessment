# SMA Assessment
This is the submission for the SMA assessment. 

## Overview
This project implements a fare calculation system for the Singa Metro Authority (SMA), designed to work with a public transport system. The system currently handles fare calculations across two lines: Red and Green.

## Features
 - Fare Calculation: Calculates fares based on the line traveled, without considering specific stations to simplify the model.
 - Peak and Non-Peak Hours Pricing: Adjusts fares based on defined peak hours, with different rates for traveling within the same line or across lines.
 - Fare Caps: Implements daily and weekly fare caps to protect commuters from overcharging, with caps varying by travel patterns (same line vs. different lines).

## How to Run

### Prerequisites
- Node.js v20.x.x
- NPM v10.x.x
- Yarn

### Steps
1. Clone the repository
    ```bash
    git clone https://github.com/saqibakajack/sma-assessment.git
    ```
2. Install the dependencies
    ```bash
    yarn install
    ```
3. Add the data in any csv file. For example, `data.csv`:
   ```csv
    Green,Green,2021-03-24T07:58:30
    Green,Red,2021-03-24T09:58:30
    Red,Red,2021-03-25T11:58:30
   ```
4. Start the application
    ```bash
    yarn run start -- -p /path/to/data.csv
   ```