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


// chatbot integeration
const toggleBtn = document.getElementById("chat-toggle");
const chatbot = document.getElementById("chatbot");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("chat-messages");

// 🔹 Define answers about YOU here
const botResponses = {
  "age": "I am 21 years old.",
  "experience": "I have hands-on experience with Full-Stack Development (MERN) and multiple real-world projects.",
  "skills": "I work with HTML, CSS, JavaScript, React, Node.js, Express.js, and MongoDB.",
  "projects": "Some of my projects are DedupMan, Weather API app, Blog app, and WhatsApp Salon Bot.",
   "hello|hi|hey": "🙌 Hi there! Thanks for visiting my portfolio. What would you like to explore?",
   "contact": "Opening my Contact section 📩",
   "name":"I am Himanshu Tiwari",


  // Portfolio Projects
  "dedupman": "Here is my DedupMan project 🚀: <a href='https://dedupman.vercel.app/' target='_blank'>Click Here</a>",
  
  "weather api": "Here is my Weather API project ☁️: <a href='https://your-weather-project-link.com' target='_blank'>Click Here</a>",

  "mern blog": "Here is my MERN Blog App ✍️: <a href='https://your-mern-blog-link.com' target='_blank'>Click Here</a>",

  "portfolio": "You are already exploring my Portfolio 🌐 but here is the code repo: <a href='https://github.com/yourusername/portfolio' target='_blank'>GitHub Repo</a>",

  // Default fallback
  "default": "Sorry, I don't understand that. Try asking about my <b>age</b>, <b>skills</b>, or <b>projects</b> like DedupMan, Weather API, Blog, Portfolio."
};


// Function to display messages
function addMessage(content, sender) {
  const div = document.createElement("div");
  div.classList.add("msg", sender);

  if (sender === "bot") {
    // Bot can send HTML (links, emojis, styled text, etc.)
    div.innerHTML = content;
  } else {
    // User messages should stay safe (no HTML execution)
    div.textContent = content;
  }

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;

  // ✅ Extra feature: smooth scroll to sections if bot responds
  if (sender === "bot") {
    const lowerContent = content.toLowerCase(); // make it case-insensitive

    if (lowerContent.includes("about")) {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }
    if (lowerContent.includes("projects")) {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
    if (lowerContent.includes("skills")) {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
    }
    if (lowerContent.includes("contact")) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  }
}




// Function to get bot response
let firstMessage = true; // flag for first user input

function getBotResponse(userMsg) {
  // Normalize input
  userMsg = userMsg
    .toLowerCase()        // make lowercase
    .trim()               // remove extra spaces
    .replace(/\s+/g, " "); // collapse multiple spaces

  // 👋 If it's the first user message → greet + show options
  if (firstMessage) {
    firstMessage = false;
    return "👋 Hi there! Welcome to my portfolio.<br><br>You can ask me about:<br>✅ Age<br>✅ Experience<br>✅ Projects<br>✅ Skills<br>✅ Education<br>✅ Contact<br><br>Type any of these to know more!";
  }

  // 📌 If user explicitly types 'help'
  if (userMsg.includes("help")) {
    return "Here’s what you can ask me about:<br>✅ Age<br>✅ Experience<br>✅ Projects<br>✅ Skills<br>✅ Education<br>✅ Contact";
  }

  // 🔍 Check responses dictionary
  for (let key in botResponses) {
    const keywords = key.toLowerCase().split("|");  // also lowercase keys
    for (let k of keywords) {
      if (userMsg.includes(k)) {
        return botResponses[key];
      }
    }
  }

  // Default fallback
  return "Hmm 🤔 I don’t have an answer for that. Try typing 'help' to see what I can do.";
}



// Send button click
sendBtn.addEventListener("click", () => {
  const userMsg = userInput.value.trim();
  if (userMsg) {
    addMessage(userMsg, "user");
    const botReply = getBotResponse(userMsg);
    setTimeout(() => addMessage(botReply, "bot"), 500);
    userInput.value = "";
  }
});

// Enter key support
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// Toggle chatbot
toggleBtn.addEventListener("click", () => {
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
});

// Close chatbot when header clicked
document.getElementById("chat-header").addEventListener("click", () => {
  chatbot.style.display = "none";
});
