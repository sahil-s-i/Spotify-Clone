// console.log("Hello World");
let currentSong = new Audio();

// fuction to get songs from directory 
async function getSongs() {

    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    // console.log(response);

    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(response, 'text/html');

    // Select all anchor elements with class "icon-video" which are links to songs
    let songLinks = htmlDoc.querySelectorAll('a.icon-video');

    // Extract href attributes and log them
    let songUrls = Array.from(songLinks).map(link => link.getAttribute('href'));
    // console.log(songUrls);
    let songs = [];
    for (let index = 0; index < songUrls.length; index++) {
        const element = songUrls[index];
        let songUrl = element.slice(7);
        if (songUrl.endsWith(".mpeg")) {
            songs.push(songUrl);
        }
    }
    // console.log(songs);
    return songs
}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "invalid input";
        // return "00:00";
    }

    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);

    // Formatting minutes and seconds to ensure two digits
    var minutesString = String(minutes).padStart(2, '0');
    var secondsString = String(remainingSeconds).padStart(2, '0');

    return `${minutesString}:${secondsString}`
}

// Example usage
// console.log(secondsToMinutesSeconds(75)); // Output: "01:15"


// async function main() {
//     // list of the songs
//     let songs = await getSongs();
//     console.log(songs);

//     let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
//     for (const song of songs) {
//         songUl.innerHTML = songUl.innerHTML + `<li>song</li>`;
//     }

//     // Play the first song
//     var audio = new Audio(songs[0]);
//     audio.play();

//     audio.addEventListener("loadeddata", () => {
//         let duration = audio.duration;
//         // The duration variable now holds the duration (in seconds) of the audio clip
//         console.log(duration);
//         console.log(audio.currentSrc, audio.currentTime);
//     });
// }



const playMusic = (track, pause = false) => {
    currentSong.src = "/songs/" + track;
    if (!pause) {
        currentSong.play();
        play.src = "./imgsandlogos/pauseicon.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(`${track}`)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}


// main()

async function main() {
    try {
        // list of the songs
        let songs = await getSongs();
        // console.log(songs);
        playMusic(songs[0], true)

        // Find the <ul> element with class "songList"
        let songUl = document.querySelector(".songList ul");

        // Clear the existing content of <ul>
        songUl.innerHTML = "";

        // Add each song to the list
        songs.forEach(song => {
            songUl.innerHTML += `<li><img class="invert" src="./imgsandlogos/music.svg" alt="Music icon">
                            <div class="songInfo">
                                <div class="">${song.replaceAll("%20", ' ')}</div>
                                <div>Arijith singh</div>
                            </div>
                            <div class="playNow">
                                <span>Play Now</span>
                                <img class="invert" src="./imgsandlogos/playicon.svg" alt="Music icon">
                            </div></li>`;
        });

        // Attach event listner to the to each song 
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
            e.addEventListener("click", element => {

                console.log(e.querySelector(".songInfo").firstElementChild.innerHTML);
                playMusic(e.querySelector(".songInfo").firstElementChild.innerHTML.trim());
            })
        })


        // Attach event listner to play,previous and next song 
        play.addEventListener("click", () => {
            if (currentSong.paused) {
                currentSong.play();
                play.src = "./imgsandlogos/pauseicon.svg";
            }
            else {
                currentSong.pause();
                play.src = "./imgsandlogos/playicon.svg";
            }
        })

        // Listen for time update event 
        currentSong.addEventListener("timeupdate", () => {
            console.log(currentSong.currentTime, currentSong.duration);
            document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        })

        // Add an event listner to seek bar 
        document.querySelector(".seekbar").addEventListener("click", e => {
            let percent = ((e.offsetX / e.target.getBoundingClientRect().width) * 100);
            document.querySelector(".circle").style.left = percent + "%";
            currentSong.currentTime = ((currentSong.duration) * percent) / 100;
        })

        // Addd an event listener for hamburger
        document.querySelector(".hamburger").addEventListener("click", () => {
            document.querySelector(".left").style.left = "0";
        })


        // // Play the first song
        // if (songs.length > 0) {
        //     var audio = new Audio(songs[0]);
        //     audio.play();

        //     audio.addEventListener("loadeddata", () => {
        //         let duration = audio.duration;
        //         // The duration variable now holds the duration (in seconds) of the audio clip
        //         console.log("Duration:", duration);
        //         console.log("Current source:", audio.currentSrc);
        //         console.log("Current time:", audio.currentTime);
        //     });
        // } else {
        //     console.log("No songs found.");
        // }
    } catch (error) {
        console.error('Error in main:', error);
    }
}

// Call main function when the DOM is loaded
document.addEventListener("DOMContentLoaded", main);
