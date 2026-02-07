let yesScale = 1;
let noClickCount = 0;
const playfulMessages = [
  "come on...",
  "please",
  "wdym no?",
  "ILL DO ANYTHING",
  "i will beg",
  "pretty please?",
  "I KNEEL",
  "BABY PLEASE",
  "ill let you do anything",
  "yes?",
  "pleaseeee?"
];

function goToQuestion() {
  document.getElementById('greetingCard').classList.add('hidden');
  document.getElementById('card').classList.remove('hidden');
}

function sayYes() {
  // Initial explosion
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
  
  // Start continuous confetti rain
  const confettiInterval = setInterval(() => {
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0 }
    });
  }, 300);
  
  document.getElementById('card').classList.add('hidden');
  document.getElementById('yesCard').classList.remove('hidden');
  
  // Stop confetti after 10 seconds
  setTimeout(() => {
    clearInterval(confettiInterval);
  }, 10000);
}

function moveNo() {
  const noBtn = document.querySelector('.no');
  const card = document.getElementById('card');
  
  // Get dimensions
  const cardWidth = card.offsetWidth;
  const cardHeight = card.offsetHeight;
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  
  // Calculate safe bounds (keep button fully visible within card)
  const padding = 10;
  const maxX = (cardWidth / 2) - (btnWidth / 2) - padding;
  const maxY = (cardHeight / 2) - (btnHeight / 2) - padding;
  const minX = -(cardWidth / 2) + (btnWidth / 2) + padding;
  const minY = -(cardHeight / 2) + (btnHeight / 2) + padding;
  
  // Reduce movement distance on small screens
  const isSmallScreen = window.innerWidth < 600;
  const maxDistance = isSmallScreen ? 60 : 120;
  const minDistance = isSmallScreen ? 40 : 80;
  
  let x, y;
  const minMovement = minDistance;
  let movementDistance = 0;
  let attempts = 0;
  const maxAttempts = 20;
  
  // Keep generating new positions until we move far enough and stay in bounds
  while (movementDistance < minMovement && attempts < maxAttempts) {
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    const angle = Math.random() * Math.PI * 2;
    x = Math.cos(angle) * distance;
    y = Math.sin(angle) * distance;
    
    // Constrain to bounds
    x = Math.max(minX, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));
    
    // Get current position
    const transform = noBtn.style.transform;
    const currentX = parseFloat(transform.match(/translate\(([^,]+)px/)?.[1] ?? 0);
    const currentY = parseFloat(transform.match(/,\s*([^)]+)px/)?.[1] ?? 0);
    
    // Calculate distance moved
    movementDistance = Math.sqrt((x - currentX) ** 2 + (y - currentY) ** 2);
    attempts++;
  }
  
  
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
  
  // Change button text to next playful message
  noClickCount = (noClickCount + 1) % playfulMessages.length;
  noBtn.textContent = playfulMessages[noClickCount];
  
  // Change image when no is pressed
  const pleaseImg = document.getElementById('pleaseImg');
  pleaseImg.src = 'download (1).jpg';
}

function makeYesBigger() {
  yesScale *= 1.5;
  const yesBtn = document.getElementById('yesBtn');
  
  let rotation = 0;
  let translateX = 0;
  let translateY = 0;
  
  if (noClickCount === 5) {
    rotation = 45;
  } else if (noClickCount >= 6) {
    rotation = 90;
    // Move to center
    const card = document.getElementById('card');
    const buttonRect = yesBtn.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    translateX = (cardRect.left + cardRect.width / 2) - (buttonRect.left + buttonRect.width / 2);
    translateY = (cardRect.top + cardRect.height / 2) - (buttonRect.top + buttonRect.height / 2);
  }
  
  yesBtn.style.transform = `translate(${translateX}px, ${translateY}px) scale(${yesScale}) rotate(${rotation}deg)`;
}
