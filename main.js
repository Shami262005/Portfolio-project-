const downloadBtn = document.getElementById("download-resume-btn");
const kelorepoBtn = document.getElementById("kelorepo-btn");
const hospitalRepoBtn = document.getElementById("hospitalrepo-btn");
const hivinclusiveRepoBtn = document.getElementById("hiv-inclusiverepo-btn");
const discordBtn = document.getElementById("discord-btn");
const linkedinBtn = document.getElementById("linkedin-btn");

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = "/files/shamiso-vushe-resume.pdf";
  link.download = "Shamiso_Vushe_Resume.pdf";
  link.click();
});

kelorepoBtn.addEventListener("click", () => {
  window.open("https://github.com/Lengalela/KeloTech", "_blank");
});

hospitalRepoBtn.addEventListener("click", () => {
  window.open("https://github.com/rachelazarus/Web-development", "_blank");
});

hivinclusiveRepoBtn.addEventListener("click", () => {
  window.open(
    "https://github.com/DrGitman/Methealth_Hackathon_Group_5/tree/main/HIVCards",
    "_blank",
  );
});

discordBtn.addEventListener("click", () => {
  window.open("https://discord.com/users/your-discord-invite", "_blank");
});

linkedinBtn.addEventListener("click", () => {
  window.open("https://www.linkedin.com/in/shamiso-vushe-100640280", "_blank");
});

emailjs.init("qTS6RxQLHVE2CzWUN");
const contactForm = document.querySelector(".message-form");
const notification = document.getElementById("notification");
const notificationMessage = document.getElementById("notification-message");

function showNotification(message, type) {
  notificationMessage.textContent = message;
  notification.className = `notification show ${type}`;

  setTimeout(() => {
    notification.classList.remove("show");
  }, 4000);
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Get current time
  const now = new Date();
  const formattedTime = now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Changed to match your template variables: {{name}}, {{time}}, {{from_email}}, {{message}}
  const templateParams = {
    name: name, // Changed from 'from_name' to 'name'
    from_email: email, // This matches {{from_email}}
    message: message, // This matches {{message}}
    time: formattedTime, // Added this for {{time}}
  };

  emailjs.send("service_d5nd9an", "template_rd55lch", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      showNotification("Your message has been sent successfully!", "success");
      contactForm.reset();
    },
    function (error) {
      console.log("FAILED...", error);
      showNotification(
        "There was an error sending your message. Please try again later.",
        "error",
      );
    },
  );
});
