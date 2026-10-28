async function submitAuthForm(formId, endpoint, messageId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const message = document.getElementById(messageId);
    const data = Object.fromEntries(new FormData(form).entries());

    message.textContent = "";
    message.classList.remove("success");
    button.disabled = true;
    button.textContent = "Please wait...";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      sessionStorage.setItem("portfolioToken", result.token);
      message.textContent = result.message;
      message.classList.add("success");

      window.location.assign("/profile.html");
    } catch (error) {
      message.textContent =
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please try again."
          : error.message;
    } finally {
      button.disabled = false;
      button.textContent =
        formId === "signupForm" ? "Create Account ↗" : "Login ↗";
    }
  });
}

submitAuthForm("signupForm", "/api/auth/signup", "signupMessage");
submitAuthForm("loginForm", "/api/auth/login", "loginMessage");
