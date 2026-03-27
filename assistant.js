let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

// SPEAK FUNCTION
function speak(text) {
  try {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = "en-US"; // English speech
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
  } catch (e) {
    console.error("Error in speech synthesis:", e);
  }
}

// GREETING FUNCTION
function wishMe() {
  let day = new Date();
  let hours = day.getHours();

  if (hours >= 0 && hours < 12) {
    speak("Good morning, sir.");
  } else if (hours >= 12 && hours < 16) {
    speak("Good afternoon, sir.");
  } else {
    speak("Good evening, sir.");
  }
}

window.addEventListener('load', () => {
  wishMe();
});

// VOICE RECOGNITION SETUP
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = "en-US";

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
});

// HANDLE COMMANDS AND AI
function takeCommand(message) {
  console.log("Command received:", message);

  // Simple website commands
  if (message.includes("open youtube")) {
    speak("Opening YouTube.");
    window.open("https://www.youtube.com", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google.");
    window.open("https://www.google.com", "_blank");

  } else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp.");
    window.open("https://www.whatsapp.com", "_blank");
  } else if (message.includes("how are you")) {
    speak("i am a  zynthos a vircual assictance created by kartik sir");
  }

}

// ✅ OPENAI CHATGPT INTEGRATION
async function askAI(message) {
  const apiKey = "sk-..._eoA"; // 🔁 Replace with your real OpenAI key
  const endpoint = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a friendly and helpful assistant who answers in simple, clear English." },
          { role: "user", content: message }
        ],
        max_tokens: 200
      })
    });

    const data = await response.json();

    // Check for valid reply
    if (data && data.choices && data.choices.length > 0) {
      const aiReply = data.choices[0].message.content.trim();
      console.log("AI:", aiReply);
      speak(aiReply);
    } else {
      speak("Sorry, I didn't understand that.");
    }

  } catch (error) {
    console.error("AI error:", error);
    speak("Sorry, I couldn't get a response from the AI.");
  }
}
