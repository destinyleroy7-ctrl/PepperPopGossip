// Pepper Pop puppy quiz — client-side scoring and result reveal.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#puppy-quiz");
  if (!form) return;

  const questions = [...form.querySelectorAll(".quiz-question")];
  const nextButton = document.querySelector("#next-question");
  const prevButton = document.querySelector("#prev-question");
  const submitButton = document.querySelector("#show-result");
  const progressLabel = document.querySelector("#progress-label");
  const progressFill = document.querySelector("#progress-fill");
  const error = document.querySelector("#quiz-error");
  const resultPanel = document.querySelector("#quiz-result");
  let current = 0;

  const pups = {
    golden: {
      name: "Golden Retriever — The Sunshine Bestie",
      description: "You're warm-hearted, loyal and always ready to make someone's day. Your energy is a big sunny hug, and your friends know they can count on you.",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=85",
      alt: "Happy golden retriever"
    },
    poodle: {
      name: "Poodle — The Glamour Icon",
      description: "Creative, confident and effortlessly stylish, you know how to make an entrance. You love a little sparkle, but your clever side is your real superpower.",
      image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=85",
      alt: "Fluffy poodle dog"
    },
    corgi: {
      name: "Corgi — The Cosy Comedian",
      description: "You're funny, affectionate and a comfort-zone champion. You bring the snacks, the jokes and the best hugs. Small adventures and big naps are your thing.",
      image: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=800&q=85",
      alt: "Cute corgi dog"
    },
    chihuahua: {
      name: "Chihuahua — The Tiny Trendsetter",
      description: "You're bold, expressive and impossible to ignore. You have big opinions, a fearless heart and main-character energy in the tiniest package.",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=85",
      alt: "Small dog looking at the camera"
    }
  };

  function showQuestion(index) {
    questions.forEach((question, i) => { question.hidden = i !== index; });
    current = index;
    progressLabel.textContent = `QUESTION ${index + 1} OF ${questions.length}`;
    progressFill.style.width = `${((index + 1) / questions.length) * 100}%`;
    prevButton.hidden = index === 0;
    nextButton.hidden = index === questions.length - 1;
    submitButton.hidden = index !== questions.length - 1;
    error.textContent = "";
  }

  function hasAnswer(index) {
    return Boolean(form.querySelector(`input[name="q${index}"]:checked`));
  }

  nextButton.addEventListener("click", () => {
    if (!hasAnswer(current)) {
      error.textContent = "Pick an answer, bestie, before we spill your result!";
      return;
    }
    showQuestion(Math.min(current + 1, questions.length - 1));
  });

  prevButton.addEventListener("click", () => showQuestion(Math.max(current - 1, 0)));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!hasAnswer(current)) {
      error.textContent = "Choose your final answer to reveal your puppy!";
      return;
    }
    const scores = { golden: 0, poodle: 0, corgi: 0, chihuahua: 0 };
    questions.forEach((_, index) => {
      const answer = form.querySelector(`input[name="q${index}"]:checked`);
      if (answer) scores[answer.value] += 1;
    });
    const winner = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];
    const result = pups[winner];
    document.querySelector("#result-name").textContent = result.name;
    document.querySelector("#result-description").textContent = result.description;
    const image = document.querySelector("#result-image");
    image.src = result.image;
    image.alt = result.alt;
    form.hidden = true;
    document.querySelector(".quiz-progress").hidden = true;
    resultPanel.hidden = false;
  });

  document.querySelector("#restart-quiz").addEventListener("click", () => {
    form.reset();
    form.hidden = false;
    document.querySelector(".quiz-progress").hidden = false;
    resultPanel.hidden = true;
    showQuestion(0);
  });

  showQuestion(0);
});
