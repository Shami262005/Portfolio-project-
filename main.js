// Disable browser scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Force scroll to top on page load
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
const downloadBtn = document.getElementById("download-resume-btn");
const kelorepoBtn = document.getElementById("kelorepo-btn");
const hospitalRepoBtn = document.getElementById("hospitalrepo-btn");
const hivinclusiveRepoBtn = document.getElementById("hiv-inclusiverepo-btn");
const discordBtn = document.getElementById("discord-btn");
const linkedinBtn = document.getElementById("linkedin-btn");
const sections = document.querySelectorAll("main > div[id]");
const navLinks = document.querySelectorAll(".header-link");

// Section and active header link logic
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
    rootMargin: "-70px 0px -60% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => observer.observe(section));

//Download button logic
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = "/files/shamiso-vushe-resume.pdf";
  link.download = "Shamiso_Vushe_Resume.pdf";
  link.click();
});

//Project buttons
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

//Contact form and send message button logic
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

//Bringing website to life as you open

//Home Section
const homeElements = document.querySelectorAll(
  ".greeting-tag, .introduction-text-large, .introduction-text-medium, .intro-description, .btn-wrapper--large, .home-right img",
);
//after certian amoutn of tiem bring each element itno view one after the other following one another
homeElements.forEach((el, index) => {
  setTimeout(
    () => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    },
    200 + index * 150,
  );
});

const greetingTag = document.querySelector(".greeting-tag");
const lastDelay = 200 + (homeElements.length - 1) * 150;
const fadeDuration = 600;

setTimeout(() => {
  greetingTag.style.animation = "tilt 0.4s ease-in-out 3";
  greetingTag.addEventListener("animationend", () => {
    greetingTag.style.animation = "none";
  });
  setTimeout(() => {
    const letters = document.querySelectorAll(".bounce-letter");
    letters.forEach((letter, i) => {
      setTimeout(() => {
        letter.style.animationPlayState = "running";
      }, i * 80);
    });
  }, 1400);
}, lastDelay + fadeDuration);

//About section
const aboutLeft = document.querySelector(".about-left img");
const aboutBox = document.querySelector(".about-me-box");
const aboutBtn = document.querySelector(".resume .btn-wrapper");

[aboutLeft, aboutBox, aboutBtn].forEach((el) => {
  if (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  }
});

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        [aboutLeft, aboutBox, aboutBtn].forEach((el, index) => {
          setTimeout(() => {
            if (el) {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }
          }, index * 250);
        });
        aboutObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

aboutObserver.observe(document.querySelector(".about-me-section"));

//Expertise section
const skillItems = document.querySelectorAll(".expertise-section .skill-item");

skillItems.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

const expertiseObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rows = {};
        skillItems.forEach((el) => {
          const top = Math.round(el.getBoundingClientRect().top);
          if (!rows[top]) rows[top] = [];
          rows[top].push(el);
        });

        Object.values(rows).forEach((rowItems, rowIndex) => {
          rowItems.forEach((el) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, rowIndex * 250);
          });
        });

        expertiseObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

expertiseObserver.observe(document.querySelector(".expertise-section"));

//Experience section
const expLeftElements = document.querySelectorAll(".desktop-experience .left");
const expRightElements = document.querySelectorAll(
  ".desktop-experience .right",
);
const mobileHeaders = document.querySelectorAll(".mobile-titles");
const mobileContents = document.querySelectorAll(".mobile-content");
const robot = document.querySelector(".robot");
const butterfly = document.querySelector(".butterfly-2");

expLeftElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateX(-80px)";
  el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

expRightElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateX(80px)";
  el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

mobileHeaders.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

mobileContents.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

if (robot) {
  robot.style.opacity = "0";
  robot.style.transform = "translateX(-60px)";
  robot.style.transition = "opacity 1s ease, transform 1s ease";
}

if (butterfly) {
  butterfly.style.opacity = "0";
  butterfly.style.transform = "translateX(60px)";
  butterfly.style.transition = "opacity 1s ease, transform 1s ease";
}

const experienceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const experienceItems = document.querySelectorAll(".experience-item");

        if (robot) {
          robot.style.opacity = "1";
          robot.style.transform = "translateX(0)";
        }
        if (butterfly) {
          butterfly.style.opacity = "1";
          butterfly.style.transform = "translateX(0)";
        }

        experienceItems.forEach((item, index) => {
          setTimeout(() => {
            const left = item.querySelector(".desktop-experience .left");
            const right = item.querySelector(".desktop-experience .right");
            if (left) {
              left.style.opacity = "1";
              left.style.transform = "translateX(0)";
            }
            if (right) {
              right.style.opacity = "1";
              right.style.transform = "translateX(0)";
            }

            const mobileTitle = item.querySelector(".mobile-titles");
            const mobileContent = item.querySelector(".mobile-content");
            if (mobileTitle) {
              mobileTitle.style.opacity = "1";
              mobileTitle.style.transform = "translateY(0)";
            }
            if (mobileContent) {
              mobileContent.style.opacity = "1";
              mobileContent.style.transform = "translateY(0)";
            }
          }, index * 400);
        });

        experienceObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

experienceObserver.observe(document.querySelector(".experience-section"));

//Projects section
const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

const projectsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        projectItems.forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, index * 200);
        });

        projectsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

projectsObserver.observe(document.querySelector(".projects-section"));

//Education section
const educationItems = document.querySelectorAll(".education-item");
const educationImage = document.querySelector(".right-image img");

educationItems.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateX(-60px)";
  el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

if (educationImage) {
  educationImage.style.opacity = "0";
  educationImage.style.transform = "translateX(60px)";
  educationImage.style.transition = "opacity 0.7s ease, transform 0.7s ease";
}

const educationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        educationItems.forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
          }, index * 200);
        });

        if (educationImage) {
          educationImage.style.opacity = "1";
          educationImage.style.transform = "translateX(0)";
        }

        educationObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

educationObserver.observe(document.querySelector(".education-section"));

//Contact section
const contactLeft = document.querySelector(".contact-left");

[contactLeft, contactForm].forEach((el) => {
  if (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  }
});

const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        [contactLeft, contactForm].forEach((el, index) => {
          setTimeout(() => {
            if (el) {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }
          }, index * 250);
        });

        contactObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

contactObserver.observe(document.querySelector(".contact-me-section"));
