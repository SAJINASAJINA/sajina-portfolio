const token = sessionStorage.getItem("portfolioToken");
const message = document.getElementById("profileMessage");

if (!token) {
  window.location.replace("/login.html");
} else {
  loadProfile();
}

async function loadProfile() {
  try {
    const response = await fetch("/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to load profile.");
    }

    document.getElementById("profileName").textContent = result.user.name;
    document.getElementById("profileEmail").textContent = result.user.email;

    document.getElementById("profileCreated").textContent =
      `Member since ${new Date(result.user.createdAt).toLocaleDateString()}`;
  } catch (error) {
    message.textContent = error.message;

    if (
      error.message.includes("Session expired") ||
      error.message.includes("Please log in")
    ) {
      sessionStorage.removeItem("portfolioToken");
      window.location.replace("/login.html");
    }
  }
}

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("portfolioToken");
  window.location.replace("/login.html");
});
