
# Final Project: Learn Hmong App

## Requirements:

### Be sure to have node.js installed.  
https://nodejs.org/en/download/

### Be sure to have MongoDB installed. Create a database called "hmongames"
1. Run mongod to start the MongoDB server process
2. Run mongo hmongames to create hmongames DB if it wasn't created already

Useful Links:
MongoDB installation manual - https://docs.mongodb.com/manual/installation/
Mongoose Node Module - http://mongoosejs.com/

## Quick Start

You will need to download the repository first, then install the UI and Backend dependencies.  

### Starting the UI or Frondend server

1. Navigate to the UI folder.  

```bash
cd .\ui
```

2. Install all depedencies

```bash
npm install
```

3. Install Ionic and Cordova globally.  
```bash
npm install -g ionic cordova cordova-res
```

4. Add platforms on cordova so that your app can be built on android, ios, and browsers. 

ios
```bash
ionic cordova platform add ios
```

android
```bash
ionic cordova platform add android
```

browser
```bash
ionic cordova platform add browser
```
5. Add the Native audio cordova plugin
```bash
ionic cordova plugin add cordova-plugin-nativeaudio
```
6. Install the native audio on node.js
```bash
npm install @ionic-native/native-audio
```

7. Lastly start the frontend server.  

Start on Dev environment
```bash
ionic serve
```

Start on browser environment
```bash
ionic cordova run browser
```

Start on ios environment
```bash
ionic cordova ios browser
```

Start on android environment
```bash
ionic cordova android browser
```
### Starting the Backend or API server

1. Navigate to the backend folder.  

```bash
cd .\backend
```

2. Install all depedencies

```bash
npm install
```

3. Run the server
```bash
node server.js
```

### Application Info

#### Author
Sony Yang

#### Description
This is a project designed for the SWDV 665 Final project.  The purpose is to help kids, teenagers, and adults learn hmong in a fun and interactive way.  
