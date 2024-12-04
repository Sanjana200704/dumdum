document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      window.location.href = "/login"; // Redirect to login if not authenticated
    }
  
    try {
      // Fetch user profile data
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to load profile data");
      }
  
      const data = await response.json();
      // Pre-fill the form fields with the user's data
      document.getElementById("firstName").value = data.firstName || "";
      document.getElementById("lastName").value = data.lastName || "";
      document.getElementById("dob").value = data.dob || "";
      document.getElementById("email").value = data.email || "";
      document.getElementById("phone").value = data.phone || "";
    } catch (error) {
      alert("Failed to load profile: " + error.message);
    }
  });
  
  document.getElementById("profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const dob = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value;
  
    try {
      // Update user profile data
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, dob, phone }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
  
      const data = await response.json();
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile: " + error.message);
    }
  });
  
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  