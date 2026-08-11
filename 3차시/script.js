const slides = [
  "퍼스널 비주얼을 8컷 이야기와 음악으로 확장하기",
  "3시간 수업 흐름",
  "지난 시간 결과 확인",
  "정적인 카드에서 움직이는 작품으로",
  "퍼스널 비주얼 작업 확인",
  "수업이 끝날 때 손에 남아야 할 것",
  "1분 영상은 8개의 장면이면 충분합니다",
  "이 틀에 맞춰 내 장면 채우기",
  "예시: 새벽빛 작업실의 나",
  "5~8컷 이야기 구조",
  "장면 아이디어는 장소·행동·감정 세 가지",
  "확장 프롬프트 원리",
  "저장과 공유",
  "내 퍼스널 비주얼에서 8컷 뽑기",
  "장면 문장을 이미지 프롬프트로 바꾸기",
  "이미지 프롬프트 6요소",
  "좋은 이미지는 이어지는 장면입니다",
  "이미지 프롬프트 예시",
  "핵심 컷부터 이미지 생성하기",
  "이번에는 나를 소리로 표현합니다",
  "기본형: Instrumental 배경음악",
  "확장형: 나를 위한 짧은 노래",
  "기본형과 확장형 중 하나 선택하기",
  "2분짜리 음악에서 나의 1분 찾기",
  "음악에 맞춰 8컷 길이 정리하기",
  "Suno 음악 만들고 사용할 구간 표시하기",
  "Flow와 Seedance는 오늘 맛보기",
  "Google Flow 화면 익히기",
  "Seedance 이미지 움직임 이해하기",
  "이미지 프롬프트와 영상 프롬프트의 차이",
  "같은 예제로 Flow와 Seedance 비교하기",
  "다음 시간에는 실제로 움직입니다"
].map((title, index) => ({ file: `slide-${index + 1}.png`, title }));

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
  slideImage.alt = `3차시 강의 슬라이드: ${slide.title}`;
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
