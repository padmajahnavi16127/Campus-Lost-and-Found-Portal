
const reportForm = document.getElementById("reportForm");

reportForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const message = document.getElementById("message");

    if (!token) {
        message.textContent = "Please login first.";
        return;
    }

    // Collect form details
    const formData = new FormData();

    formData.append("itemName", document.getElementById("itemName").value);
    formData.append("category", document.getElementById("category").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("location", document.getElementById("location").value);
    formData.append("date", document.getElementById("date").value);
    formData.append("type", document.getElementById("type").value);

    const image = document.getElementById("image").files[0];

    if (image) {
        formData.append("image", image);
    }

    try {
        const response = await fetch("/api/items", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = "Item reported successfully!";
            reportForm.reset();
        } else {
            message.textContent = data.message || "Report failed.";
        }

    } catch (error) {
        message.textContent = "Server connection failed.";
        console.log(error);
    }
});
