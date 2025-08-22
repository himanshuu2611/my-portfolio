// Toggle nav menu on mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    window.scrollY > 50 ?
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)' :
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
});

// chatbot integration
const toggleBtn = document.getElementById("chat-toggle");
const chatbot = document.getElementById("chatbot");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("chat-messages");

// 🔹 Bot responses
const botResponses = {
  "age": "I am 21 years old.",
  "experience": "I have hands-on experience with Full-Stack Development (MERN) and multiple real-world projects.",
  "skills": "I work with HTML, CSS, JavaScript, React, Node.js, Express.js, and MongoDB.",
  "projects": "Some of my projects are DedupMan, Weather API app, Blog app, and WhatsApp Salon Bot.",
  "contact": "Opening my Contact section 📩",
  "name": "I am Himanshu Tiwari",

  // Portfolio Projects
  "dedupman": "Here is my DedupMan project 🚀: <a href='https://dedupman.vercel.app/' target='_blank'>Click Here</a>",
  "weather api": "Here is my Weather API project ☁️: <a href='https://your-weather-project-link.com' target='_blank'>Click Here</a>",
  "mern blog": "Here is my MERN Blog App ✍️: <a href='https://your-mern-blog-link.com' target='_blank'>Click Here</a>",
  "portfolio": "You are already exploring my Portfolio 🌐 but here is the code repo: <a href='https://github.com/yourusername/portfolio' target='_blank'>GitHub Repo</a>",

  // Default fallback
  "default": "Sorry, I don't understand that. Try asking about my <b>age</b>, <b>skills</b>, or <b>projects</b> like DedupMan, Weather API, Blog, Portfolio."
};

// Function to display messages
function addMessage(content, sender, nav = false) {
  const div = document.createElement("div");
  div.classList.add("msg", sender);

  if (sender === "bot") {
    div.innerHTML = content;
  } else {
    div.textContent = content;
  }

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;

  // ✅ Scroll only if nav = true
  if (sender === "bot" && nav) {
    if (content.toLowerCase().includes("contact")) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
    if (content.toLowerCase().includes("projects")) {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
    if (content.toLowerCase().includes("skills")) {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
    }
    if (content.toLowerCase().includes("about")) {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }
  }
}

// Bot logic
let firstMessage = true;

function getBotResponse(userMsg) {
  userMsg = userMsg.toLowerCase().trim().replace(/\s+/g, " ");

  // First message greeting
  if (firstMessage) {
    firstMessage = false;
    return {
      text: "👋 Hi there! Welcome to my portfolio.<br><br>You can ask me about:<br>✅ Age<br>✅ Experience<br>✅ Projects<br>✅ Skills<br>✅ Education<br>✅ Contact<br><br>Type any of these to know more!",
      nav: false
    };
  }

  // Greetings (no redirect)
  if (["hi", "hello", "hey"].some(greet => userMsg.includes(greet))) {
    return {
      text: "🙌 Hello! How can I help you today? You can ask about my Age, Skills, Projects, Education, or Contact.",
      nav: false
    };
  }

  // Help command
  if (userMsg.includes("help")) {
    return {
      text: "Here’s what you can ask me about:<br>✅ Age<br>✅ Experience<br>✅ Projects<br>✅ Skills<br>✅ Education<br>✅ Contact",
      nav: false
    };
  }

  // Search dictionary
  for (let key in botResponses) {
    const keywords = key.toLowerCase().split("|");
    for (let k of keywords) {
      if (userMsg.includes(k)) {
        // 🔹 Scroll only for section answers
        const shouldScroll = ["contact", "projects", "skills", "about"].some(section =>
          key.includes(section)
        );
        return { text: botResponses[key], nav: shouldScroll };
      }
    }
  }

  // Default
  return {
    text: "Hmm 🤔 I don’t have an answer for that. Try typing 'help' to see what I can do.",
    nav: false
  };
}

// Handle input
function handleUserInput() {
  const input = userInput.value.trim();
  if (!input) return;

  addMessage(input, "user");
  const response = getBotResponse(input);
  addMessage(response.text, "bot", response.nav);

  userInput.value = "";
}

// Send button
sendBtn.addEventListener("click", handleUserInput);

// Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleUserInput();
});

// Toggle chatbot
toggleBtn.addEventListener("click", () => {
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
});

// Close chatbot on header click
document.getElementById("chat-header").addEventListener("click", () => {
  chatbot.style.display = "none";
});



// Always start from top/home on page load or refresh
// 1) Disable browser scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// 2) On full load: clear any #hash and scroll to top
window.addEventListener('load', () => {
  if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search); // remove #... without adding history
  }
  // use 'auto' (standard); 'instant' is not a valid value
  setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 0);
});

// 3) Also handle pages restored from bfcache (back/forward navigation)
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    if (location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 0);
  }
});

