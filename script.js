const surahInput = document.getElementById("surahInput");
const loadSurahBtn = document.getElementById("loadSurah");
const showAllBtn = document.getElementById("showAllSurahs");
const contentArea = document.getElementById("contentArea");

loadSurahBtn.addEventListener("click", async () => {
  const surahNum = surahInput.value;
  if (!surahNum || surahNum < 1 || surahNum > 114) {
    contentArea.innerHTML =
      "<p>Iltimos, 1 dan 114 gacha bo'lgan sura raqamini kiriting.</p>";
    return;
  }

  const textRes = await fetch(
    `https://api.alquran.cloud/v1/surah/${surahNum}/ar.alafasy`
  );
  const textData = await textRes.json();

  if (textData.code !== 200) {
    contentArea.innerHTML = "<p>Xatolik yuz berdi.</p>";
    return;
  }

  const surah = textData.data;

  contentArea.innerHTML = `<h2>${surah.englishName} - <span>${
    surah.name
  }</span></h2>
  <p><strong>Oyatlar soni:</strong> ${surah.numberOfAyahs}</p>
  <hr>
  <div>
    ${surah.ayahs
      .map(
        (a, i) => `
      <div class="ayah-card">
        <span class="ayah-number">${i + 1}</span>
        <div class="ayah-text">${a.text}</div>
        <button class="listen-btn" onclick="playAudio('${
          a.audio
        }')">Tinglash 🔊</button>
      </div>
    `
      )
      .join("")}
  </div>
  `;
});
showAllBtn.addEventListener("click", async () => {
  const res = await fetch(`https://api.alquran.cloud/v1/surah`);
  const data = await res.json();

  if (data.code !== 200) {
    contentArea.innerHTML = "<p>Xatolik yuz berdi.</p>";
    return;
  }

  contentArea.innerHTML = data.data.map(
    (s) => `
    <div>
      <h3>${s.number}. ${s.englishName} - <span>${s.name}</span></h3>
      <p>Oyalar soni: ${s.numberOfAyahs}</p>
    </div>
  `
  ).join("");
});

function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}

