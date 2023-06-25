let isMyMsg = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (userInput.value && username.value) {
    const sendData = {
      message: userInput.value,
      username: username.value,
    };
    socket.emit("messages", sendData);
    userInput.value = "";
    isMyMsg = true;

    if (isMyMsg) {
      container.classList.add("main");
    } else {
      container.classList.remove("main");
    }
  }
});

function createMessageItem(msg) {
  const div = document.createElement("div");
  div.classList.add("welcome_message");
  div.textContent = `${"방문자"}님! ${msg}`;
  document.body.appendChild(div);

  return div;
}

function removeMessageItem(div) {
  setTimeout(() => {
    div.style.cssText = `
            opacity:0;
            visibility:hidden;
            transform: translate(-40%)
        `;
  }, 4000);
}

// 서버에서 유저의 메시지에 응답시 클라이언트 측에서 받는 곳
socket.on("messages", (msg) => {
  console.log(msg);

  // 요소 생성
  const li = document.createElement("li");
  const msgSpan = document.createElement("span");
  const span = document.createElement("span");
  const profileSpan = document.createElement("span");

  // 속성 추가
  span.classList.add("time_span");
  profileSpan.classList.add("profile_span");
  span.innerHTML = new Date().toLocaleTimeString();
  msgSpan.textContent = msg.message;

  //dom 연결
  li.appendChild(span);
  li.appendChild(msgSpan);
  li.appendChild(profileSpan);
  messages.appendChild(li);
  window.scrollTo(0, container.scrollHeight);
});

socket.on("hi", (msg) => {
  sessionStorage.getItem(`${username.value}`);
  const div = createMessageItem(msg);
  removeMessageItem(div);
});

socket.emit("login", username);
