import fetchData from './fetchData.js';
const API = "https://api.spacexdata.com/v3/"
const YOUTUBEAPI = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCtI0Hodo5o5dUb67FeUjDeA&type=video&eventType=live&key=AIzaSyDBZ54X11YEYBUUqmoiS9BEozsxIAByH8M"
let lastNumber;
let nextlaunchdate;
let pageItems=20;
let drawitems=1;
let setteditems=1;

const setyoutubeIframe=(videoid,frameid)=>{
    let iframe = document.getElementById(frameid);
    iframe.src= `https://www.youtube.com/embed/${videoid}`;
    iframe.frameborder=0;
    iframe.allow="accelerometer accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowfullscreen;
};


const getSingleElement = async(reqdata,apifull) =>{
    try {
        const data = await fetchData(apifull);
        switch (reqdata) {
            case "flight_number":
                lastNumber=data.flight_number
                break;
            case "launch_date_utc":
                nextlaunchdate=data.launch_date_utc
                countdown(nextlaunchdate);
                break;
            case "youtube":
                console.log(data.items[0].id.videoId);

                setyoutubeIframe(data.items[0].id.videoId,"live-iframe")

            break;

        }

    } catch (error) {
        console.error(error)
    }    

}

getSingleElement("flight_number",`${API}launches/latest`);
getSingleElement("launch_date_utc",`${API}launches/next`);
getSingleElement("youtube",YOUTUBEAPI)

function countdown(date){
const countDownDate = new Date(date).getTime();
const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("demo").innerHTML = `Next launch in 
  ${days}d ${hours}h ${minutes}m ${seconds}s`;
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "Watch it live at ";
  }
}, 1000);
}


const createArr = (id) => {
    let arr;
    const name=document.getElementById(`${id}-name`);
    const year=document.getElementById(`${id}-date`);
    const launch=document.getElementById(`${id}-site`);
    const patch=document.getElementById(`${id}-patch`);
    const about=document.getElementById(`${id}-about`);
    const iframe=document.getElementById(`${id}-iframe`);
    

    return arr=[name,year,launch,patch,about,iframe]
}


const setData = async(url_api,arr) => {
    try {
        const data = await fetchData(url_api)
        arr[0].innerHTML=`Mission name: ${data.mission_name}`;
        let d = new Date(data.launch_date_utc);
        arr[1].innerHTML=`Launch Date: ${d.toDateString()}`;
        arr[2].innerHTML=`Launch Site: ${data.launch_site.site_name_long}`;
        arr[3].src=data.links.mission_patch_small;
        arr[4].innerHTML=`About this Mission: <br />${data.details}`;
        arr[5].src=`https://www.youtube.com/embed/${data.links.youtube_id}`;


    } catch (error) {
        console.error(error)
    }
}

const lastest=createArr('last')
const next=createArr('next')
setData(`${API}launches/latest`,lastest);
setData(`${API}launches/next`,next);



const createCard = (id) => {
    let card=document.createElement("section");
    let name=document.createElement("h4");
    let patch=document.createElement("img");
    let date=document.createElement("h4");
    let site=document.createElement("h4");
    let about=document.createElement("p");
    let iframe=document.createElement("iframe");
    iframe.src=""
    iframe.frameborder=0;
    iframe.allow="accelerometer accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowfullscreen;
    card.classList.add("launch");
    name.id=`${id}-name`;
    iframe.id=`${id}-iframe`
    patch.id=`${id}-patch`;
    date.id=`${id}-date`;
    site.id=`${id}-site`;
    about.id=`${id}-about`;
    card.appendChild(name);
    card.appendChild(patch);
    card.appendChild(date);
    card.appendChild(iframe);
    card.appendChild(site);
    card.appendChild(about);
    document.getElementById("cont").appendChild(card);

} 
while(pageItems>=drawitems){
    createCard(drawitems);
    drawitems++;
}
while(pageItems>=setteditems){
    let actid = createArr(setteditems);
    setData(`${API}launches/${setteditems}`,actid);
    setteditems++
}

