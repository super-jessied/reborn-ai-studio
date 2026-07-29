const LINKS = {
  chatgpt: "https://chatgpt.com",
  gemini: "https://gemini.google.com",
  claude: "https://claude.ai",
  canva: "https://www.canva.com",
  capcut: "https://www.capcut.com",
  drive: "https://drive.google.com/drive/folders/1Kt7Q1OWE9jTE-V_m9op8aVXycPz6Lcqi?usp=sharing",
  padlet: "https://padlet.com/jsslee751/re-born-ai-69zp2rx6zl3tyjym",
  worksheet: "../04_워크시트_템플릿/01_1회차_워크시트_나를이해하고_톤앤무드기준표_인쇄용_시각보강_5페이지압축.docx",
  linkGuide: "../06_링크_QR/01_수강생용_QR_링크_안내문.docx",
};

const steps = [
  {
    number: "0",
    title: "작업 원칙",
    time: "5분",
    body: "AI가 만들 일과 내가 정할 일을 나눕니다. 오늘은 도구보다 방향을 먼저 정합니다.",
  },
  {
    number: "1",
    title: "나를 이해하는 질문",
    time: "10분",
    body: "경험, 관심, 활용 질문에 키워드로 답하며 영상의 재료를 꺼냅니다.",
  },
  {
    number: "2",
    title: "퍼스널 비주얼카드",
    time: "12분",
    body: "색, 빛, 장소, 소품, 피하고 싶은 느낌을 골라 톤앤무드 기준표를 만듭니다.",
  },
  {
    number: "3",
    title: "자기소개 시안",
    time: "10분",
    body: "내 비주얼 방향을 이미지 프롬프트 초안으로 바꾸고, 가능하면 시안 이미지를 확인합니다.",
  },
  {
    number: "4",
    title: "영상 기획",
    time: "15분",
    body: "공통미션 주제와 핵심문장을 정합니다. 자기소개가 아니라 ‘내가 남길 제안’을 찾습니다.",
  },
  {
    number: "5",
    title: "5컷 구성",
    time: "15분",
    body: "완벽한 그림보다 장면 순서를 먼저 정합니다.",
  },
  {
    number: "6",
    title: "공유",
    time: "10분",
    body: "Padlet에 한 문장과 대표 키워드 3개를 올립니다.",
  },
];

const prompts = [
  {
    title: "나를 이해하는 질문 정리",
    body: `아래 키워드를 바탕으로 나를 소개하는 30~60초 AI 영상의 방향을 정리해줘.

경험:
관심:
앞으로 활용하고 싶은 곳:
사람들에게 남기고 싶은 느낌:

결과는
1. 나를 설명하는 핵심 키워드 5개
2. 영상으로 보여주면 좋은 장면 5개
3. 너무 과하지 않은 자기소개 문장 3개
로 정리해줘.`,
  },
  {
    title: "퍼스널 비주얼카드 만들기",
    body: `나는 나를 소개하는 AI 영상을 만들고 싶습니다.
아래 답을 바탕으로 영상의 톤앤무드 기준표를 만들어줘.

좋아하는 색감:
원하는 빛과 분위기:
어울리는 장소:
등장하면 좋은 소품:
피하고 싶은 느낌:

결과는
1. 대표 비주얼 키워드 3개
2. 이미지 프롬프트에 넣을 분위기 문장
3. 피해야 할 요소
로 정리해줘.`,
  },
  {
    title: "자기소개 시안 이미지 프롬프트",
    body: `아래 내용을 바탕으로 AI 이미지 생성용 프롬프트를 만들어줘.

나를 설명하는 키워드:
대표 비주얼 키워드 3개:
원하는 장소와 소품:
영상의 핵심문장:

조건:
- 40~64세 중장년 학습자의 자기소개 영상에 어울리게
- 따뜻하고 현실적인 인물 이미지
- 과장된 광고 느낌은 피하기
- 인물, 장소, 행동, 분위기, 색감, 카메라 구도를 포함하기`,
  },
  {
    title: "공통미션 주제 찾기",
    body: `나는 40~64세 중장년 학습자입니다.
나의 경험, 관심사, 앞으로 해보고 싶은 활동을 바탕으로
'나의 Re_Born' 30~60초 영상 주제 5가지를 제안해줘.
각 주제마다 한 줄 메시지도 함께 써줘.
말투는 따뜻하고 담백하게 써줘.`,
  },
  {
    title: "핵심문장 만들기",
    body: `내 영상 주제는 '[내가 고른 주제]'입니다.
이 주제를 30~60초 영상으로 만들 때 사용할 핵심문장 5개를 제안해줘.
중장년 학습자의 따뜻하고 담백한 말투로 써줘.
너무 거창하지 않고 실제 자기소개 영상에 쓸 수 있게 해줘.`,
  },
  {
    title: "5컷 스토리보드 만들기",
    body: `내 영상의 핵심문장은 '[핵심문장]'입니다.
이 문장을 30~60초 영상으로 만들기 위한 5컷 스토리보드를 제안해줘.
각 컷마다 장면 설명, 자막 문장, 분위기 키워드를 써줘.
내 톤앤무드 키워드는 '[대표 비주얼 키워드 3개]'입니다.`,
  },
  {
    title: "선택미션 주제 초안",
    body: `나는 선택미션으로 '[트랙명]'을 골랐습니다.
내가 가진 경험과 관심사를 바탕으로 60초 영상 주제 5개를 제안해줘.
각 주제마다 활용처와 보여줄 대상도 함께 써줘.
트랙은 지역기록형, 교육콘텐츠형, 브랜드·창업형, 마음기록형, 경력전환형 중 하나입니다.`,
  },
];

const tools = [
  { key: "chatgpt", title: "ChatGPT", body: "주제 찾기, 핵심문장, 5컷 구성" },
  { key: "gemini", title: "Gemini", body: "대체 AI 대화 도구" },
  { key: "claude", title: "Claude", body: "문장 다듬기와 구조 정리" },
  { key: "canva", title: "Canva", body: "2회차 이후 썸네일과 카드 디자인" },
  { key: "capcut", title: "CapCut", body: "2회차 이후 Seedance와 편집" },
  { key: "worksheet", title: "워크시트", body: "인쇄물 또는 파일 확인" },
  { key: "drive", title: "Google Drive", body: "제출 폴더, 링크 준비 후 연결" },
  { key: "padlet", title: "Padlet", body: "작업실 게시판, 링크 준비 후 연결" },
];

const lectureSlides = [
  {
    src: "assets/slides/slide-07-flow-latest.png",
    alt: "AI 영상 제작은 다섯 단계로 움직입니다 슬라이드",
    caption: "AI 영상 제작 흐름",
  },
  {
    src: "assets/slides/slide-10-intellectual-capital.png",
    alt: "기획은 무엇을 제안할까를 정하는 일입니다 슬라이드",
    caption: "기획은 제안을 정하는 일",
  },
  {
    src: "assets/slides/slide-14-60sec-structure.png",
    alt: "60초 영상은 짧지만 구조가 필요합니다 슬라이드",
    caption: "60초 영상 구조",
  },
  {
    src: "assets/slides/slide-15-one-plate-example.png",
    alt: "ONE PLATE 60초 AI 영상 예시 슬라이드",
    caption: "Hook Story Message 예시",
  },
  {
    src: "assets/slides/slide-18-personal-visual-card.png",
    alt: "퍼스널 비주얼카드 톤앤무드 정하기 슬라이드",
    caption: "퍼스널 비주얼카드",
  },
  {
    src: "assets/slides/slide-19-worksheet-flow-latest.png",
    alt: "워크시트 흐름대로 진행합니다 슬라이드",
    caption: "워크시트 흐름",
  },
  {
    src: "assets/slides/slide-21-visual-direction.png",
    alt: "내가 원하는 비주얼 방향을 고릅니다 슬라이드",
    caption: "비주얼 방향 선택",
  },
  {
    src: "assets/slides/slide-22-visual-prompt.png",
    alt: "자기소개 시안 프롬프트 만들기 슬라이드",
    caption: "시안 이미지 프롬프트",
  },
  {
    src: "assets/slides/slide-27-storyboard-map.png",
    alt: "5컷 스토리보드는 영상의 지도입니다 슬라이드",
    caption: "5컷 스토리보드",
  },
  {
    src: "assets/slides/slide-32-padlet-format-latest.png",
    alt: "Padlet 게시글 형식 슬라이드",
    caption: "Padlet 게시 형식",
  },
  {
    src: "assets/slides/slide-35-next-week.png",
    alt: "다음 주 준비 체크리스트 슬라이드",
    caption: "다음 주 준비",
  },
];

let currentLectureSlide = 0;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("복사했습니다.");
  } catch {
    showToast("복사할 수 없어요. 직접 선택해서 복사해주세요.");
  }
}

function openLink(key) {
  const url = LINKS[key];
  if (!url) {
    showToast("아직 실제 수업 링크가 연결되지 않았습니다.");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

function renderLectureSlide() {
  const image = document.getElementById("lectureSlideImage");
  const caption = document.getElementById("slideCaption");
  const counter = document.getElementById("slideCounter");
  const progress = document.getElementById("slideProgressBar");
  if (!image || !caption || !counter || !progress) return;

  const slide = lectureSlides[currentLectureSlide];
  image.src = slide.src;
  image.alt = slide.alt;
  caption.textContent = slide.caption;
  counter.textContent = `${currentLectureSlide + 1} / ${lectureSlides.length}`;
  progress.style.width = `${((currentLectureSlide + 1) / lectureSlides.length) * 100}%`;
}

function moveLectureSlide(direction) {
  currentLectureSlide = (currentLectureSlide + direction + lectureSlides.length) % lectureSlides.length;
  renderLectureSlide();
}

function renderSteps() {
  const grid = document.getElementById("stepGrid");
  grid.innerHTML = steps
    .map(
      (step) => `
        <article class="step-card">
          <div class="step-topline">
            <span class="step-number">${step.number}</span>
            <span class="step-time">작업 시간 ${step.time}</span>
          </div>
          <h3>${step.title}</h3>
          <p>${step.body}</p>
        </article>
      `,
    )
    .join("");
}

function renderPrompts() {
  const list = document.getElementById("promptList");
  list.innerHTML = prompts
    .map(
      (prompt, index) => `
        <article class="prompt-card">
          <h3>${prompt.title}</h3>
          <pre id="prompt-${index}">${prompt.body}</pre>
          <button class="copy-button" type="button" data-copy-target="prompt-${index}">프롬프트 복사</button>
        </article>
      `,
    )
    .join("");
}

function renderTools() {
  const grid = document.getElementById("toolGrid");
  grid.innerHTML = tools
    .map((tool) => {
      const pending = !LINKS[tool.key];
      return `
        <article class="tool-card">
          <div>
            <h3>${tool.title}</h3>
            <p>${tool.body}</p>
          </div>
          <button class="tool-button ${pending ? "pending" : ""}" type="button" data-link="${tool.key}">
            ${pending ? "링크 준비중" : "열기"}
          </button>
        </article>
      `;
    })
    .join("");
}

function bindEvents() {
  document.body.addEventListener("click", (event) => {
    const copyButton = event.target.closest("[data-copy-target]");
    if (copyButton) {
      const target = document.getElementById(copyButton.dataset.copyTarget);
      if (target) copyText(target.textContent.trim());
      return;
    }

    const linkButton = event.target.closest("[data-link]");
    if (linkButton) {
      openLink(linkButton.dataset.link);
    }
  });

  document.getElementById("slideStage")?.addEventListener("click", () => moveLectureSlide(1));
  document.getElementById("prevSlide")?.addEventListener("click", () => moveLectureSlide(-1));
  document.getElementById("nextSlide")?.addEventListener("click", () => moveLectureSlide(1));
}

renderLectureSlide();
renderSteps();
renderPrompts();
renderTools();
bindEvents();
