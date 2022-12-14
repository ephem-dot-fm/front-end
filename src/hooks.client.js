import { connect, io } from "socket.io-client";
import { connected } from './stores.js'
import { onDestroy } from 'svelte'
import { parseCronExpression } from 'cron-schedule'

/**
 * SECTION: Connect to Socket
 */
let socketConnected = false;

const unsubscribe = connected.subscribe((value) => (socketConnected = value));
console.log(socketConnected)

let socket

const handleParsed = (parsedData) => {
    const keys = Object.keys(parsedData)

    // if what was retrieved was current shows
    if (keys[0] === 'current_shows') {
        console.log('we got shows');
    }

    // if what was retrieved was color values
    if (keys[0] === 'current_colors') {
        console.log('we got colors');
    }
}

if (socketConnected === false) {
    console.log('starting socket');
    socket = new WebSocket('ws://localhost:8000/ws/1');
}

socket.onopen = function (event) {
    console.log("[open] Connection established");
    connected.set(true)
};

socket.onmessage = function (event) {
    console.log("[message] Data received from server, ", event);
    const parsed = JSON.parse(JSON.parse(event.data))
    handleParsed(parsed)
};