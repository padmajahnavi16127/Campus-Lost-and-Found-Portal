
const claimForm = document.getElementById("claimForm");

claimForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const message = document.getElementById("claimMessage");

    if (!token) {
        message.textContent = "Please login first.";
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);

    const itemId = urlParams.get("itemId") ||
        document.getElementById("itemId").value;

    const claimData = {
        itemId: itemId,
        message: document.getElementById("message").value,
        contact: document.getElementById("contact").value
    };

    try {
        const response = await fetch("/api/claims", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(claimData)
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = "Claim submitted successfully!";
            claimForm.reset();
        } else {
            message.textContent = data.message || "Claim failed.";
        }

    } catch (error) {
        message.textContent = "Server connection failed.";
    }
});
