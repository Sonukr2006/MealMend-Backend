// Sample data for demonstration
const donationRequests = [];
const partnerRequests = [];

function addDonationRequest(itemName, quantity, quality) {
  const newRequest = {
    id: donationRequests.length + 1,
    itemName,
    quantity,
    quality,
    status: "Pending",
  };

  donationRequests.push(newRequest);
  console.log("New Donation Request:", newRequest);

  addPartnerRequest(itemName, quantity);
}

function addPartnerRequest(itemName, quantity) {
  const newPartnerRequest = {
    id: partnerRequests.length + 1,
    requestedItem: itemName,
    quantity,
    status: "Pending",
    details: "Partner needs the items for community support",
  };

  partnerRequests.push(newPartnerRequest);
  console.log("New Partner Request:", newPartnerRequest);
}
function viewDonations() {
  const tableBody = document.getElementById("request-table-body");
  tableBody.innerHTML = "";

  donationRequests.forEach((request) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${request.id}</td>
            <td>Donation</td>
            <td>${request.status}</td>
            <td>${request.itemName} (Qty: ${request.quantity}, Quality: ${request.quality})</td>
            <td><button onclick="assignToVolunteer(${request.id})">Assign</button></td>
        `;
    tableBody.appendChild(row);
  });
}

function viewPartnerRequests() {
  const tableBody = document.getElementById("request-table-body");
  tableBody.innerHTML = "";

  partnerRequests.forEach((request) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${request.id}</td>
            <td>Partner Request</td>
            <td>${request.status}</td>
            <td>${request.requestedItem} (Qty: ${request.quantity})</td>
            <td><button onclick="assignToVolunteer(${request.id})">Assign</button></td>
        `;
    tableBody.appendChild(row);
  });
}

function assignToVolunteer(requestId) {
  alert(`Request ID ${requestId} has been assigned to a volunteer!`);
}

document.addEventListener("DOMContentLoaded", viewDonations);

addDonationRequest("Rice", 5, "Good");
addDonationRequest("Canned Beans", 10, "Excellent");
