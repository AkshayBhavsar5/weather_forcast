import { fetchData, url } from "./apikey.js"
import * as  module from "./module.js"

/** 
 * addevent listner   
 * element
 * eventType
 * callback
 */
const addEventOnElements = function (elements,eventType,callback) {
    for(const element of elements) element.addEventListener(eventType,callback)
}

/**
 *   searchfiled active event
 *  searchfiled ul its li
 */

const searchbtn = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]")
const toggleSearch = ()=> searchbtn.classList.toggle("active");
addEventOnElements(searchTogglers,"click",toggleSearch)

const searchFiled = document.querySelector("[data-search-filed]");
const searchResultvar = document.querySelector("[data-search-result]");

console.log();
let searchTimeout = null
const searchTimeoutDuration = 500;

searchFiled.addEventListener("input", function () {

    searchTimeout && clearTimeout(searchTimeout);

    if (!searchFiled.value) {
        searchResultvar.classList.remove("active");
        searchResultvar.innerHTML = "";
        searchFiled.classList.remove("searching");

    } else {
        searchFiled.classList.add("searching");
    }

    if (searchFiled.value) {
        searchTimeout = setTimeout(() => {
            fetchData(url.geoCoding(searchFiled.value), function (location) {
                searchFiled.classList.add("searching");
                searchResultvar.classList.add("active");
                searchResultvar.innerHTML=`
                <ul class="viewList" data-search-list>
                   
                </ul>
                `
                const /**{nodelist}[] */ item = []
                for(const {name,lat,lon,country,state} of location){
                    const searchItem = document.createElement("li");
                    searchItem.classList.add("viewItem")
                    searchItem.innerHTML=`
                        <img style="width:25px; height: 25px;" class="location" src="icon/icons8-location-50.png">
                            <div>
                                <p class="itemTitle" style="color: #fff;">${name}</p>
                                <p class="itemSubtitle" style="color: #787980;">${state || "" } ${country}</p>
                            </div>
                        <a href="#/weather?lat=${lat}&lon=${lon}" class="itemLink" aria-label="${name}" data-search-tollger></a>
                    `;
                    searchResultvar.querySelector("[data-search-list]").appendChild(searchItem);
                    item.push(searchItem.querySelector("[data-search-tollger]"))
                }
                addEventOnElements(item,"click",function(){
                    toggleSearch();
                    searchResultvar.classList.remove("active");  
                })
                    
            })
        },searchTimeoutDuration);
    }
})


const loading= document.querySelector("[data-lodaing]")
const mainContainer= document.querySelector("[data-container]")
const currentLocationBtn = document.querySelector("[data-current-location-btn]")
const errorcontent = document.querySelector("[data-error-content]");


    /**
     * current weather section 
    */


export const updateWeater = function (lat,lon) {
    loading.style.display="gird";
    mainContainer.style.overflowy = "hidden";
    mainContainer.classList.contains("fade-in") ?? mainContainer.classList.remove("fade-in")
    errorcontent.style.display = "none";
            
        const currentWeatherSection = document.querySelector("[data-current-weather]")  
        const fiveDaysForecast = document.querySelector("[data-5-day-forecast]")
        const highlightsSection = document.querySelector("[data-highlights]")
        const hourlyForcast =document.querySelector("[data-hourly-forecast]")

        currentWeatherSection.innerHTML="";
        fiveDaysForecast.innerHTML="";        
        highlightsSection.innerHTML="";
        hourlyForcast.innerHTML="";

        if(window.location.hash=== "#/current-loaction"){
        currentLocationBtn.setAttribute("disabled","")
        }
        else{
        currentLocationBtn.removeAttribute("disabled")
        }
        
        fetchData(url.currentWeather(lat,lon),function (currentWeather) {
            const {
                weather,
                dt:dateUnix,
                sys:{sunrise:sumriseUnixUTC,sunset:sunsetUnixUTC},
                main:{temp,feel_like,pressure,humidity},
                visiblity,
                timezone
             } =currentWeather
             const [{description,icon}]=weather;
             const card = document.createElement("div");
             card.classList.add("card" ,"current-weather-card");
             card.innerHTML=`
             div class="weatherDet">
                    <h2>Now</h2>
                    <h1 class="temp-1">${parseInt(temp)}&deg;<sup>c</sup></h1>
                    <img src="icon/${icon}" class="Weather-icon mainWeathericon" alt=${description}>
                    <p class="cloud-condition">${description}</p>
                 </div>
                <ul class="areaDate meta-list">
                    <li class="leftSideDate meta-item">
                        <img class="area-icon" src="icon/icons8-date-50.png">
                        <p style="font-size: 18px;">${module.getDate(dateUnix,timezone)}</p>
                    </li>
                    <li class="leftSideLocation meta-item">
                        <img class="area-icon" src="icon/icons8-location-50.png">
                        <p style="font-size: 18px;" data-location></p>
                    </li>
                </ul>`

            fetchData(url.geoReverse(lat,lon),function ([{name,country}]) {
                card.querySelector("[data-location]").innerHTML=`${name}${country}`
            })    
            currentWeatherSection.appendChild(card);
        });
        
}


export const error404 = function () {
    
}