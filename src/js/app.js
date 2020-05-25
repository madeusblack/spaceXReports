import fetchData from './fetchData.js';
const API = "https://api.spacexdata.com/v3/"
let lastNumber;
let pageItems=20;
let drawitems=1;
let setteditems=1;
const lastFlightNumber = async() =>{
    try {
        const data = await fetchData(`${API}launches/latest`);
        lastNumber=data.flight_number
        console.log(`the last fligth number it's ${lastNumber}`)
    } catch (error) {
        console.error(error)
    }    

}
lastFlightNumber();

const createArr = (id) => {
    let arr;
    const name=document.getElementById(`${id}-name`);
    const year=document.getElementById(`${id}-date`);
    const launch=document.getElementById(`${id}-site`);
    const patch=document.getElementById(`${id}-patch`);
    const about=document.getElementById(`${id}-about`);

    return arr=[name,year,launch,patch,about]
}


const setData = async(url_api,arr) => {
    try {
        const data = await fetchData(url_api)
        arr[0].innerHTML=`Mission name: ${data.mission_name}`;
        var d = new Date(data.launch_date_utc);
        arr[1].innerHTML=`Launch Date: ${d.toDateString()}`;
        arr[2].innerHTML=`Launch Site: ${data.launch_site.site_name_long}`;
        arr[3].src=data.links.mission_patch_small;
        arr[4].innerHTML=`About this Mission: <br />${data.details}`;


    } catch (error) {
        console.error(error)
    }
}
//--------------to be created dinamicaly
/*        
            <section class="launch">
            <h3>Lastest launch of SpaceX</h3>
            <h4 >Mission name: <strong id ='last-name'></strong></h4>
            <img id="last-patch" src="" alt="mission patch">
            <h5 >Launch Date: <strong id ='last-year'></strong></h5>
            <h5 >Launch Site: <strong id ='last-site'></strong></h5>
            <h4>About this Mission:</h4>
            <p id="last-about"></p>

        </section>
*/
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
    card.classList.add("launch");
    name.id=`${id}-name`;
    patch.id=`${id}-patch`;
    date.id=`${id}-date`;
    site.id=`${id}-site`;
    about.id=`${id}-about`;
    card.appendChild(name);
    card.appendChild(patch);
    card.appendChild(date);
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