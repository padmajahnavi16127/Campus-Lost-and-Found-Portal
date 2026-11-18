
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");

const welcomeMessage = document.getElementById("welcomeMessage");
const myItemsList = document.getElementById("myItemsList");

const totalCount = document.getElementById("totalCount");
const lostCount = document.getElementById("lostCount");
const foundCount = document.getElementById("foundCount");

const logoutBtn = document.getElementById("logoutBtn");

// Check whether the student is logged in
if (!token || !user) {
    window.location.href = "login.html";
}

// Display student's name
if (user) {
    welcomeMessage.textContent = `Welcome, ${user.name}!`;
}

// Escape HTML to safely display item details
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// Load items reported by the logged-in student
async function loadMyItems() {
    try {
        const response = await fetch("/api/items", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Unable to load items");
        }

        const myItems = data.items.filter(item =>
            String(item.postedBy?._id) === String(user.id || user._id)
        );

        // Update dashboard statistics
        totalCount.textContent = myItems.length;

        lostCount.textContent = myItems.filter(
            item => item.type === "Lost"
        ).length;

        foundCount.textContent = myItems.filter(
            item => item.type === "Found"
        ).length;

        // Display reported items
        if (myItems.length === 0) {
            myItemsList.innerHTML =
                "<p>You have not reported any items yet.</p>";
            return;
        }

        myItemsList.innerHTML = myItems.map(item => `
            <div class="item-card">
                <span class="item-badge">
                    ${escapeHTML(item.type)}
                </span>

                <h3>${escapeHTML(item.itemName)}</h3>

                <p><strong>Category:</strong>
                    ${escapeHTML(item.category)}
                </p>

                <p><strong>Description:</strong>
                    ${escapeHTML(item.description)}
                </p>

                <p><strong>Location:</strong>
                    ${escapeHTML(item.location)}
                </p>

                <p><strong>Date:</strong>
                    ${escapeHTML(new Date(item.date).toLocaleDateString())}
                </p>

                <p><strong>Status:</strong>
                    ${escapeHTML(item.status)}
                </p>
            </div>
        `).join("");

    } catch (error) {
        console.error(error);
        myItemsList.innerHTML =
            "<p>Unable to load your items. Please try again.</p>";
    }
}

// Logout
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
});

// Load dashboard
if (token && user) {
    loadMyItems();
}
