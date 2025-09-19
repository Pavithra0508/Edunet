document.addEventListener('DOMContentLoaded', () => {

  const quizData = [
    { question: "Which among the following facilitates users to upload web page files from the personal computers to server??",
      options: ["Transmission control protocol", "File transfer protocol", "Hypertext markup language", "HTTP"],
      answer: "File transfer protocol"
    },
    { question: "A pictorial representation of a program or the algorithm is known as?",
      options: ["Diagram", "Flowchart", "Data flow", "Data presentation"],
      answer: "Flowchart"
    },
    { question: "What does WWW stands for?",
      options: ["World wide web", "Web world wide", "Wide world web", "None of the above"],
      answer: "World wide web"
    },
    { question: "Who is the father of computer?",
      options: ["Charles Babbage", "Alan turing", "Dennis ritchie", "Barbara Liskov"],
      answer: "Charles Babbage"
    },
    { question: "What is the full form of OSI?",
      options: ["Open software interconnection", "Online service information", "Operating system interface", "Open systems interconnection"],
      answer: "Open systems interconnection"
    },
    { question: "Who can access the server?",
      options: ["End-user", "Web client", "Administrator", "Router"],
      answer: "Web client"
    },
    { question: "Ctrl, Shift, and Alt keys are called?",
      options: ["Function keys", "Navigation keys", "Modifier keys", "Arrow keys"],
      answer: "Modifier keys"
    },
    { question: "Kilobyte is equal to how many bytes?",
      options: ["1000 bytes", "1024 bytes", "100 bytes", "2048 bytes"],
      answer: "1024 bytes"
    },
    { question: "A program that translates high-level language to machine-level language is called?",
      options: ["Assembler", "Interpreter", "Compiler", "Translator"],
      answer: "Compiler"
    },
    { question: "C, Java, PHP, and C++ are examples of?",
      options: ["Operating Systems", "Database Systems", "Programming Languages", "Interpreters"],
      answer: "Programming Languages"
    }
  ];

  let currentQ = 0;
  let score = 0;
  let time = 600;
  let timer;

  const quizEl = document.getElementById("quiz");
  const nextBtn = document.getElementById("nextBtn");
  const resultEl = document.getElementById("result");
  const timerEl = document.getElementById("timer");

  function loadQuiz() {
    resultEl.textContent = "";
    nextBtn.disabled = true; 
    if (currentQ < quizData.length) {
      const q = quizData[currentQ];
      quizEl.innerHTML = `
        <div class="question">${q.question}</div>
        <div class="options">
          ${q.options.map(opt => `<label><input type="radio" name="option" value="${opt}"> ${opt}</label>`).join("")}
        </div>
      `;
      
      const labels = quizEl.querySelectorAll('.options label');
      labels.forEach(label => {
        label.addEventListener('click', () => {
          const input = label.querySelector('input');
          if (input) input.checked = true;
          nextBtn.disabled = false;
        });
      });
    } else {
      endQuiz();
    }
  }

  function checkAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected && selected.value === quizData[currentQ].answer) {
      score++;
    }
  }

  function endQuiz() {
    clearInterval(timer);
    const overlay = document.createElement('div');
    overlay.className = 'end-screen';
    overlay.innerHTML = `
      <div class="card">
        <div style="font-size: 1.6rem; font-weight: 700; margin-bottom: 8px;">🎉 Quiz Completed</div>
        <div style="font-size: 1.2rem; margin-bottom: 14px;">You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong></div>
        <button id="restartBtn" style="padding:10px 18px; border-radius:6px; border:none; cursor:pointer;">Try Again</button>
      </div>
    `;
    document.body.appendChild(overlay);
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', () => {
      location.reload();
    });
  }

  function startTimer() {
    timer = setInterval(() => {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timerEl.textContent = `${minutes}:${seconds}`;
      time--;
      if (time < 0) {
        endQuiz();
      }
    }, 1000);
  }

  nextBtn.addEventListener('click', () => {
    checkAnswer();
    currentQ++;
    loadQuiz();
  });

  loadQuiz();
  startTimer();
});
