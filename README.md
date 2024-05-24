# SCRIBBL PRD →

## Description →

Pictionary application where people are able to join a room and play pictionary. Winners are decided at the end.

One person is able to create a room which others are able to join.

## Specifications →

- **Multiplayer game**

  - Rooms which multiple can join
  - Each room should have a configurable player limit
  - Each room will have a certain set of common settings
- **Parts of each room -**

  - Players (min - 2, max - set according to room creator)
  - Canvas (which is shared to all players → live canvas)
  - Tools to draw on canvas -
    - V0 -
      - Pencil
      - Eraser
      - Erase all
      - Undo and Redo
    - V1 -
      - Colors
      - Color Picker
      - Stroke types
      - Pen type
      - Shapes
  - Chat / Guessing area
    - V1 - Hint if the guess is close enough
  - Word Selection Component
    - V0 - Give one word to each player who has a turn
    - V1 - Give user a selection between a few words
  - Timer (To time each round)
    - V0 - Timer would be fixed
    - V1 - Timer would be made configurable to room creator
  - Word Length Component
  - Players list
    - Leaderboard
    - Which player has turn
- **Scoring Engine**

  - Delta based scoring formula → Delta = Max Points (500) / Number of Players
    - For guessing players - Each guessing player starts with 500 points (each player who is able to make the correct guess). Now ‘D’ points are reduced every time another players guesses before this player.
    - For drawing player - The player starts with 0 points and for each guessing player guessing correctly ‘D’ points are added.
- **Game Creation Mechanism -**

  - V0 -
    - Details of player → Name, Avatar
    - Number of rounds
  - V1 -
    - Number of players
    - Max time for each round
    - Custom Words (Word difficulty)
    - More configurable avatars
- **Invitation Mechanism -**

  - A token which represents a room which can be joined. Invite Token.
  - URL → token would be the identifying unique part of this URL.

## Technical Requirements →

Considering that Product and Tech teams are both technically sound, product teams make tech suggestions to tech team under technical requirements.

Technical Questions and problems to be solved.

1. Chatting and Game Session →

   1. Web Sockets or Long Polling - Web Sockets for chat and canvas. Other updates using long polling
2. Authorisation → Token based (JWT)
3. Development Stack → Company (Node.JS and React)
4. Efficient way to serialise canvas data

## Future Scope (V2 features) → 

- Ability to kick people from a room
- Permanent Groups
- Room Randomiser
- Currently, we do not require any persistent storage i.e. database as we can develop this application in memory. At a later stage, we can have things like persistent users, long term user leaderboards, permanent groups, dashboards etc.
