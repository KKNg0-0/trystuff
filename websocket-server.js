// https://deno.land/std@0.194.0/http/server.ts?s=serve

import { serve } from "http/server.ts";
// https://deno.land/std@0.194.0/http/file_server.ts?s=serveDir
import { serveDir } from "http/file_server.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const connectedClients = new Map();

const app = new Application();
const port = 8080;
const router = new Router();

router.get("/start_web_socket", async (ctx) => {
  const socket = await ctx.upgrade();
  const sessionNow = ctx.request.url.searchParams.get("sessionName");    // get username from url (?username="username")
  socket.session = sessionNow; // store sessionNow in socket.session <- socket.(session) is key to get the sessionNow

  socket.onmessage = (m) => {
    const data = JSON.parse(m.data);
    switch (data.event) {
        case "send-user-info":  //  receive user info(username, password, activity)
            socket.send(
              JSON.stringify({
                  event: "login-success",
                  username: data.username,  // send back the user info
                  activity: data.active,  // send back the activity info
              }),
            );
            break;

        case "login-success":
          
          if(localStorage.getItem("useruser") === null){  // if there was no user who sent the data(qr read) first
            const userAB = ([userA, userB]);
            localStorage.setItem("useruser", userAB);
          }else if(localStorage.getItem("useruser") !== null){
            const userAB = ([userA, userB]);
            const userBA = localStorage.getItem("useruser");
            if((userAB[1] === userBA[1])){
              localStorage.removeItem("useruser");
              for (const client of connectedClients.values()) {
                client.send(
                  JSON.stringify({
                    event: "userOK",
                    isOK: "GOOD",
                  }),
                );
              };
            }else{
              for (const client of connectedClients.values()) {
                client.send(
                  JSON.stringify({
                    event: "userOK",
                    isOK: "BRUH",
                  }),
                );
              };
            };
          }; 
      break;
    }
  };
});


app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/`,
    index: "public/index.html",
  });
});

console.log("Listening at http://localhost:" + port);
await app.listen({ port });