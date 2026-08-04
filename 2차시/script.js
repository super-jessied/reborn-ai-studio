const slides = [
  { file: "slide-3.png", title: "오늘의 세 가지 작은 성공 만들기" },
  { file: "slide-8.png", title: "웹앱에 기록하고 ChatGPT에 붙여넣기" },
  { file: "slide-9.png", title: "나를 시각적으로 번역하는 질문들" },
  { file: "slide-12.png", title: "색, 소품, 질감으로 분위기 잡기" },
  { file: "slide-16.png", title: "중요한 답 6~8개만 골라도 충분합니다" },
  { file: "slide-20.png", title: "같은 사람도 선택에 따라 다르게 보입니다" },
  { file: "slide-24.png", title: "배경 밝기와 빛의 선택" },
  { file: "slide-26.png", title: "사진 기반, 반실사, 일러스트 비교" },
  { file: "slide-29.png", title: "화면의 밀도 비교" },
  { file: "slide-31.png", title: "인물의 등장 방식" },
  { file: "slide-33.png", title: "텍스트가 있는 카드와 없는 카드" },
  { file: "slide-35.png", title: "질감이 만드는 첫인상" },
  { file: "slide-37.png", title: "내 비주얼 방향 한 문장" },
  { file: "slide-40.png", title: "웹앱에서 생성할 프롬프트 형식" },
  { file: "slide-42.png", title: "퍼스널 비주얼카드 생성 실습" },
  { file: "slide-43.png", title: "결과를 보는 다섯 가지 기준" },
  { file: "slide-45.png", title: "수정 전과 수정 후 비교" },
  { file: "slide-50.png", title: "저장과 공유" },
  { file: "slide-51.png", title: "다음 시간 안내" },
  { file: "slide-52.png", title: "오늘의 마무리" }
];

const slideImage = document.querySelector("#slideImage");
const slideTitle = document.querySelector("#slideTitle");
const slideCount = document.querySelector("#slideCount");
const slideRange = document.querySelector("#slideRange");
const prevSlide = document.querySelector("#prevSlide");
const nextSlide = document.querySelector("#nextSlide");
const toast = document.querySelector("#toast");

let currentSlide = 0;
let toastTimer;

function updateSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];
  slideImage.src = `./assets/slides/${slide.file}`;
  slideImage.alt = `2차시 핵심 슬라이드: ${slide.title}`;
  slideTitle.textContent = slide.title;
  slideCount.textContent = `${currentSlide + 1} / ${slides.length}`;
  slideRange.value = currentSlide;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1500);
}

async function copyText(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const text = target.textContent.trim();

  try {
    await navigator.clipboard.writeText(text);
    showToast("복사했습니다");
  } catch {
    const range = document.createRange();
    range.selectNodeContents(target);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    showToast("선택했습니다. Ctrl+C를 눌러 복사하세요");
  }
}

prevSlide.addEventListener("click", () => updateSlide(currentSlide - 1));
nextSlide.addEventListener("click", () => updateSlide(currentSlide + 1));
slideRange.addEventListener("input", (event) => updateSlide(Number(event.target.value)));

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copy));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") updateSlide(currentSlide - 1);
  if (event.key === "ArrowRight") updateSlide(currentSlide + 1);
});

updateSlide(0);
