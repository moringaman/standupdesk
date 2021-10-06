#!/usr/bin/env node

const fetch = require("node-fetch");

let d = new Date();
// let day = d.getDay();
let hours = d.getHours();
let minutes = d.getMinutes() / 100;
let time = hours + minutes;

const main = async () => {
  try {
    let result = await apiCall("GET", "deskPos");
    //  const position = result.split(",")[2] //?
    console.log("position", result.split(",")[2].includes(0));
    if (result.split(",")[2].includes(1)) {
      //go up
      console.log("desk is down");
      await apiCall("POST", "up");
      console.log("desk is now up");
    } else {
      //go down
      console.log("desk is up");
      await apiCall("POST", "down");
      console.log("desk id now down");
    }
  } catch (err) {
    console.log(err);
  }
};

const apiCall = (method, arg) => {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.SPARK_TOKEN}`);

  var urlencoded = new URLSearchParams();

  var requestOptions = {
    method: method,
    headers: myHeaders,
    body: method === "POST" ? urlencoded : null,
    redirect: "follow",
  };

  return fetch(
    `https://api.particle.io/v1/devices/24003e000e51353338363333/${arg}`,
    requestOptions
  )
    .then(
      (response) => response.text() //?
    )
    .then((results) => {
      //   console.log(result)
      results; //?
      return results;
    })
    .catch((error) => console.log("error", error));
};

(() => {
  if (time > 8.3 && time < 18.3) {
    main();
  } else {
    return;
  }
})();
