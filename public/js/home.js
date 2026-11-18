
const itemsList = document.getElementById("itemsList");

const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const dateSort = document.getElementById("dateSort");

let allItems = [];

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// Display items
function displayItems(items) {

    if (items.length === 0) {
        itemsList.innerHTML = "<p>No matching items found.</p>";
        return;
    }

    itemsList.innerHTML = items.map(item => `

        <div class="item-card">

            ${
                item.image
                ? `<img src="${escapeHTML(item.image)}"
                       alt="${escapeHTML(item.itemName)}"
                       style="width:100%; height:180px; object-fit:cover; border-radius:8px; margin-bottom:10px;">`
                : ""
            }

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

            ${
                item.type === "Found" && item.status === "Available"
                ? `<a href="claim.html?itemId=${encodeURIComponent(item._id)}"
                     class="btn">Claim This Item</a>`
                : ""
            }

        </div>

    `).join("");
}

// Search, filter and sort items
function filterItems() {

    const searchValue = searchInput.value.toLowerCase().trim();
    const typeValue = typeFilter.value;
    const categoryValue = categoryFilter.value;
    const locationValue = locationFilter.value.toLowerCase().trim();

    let filteredItems = allItems.filter(item => {

        const matchesName = item.itemName
            .toLowerCase()
            .includes(searchValue);

        const matchesType =
            typeValue === "" || item.type === typeValue;

        const matchesCategory =
            categoryValue === "" || item.category === categoryValue;

        const matchesLocation = item.location
            .toLowerCase()
            .includes(locationValue);

        return matchesName &&
            matchesType &&
            matchesCategory &&
            matchesLocation;
    });

    // Sort by date
    filteredItems.sort((a, b) => {

        if (dateSort.value === "oldest") {
            return new Date(a.date) - new Date(b.date);
        }

        return new Date(b.date) - new Date(a.date);
    });

    displayItems(filteredItems);
}

// Load items
async function loadItems() {

    try {

        const response = await fetch("/api/items");
        const data = await response.json();

        if (!response.ok) {
            throw new Error("Could not load items");
        }

        allItems = data.items || [];

        filterItems();

    } catch (error) {

        console.error(error);

        itemsList.innerHTML =
            "<p>Unable to load items. Please try again later.</p>";
    }
}

// Search and filter listeners
searchInput.addEventListener("input", filterItems);
typeFilter.addEventListener("change", filterItems);
categoryFilter.addEventListener("change", filterItems);
locationFilter.addEventListener("input", filterItems);
dateSort.addEventListener("change", filterItems);

// Load items when page opens
loadItems();
