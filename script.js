console.log("Hello World");

// fuction to get songs from directory 
async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mpeg")) {
            songs.push(element.href);
        }
    }
    return songs
}

async function main() {
    // list of the songs 
    let songs = await getSongs();
    console.log(songs);

    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li>song</li>`;
    }

    // Play the first song 
    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
        // The duration variable now holds the duration (in seconds) of the audio clip
        console.log(duration);
        console.log(audio.currentSrc, audio.currentTime);
    });
}


