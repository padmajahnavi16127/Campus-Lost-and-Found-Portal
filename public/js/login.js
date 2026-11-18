
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {

            if (!data.token) {
                message.textContent = "Login response does not contain a token.";
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            message.textContent = "Login successful!";

            if (data.user.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "dashboard.html";
            }

        } else {
            message.textContent = data.message || "Login failed";
        }

    } catch (error) {
        message.textContent = "Server connection failed";
        console.log(error);
    }
});
