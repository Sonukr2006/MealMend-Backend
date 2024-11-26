document.addEventListener('DOMContentLoaded', () => {
	const loginForm = document.getElementById('login-form');
	const signupForm = document.getElementById('signup-form');
	const profileName = document.getElementById('profile-name');
	const profileEmail = document.getElementById('profile-email');
	const profileRole = document.getElementById('profile-role');
	const formLinks = document.getElementById('form-links');
	const tbody = document.getElementById("donationHistory")?.getElementsByTagName("tbody")[0];


	if (signupForm) {
			signupForm.addEventListener('submit', (e) => {
					e.preventDefault();
					const name = document.getElementById('signup-name').value;
					const email = document.getElementById('signup-email').value;
					const password = document.getElementById('signup-password').value;
					const role = document.getElementById('user-role').value;

					localStorage.setItem('user', JSON.stringify({ name, email, role }));
					alert('Sign Up successful! Please log in.');
					window.location.href = '../Login/login.html';
			});
	}

	if (loginForm) {
			loginForm.addEventListener('submit', (e) => {
					e.preventDefault();
					const email = document.getElementById('login-email').value;
					const password = document.getElementById('login-password').value;

					const user = JSON.parse(localStorage.getItem('user'));
					if (user && user.email === email) {
							localStorage.setItem('isLoggedIn', 'true');
							window.location.href = '../profile/profile.html';
					} else {
							alert('Invalid email or password');
					}
			});
	}

	
	if (profileName) {
			const user = JSON.parse(localStorage.getItem('user'));
			if (user) {
					profileName.textContent = user.name;
					profileEmail.textContent = user.email;
					profileRole.textContent = user.role;
					displayFormLinks(user.role);
					loadDonationHistory();
			}
	}


	function displayFormLinks(role) {
			const links = {
					donor: '<a href="forms/donor-form.html">Fill Donor Form</a>',
					partner: '<a href="forms/partner-form.html">Fill Partner Form</a>',
					volunteer: '<a href="forms/volunteer-form.html">Fill Volunteer Form</a>'
			};

			if (links[role]) {
					formLinks.innerHTML = links[role];
			} else {
					formLinks.innerHTML = 'No forms available for your role.';
			}
	}

	
	function loadDonationHistory() {
			const donationHistory = JSON.parse(localStorage.getItem('donationHistory')) || [];
			if (tbody) {
					donationHistory.forEach(donation => {
							const row = tbody.insertRow();
							row.insertCell(0).textContent = donation.foodItem;
							row.insertCell(1).textContent = donation.quantity;
							row.insertCell(2).textContent = donation.foodQuality;
							row.insertCell(3).textContent = donation.date;
					});
			}
	}

	if (document.getElementById('donor-form')) {
			document.getElementById('donor-form').addEventListener('submit', function(e) {
					e.preventDefault();
					const foodItem = document.getElementById('food-item').value;
					const quantity = document.getElementById('quantity').value;
					const foodQuality = document.getElementById('food-quality').value;

					let donationHistory = JSON.parse(localStorage.getItem('donationHistory')) || [];
					donationHistory.push({ foodItem, quantity, foodQuality, date: new Date().toLocaleDateString() });
					localStorage.setItem('donationHistory', JSON.stringify(donationHistory));

					alert('Donation successful! Thank you for your contribution.');
					window.location.href = 'profile.html';
			});
	}
});
document.getElementById("showPassword").addEventListener("change", function() {
	var passwordField = document.getElementById("password");
	if (this.checked) {
			passwordField.type = "text";
	} else {
			passwordField.type = "password";
	}
});

