const express = require('express');
const router = express.Router();
const auth = require('./auth');
const roomsManagement = express.Router();

const roomsList = [];
let roomId = 1;

roomsManagement.get('/allRooms', auth.userAuthentication, (req, res) => {
    res.json(roomsList);
});

roomsManagement.get('/roomById', auth.userAuthentication, (req, res) => {
    const id = req.query.id;
    const room = roomsList.find(room => room.id === Number(id));
    res.json(room);
});

roomsManagement.post('/addRoom', auth.userAuthentication, (req, res) => {
    const roomToAdd = JSON.parse(req.body);
    const currRoom = roomsList.find(room => room.name === roomToAdd.name);

    if (currRoom) {
        res.status(403).send(`Room name "${roomToAdd.name}" is already exists`);
        return;
    }

    roomToAdd.id = roomId;
    roomId++;
    roomsList.push(roomToAdd);
    res.sendStatus(201); //Created
});

roomsManagement.post('/updateRoom', (req, res) => {
    const updatedRoom = JSON.parse(req.body);
    const roomIndex = roomsList.findIndex(room => room.name === updatedRoom.name);
    
    //TODO: check if room index is not null, and send 403
    
    roomsList[roomIndex] = updatedRoom;
    res.sendStatus(201);
});

roomsManagement.post('/removeRoom', (req, res) => {
    const roomToDelete = JSON.parse(req.body);
    const roomIndex = roomsList.findIndex(room => room.name === roomToDelete.name);
    console.log("num of rooms BEFORE: " + roomsList.length);
    roomsList.splice(roomIndex, 1); //At position 'roomIndex', remove 1 item
    console.log("num of rooms AFTER: " + roomsList.length);
    res.sendStatus(201);
});

//TODO: add checks to all the functions


module.exports = roomsManagement;