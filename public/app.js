function sessionCreate(){
  const mySession = Math.floor(Math.random() * 1000);
  return mySession;
}
const socket = new WebSocket(
    `ws://localhost:8080/start_web_socket?sessionName=${sessionCreate()}`,  // put username from url
);

socket.onmessage = (m) => {
  const data = JSON.parse(m.data);
  switch(data.event){
    case "login-success":
      window.location.href="/main.html"
      break;
  }

}

window.onload = () => { 
    // when the client hits the ENTER key
    document.getElementById("active").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const nameInput = document.getElementById("name");
        const passInput = document.getElementById("password");
        const activeInput = document.getElementById("active");
        var username = nameInput.value;
        var password = passInput.value;
        var active = activeInput.value;
        nameInput.value = "";
        passInput.value = "";
        activeInput.value = "";
        socket.send(
          JSON.stringify({
            event: "send-user-info",
            username: username,
            password: password,
            activity: active,
          }),
        );
      }
    });
  };