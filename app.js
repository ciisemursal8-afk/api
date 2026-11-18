


// Selectors
const surahList = document.querySelector("#surahList");
const content = document.querySelector("#content");

const apiURL = "https://api.alquran.cloud/v1/quran";

async function getQuran() {

    try {

        const response = await fetch(apiURL);
        const result = await response.json();
        const surahs = result.data.surahs;

        surahList.innerHTML = "";
        surahs.forEach(function (surah) {
            const div = document.createElement("div");
            div.className = "surah";

            div.innerHTML = `
                <span>${surah.number}</span>
                <span>${surah.englishName}</span>
                <span>${surah.ayahs.length}</span>
            `;

            div.addEventListener("click", function () {

                DisplayAyahs(surah);

            });

            surahList.appendChild(div);

        });

    } catch (error) {

        console.log(error);
        surahList.textContent = "Failed to load Surahs";

    }

}

function DisplayAyahs(surah) {

    content.innerHTML = `
        <div class="surah-title">
            <h2>${surah.name}</h2>
            <p>${surah.englishName} - ${surah.ayahs.length} Ayahs</p>
        </div>
    `;

    surah.ayahs.forEach(function (ayah) {
        const div = document.createElement("div");
        div.className = "ayah";

        div.innerHTML = `
            <span>${ayah.numberInSurah}</span>
            <p>${ayah.text}</p>

            <audio controls preload="none">
                <source 
                    src="https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3"
                    type="audio/mpeg"
                >
            </audio>
        `;

        content.appendChild(div);

    });

}

getQuran();
