console.log("Hello World");

// fuction to get songs from directory 
async function getSongs() {
    let a = await fetch("url")
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }
    return songs
}

async function main(){
    // list of the songs 
    let songs = await getSongs();
    console.log(songs);

}


