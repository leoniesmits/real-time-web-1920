# Lyric guessing game

<p align="center"><b>Battle your friend in lyric-knowledge. Choose a decade, load songs and guess lyrics.</p></b>

![preview](github/screen.png)
_This is what the screen should have looked like._

## Introduction
This project was an assignment of [@cmda-minor-web](https://github.com/cmda-minor-web/real-time-web-1920). The goal of this course was to create a real time app based on [sockets](https://socket.io/). 

I used the API from musixmatch.com to get lyrics and track details. My plan is to present the user with a piece of lyric of an unknown random track. There are 4 track titles loaded, the user has to guess to which the lyrics belong.

The real time aspect is to do this with multiple users in a room, to make it a battle.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [Diagram](#diagram)
- [My app](#my-app)
  - [Features](#features)
  - [Users](#users)
  - [Getting data](#getting-data)
  - [Game](#game)
  - [Score](#score)
- [To do](#to-do)
- [Credits](#credits)
- [License](#license)


## Setup and Installation
**1. Clone repository:**
```
git clone https://github.com/leoniesmits/real-time-web-1920.git
```
**2. Get all dependencies:**
```json
{
"dependencies": {
    "axios": "^0.19.2",
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "dotenv": "^8.2.0",
    "ejs": "^3.0.1",
    "express": "^4.15.2",
    "express-session": "^1.17.1",
    "http-errors": "^1.7.3",
    "request": "^2.88.2",
    "socket.io": "^2.3.0"
  }
} 
```
Run:
```
npm install
```

**3. Build and start server:**
```
nodemon
```

**4. Open the app**

Navigate to [localhost:1400](localhost:1400) in your browser to see the app.

## Diagram

![diagram image](/github/diagram.png)

### Features 
- Players pick a decade to fetch lyrics
- 2 players can be in one room
- 3rd players watch, until game is over
- Time progress bar runs out, each level is 10 seconds

### Users

## Credits
[Guido Bouman](https://github.com/guidobouman) for live-coding    

## License
MIT © Leonie Smits
