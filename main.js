const downloadBtn = document.getElementById("download-resume-btn");
const kelorepoBtn = document.getElementById("kelorepo-btn");
const hospitalRepoBtn = document.getElementById("hospitalrepo-btn");
const hivinclusiveRepoBtn = document.getElementById("hiv-inclusiverepo-btn");
const discordBtn = document.getElementById("discord-btn");
const linkedinBtn = document.getElementById("linkedin-btn");
const sections = document.querySelectorAll("main > div[id]");
const navLinks = document.querySelectorAll(".header-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.header-link[href="#${entry.target.id}"]`,
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  {
    rootMargin: "-70px 0px -60% 0px", // triggers as soon as section clears the header
    threshold: 0,
  },
);

sections.forEach((section) => observer.observe(section));

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
const notificationIcon = document.getElementById("notification-icon");
const mainMessage = document.getElementById("main-message");
const instructions = document.getElementById("instructions");
const closeBtn = document.getElementById("ok-btn");
const loadingPopup = document.getElementById("loading-popup");

showLoading = () => {
  loadingPopup.classList.add("show");
};

hideLoading = () => {
  loadingPopup.classList.remove("show");
};

showNotification = (mainMsg, instructionsMsg, iconName) => {
  mainMessage.textContent = mainMsg;
  instructions.textContent = instructionsMsg;
  notificationIcon.setAttribute("src", `/images/${iconName}`);
  notification.className = "notification-popup show";
};

checkNetworkConnectivity = () => {
  if (!navigator.onLine) {
    return false;
  }
  return true;
};

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showNotification(
      "Oops!",
      "Please fill in all fields before sending",
      "sad.png",
    );
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification(
      "Invalid Email",
      "Please enter a valid email address",
      "sad.png",
    );
    return;
  }

  if (!checkNetworkConnectivity()) {
    showNotification(
      "No Connection",
      "Please check your internet connection and try again",
      "sad.png",
    );
    return;
  }

  showLoading();

  const now = new Date();
  const formattedTime = now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const templateParams = {
    name: name,
    from_email: email,
    message: message,
    time: formattedTime,
  };

  emailjs.send("service_d5nd9an", "template_rd55lch", templateParams).then(
    (response) => {
      console.log(response.status);

      emailjs.send("service_d5nd9an", "template_nfpbyw3", templateParams).then(
        (autoReplyResponse) => {
          hideLoading();
          console.log(autoReplyResponse.status);
          showNotification(
            "Thank You !!",
            "Your message has been sent. Check your email for confirmation!",
            "shy.png",
          );
          contactForm.reset();
        },
        (autoReplyError) => {
          hideLoading();
          console.log(
            "Auto-reply failed, but main email sent:",
            autoReplyError,
          );
          showNotification(
            "Thank You !!",
            "Your message has been sent successfully!",
            "shy.png",
          );
          contactForm.reset();
        },
      );
    },
    (error) => {
      hideLoading();
      console.log(error);

      if (!checkNetworkConnectivity()) {
        showNotification(
          "Connection Lost",
          "Your internet connection was lost. Please try again",
          "sad.png",
        );
      } else {
        showNotification(
          "Oh No",
          "Something went wrong, please try my other contact mediums provided",
          "sad.png",
        );
      }
    },
  );
});

closeBtn.addEventListener("click", () => {
  notification.classList.remove("show");
});

window.addEventListener("online", () => {
  console.log("Connection restored");
});

window.addEventListener("offline", () => {
  console.log("Connection lost");
});
