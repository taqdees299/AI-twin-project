document.addEventListener("DOMContentLoaded", function () {

    /* ================= LOGIN FORM ================= */
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let username = document.getElementById("username").value.trim();
            let password = document.getElementById("password").value.trim();
            let msg = document.getElementById("msg");

            if (username === "" || password === "") {
                msg.style.color = "red";
                msg.innerHTML = "Please enter username and password!";
                return;
            }

            fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    msg.style.color = "red";
                    msg.innerHTML = data.error;
                } else {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("username", username);

                    msg.style.color = "lightgreen";
                    msg.innerHTML = "Login Successful! Redirecting...";

                    setTimeout(() => {
                        window.location.href = "dashboard.html";
                    }, 1000);
                }
            })
            .catch(err => {
                msg.style.color = "red";
                msg.innerHTML = "Server Error!";
                console.error(err);
            });
        });
    }

    /* ================= DASHBOARD ================= */
    const welcomeText = document.getElementById("welcomeText");

    if (welcomeText) {

        let isLoggedIn = localStorage.getItem("isLoggedIn");
        let username = localStorage.getItem("username");

        if (isLoggedIn !== "true") {
            window.location.href = "login.html";
            return;
        }

        welcomeText.innerHTML = `Hello <b>${username}</b>, your AI Twin is ready!`;

        let userNameBox = document.getElementById("userName");
        if (userNameBox) {
            userNameBox.innerHTML = username;
        }

        /* ================= ENTER KEY FIX ================= */
        const inputBox = document.getElementById("userMessage");

        if (inputBox) {
            inputBox.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    sendMessage();
                }
            });
        }

        loadMemory();
        loadChatHistory();
    }

});

/* ================= LOGOUT ================= */
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "login.html";
}