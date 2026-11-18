
const claimsList = document.getElementById("claimsList");

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");

// Check admin login
if (!token || !user || user.role !== "admin") {
    alert("Admin login required");
    window.location.href = "login.html";
}

// Load all claims
async function loadClaims() {
    try {
        const response = await fetch("/api/claims", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Unable to load claims");
        }

        const claims = data.claims || [];

        if (claims.length === 0) {
            claimsList.innerHTML = "<p>No claims found.</p>";
            return;
        }

        claimsList.innerHTML = claims.map(claim => `
            <div class="item-card">
                <h3>${claim.item?.itemName || "Unknown Item"}</h3>
                <p><strong>Student:</strong> ${claim.claimant?.name || "Unknown"}</p>
                <p><strong>Message:</strong> ${claim.message}</p>
                <p><strong>Contact:</strong> ${claim.contact}</p>
                <p><strong>Status:</strong> ${claim.status}</p>

                ${
                    claim.status === "Pending"
                    ? `
                        <button onclick="updateClaim('${claim._id}', 'Approved')">
                            Approve
                        </button>

                        <button onclick="updateClaim('${claim._id}', 'Rejected')">
                            Reject
                        </button>
                    `
                    : ""
                }
            </div>
        `).join("");

    } catch (error) {
        claimsList.innerHTML = "<p>Unable to load claims.</p>";
    }
}

// Approve or reject a claim
async function updateClaim(id, status) {
    try {
        const response = await fetch("/api/claims/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            loadClaims();
        }

    } catch (error) {
        alert("Server connection failed.");
    }
}

if (token && user && user.role === "admin") {
    loadClaims();
}
