
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
    };

    try {
      const response = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      alert(result.message);

      form.reset();

    } catch (error) {
      alert("❌ Cannot connect to server");
    }

  });

});

