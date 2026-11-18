
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");

const welcomeMessage = document.getElementById("welcomeMessage");
const adminItemsList = document.getElementById("adminItemsList");

const totalCount = document.getElementById("totalCount");
const lostCount = document.getElementById("lostCount");
const foundCount = document.getElementById("foundCount");

const logoutBtn = document.getElementById("logoutBtn");

// Check whether the user is an administrator
if (!token || !user || user.role !== "admin") {
    alert("Access denied! Admin login required.");
    window.location.href = "login.html";
}

// Display admin name
if (user && user.role === "admin") {
    welcomeMessage.textContent = `Welcome, ${user.name}!`;
}

// Escape HTML before displaying item details
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// Load all reported items
async function loadAdminItems() {
    try {
        const response = await fetch("/api/admin/items", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Unable to load items");
        }

        const items = data.items || [];

        // Update statistics
        totalCount.textContent = items.length;

        lostCount.textContent = items.filter(
            item => item.type === "Lost"
        ).length;

        foundCount.textContent = items.filter(
            item => item.type === "Found"
        ).length;

        // Display all items
        if (items.length === 0) {
            adminItemsList.innerHTML =
                "<p>No items have been reported yet.</p>";
            return;
        }

        adminItemsList.innerHTML = items.map(item => `
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

                <p><strong>Reported by:</strong>
                    ${escapeHTML(item.postedBy?.name || "Unknown")}
                </p>

            </div>
        `).join("");

    } catch (error) {
        console.error(error);

        adminItemsList.innerHTML =
            "<p>Unable to load reported items.</p>";
    }
}

// Logout
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
});

// Load items only for an admin
if (token && user && user.role === "admin") {
    loadAdminItems();
}
