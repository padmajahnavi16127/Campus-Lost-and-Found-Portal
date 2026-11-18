
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = "Registration successful! Please login.";
            message.style.color = "green";

            registerForm.reset();

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {
            message.textContent = data.message || "Registration failed";
            message.style.color = "red";
        }

    } catch (error) {
        message.textContent = "Server connection failed";
        message.style.color = "red";
    }
});
