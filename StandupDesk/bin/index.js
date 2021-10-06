#!/usr/bin/env node

const yargs = require("yargs")
const fetch = require('node-fetch')

const options = yargs
 .usage("Usage: -p < position - up | down >")
 .option("p", { alias: "position", describe: "Desk Position", type: "string", demandOption: true })
 .argv;

const greeting = `Desk going, ${options.p}!`;

console.log(greeting);


const deskCommand = (arg) => {

    if (arg === '') return

var myHeaders = new fetch.Headers();
myHeaders.append("Authorization", `Bearer ${process.env.SPARK_TOKEN}`);

var urlencoded = new URLSearchParams();

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch(`https://api.particle.io/v1/devices/24003e000e51353338363333/${arg}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}

deskCommand(options.p)
