"use strict";

import { fetchData, url } from "./apikey.js";
import * as module from "./module.js";

/**
 * addevent listner
 * element
 * eventType
 * callback
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (const element of elements) element.addEventListener(eventType, callback);
};

/**
 *   searchfiled active event
 *  searchfiled ul its li
 */

const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const searchFiled = document.querySelector("[data-search-filed]");

const searchResultvar = document.querySelector("[data-search-result]");

searchView.addEventListener("click", () => searchFiled.focus());
document.addEventListener("click", function (e) {
  var target = e.target;
  // Check if click target is not within search div or its children
  if (!searchView.contains(target)) {
    searchResultvar.style.display = "none";
    searchFiled.value = "";
  } else {
    if (searchResultvar.contains(target)) {
      searchResultvar.style.display = "none";
      searchFiled.value = "";
      searchFiled.blur();
    }
  }
});
let searchTimeout = null;
const searchTimeoutDuration = 500;

searchFiled.addEventListener("input", function () {
  searchTimeout ?? clearTimeout(searchTimeout);

  if (!searchFiled.value) {
    searchResultvar.style.display = "none";
    // searchResultvar.innerHTML = "";
  }
  // else {
  //   searchFiled.classList.add("searching");
  // }
  if (searchFiled.value) {
    searchTimeout = setTimeout(() => {
      fetchData(url.geoCoding(searchFiled.value), function (location) {
        // searchFiled.classList.add("searchFiled");
        searchResultvar.style.display = "block";
        // searchResultvar.classList.add("active");
        searchResultvar.innerHTML = `
                <ul class="viewList" data-search-list>            
                </ul>
                `;
        const /**{nodelist}[] */ item = [];
        for (const { name, lat, lon, country, state } of location) {
          const searchItem = document.createElement("li");
          searchItem.classList.add("viewItem");
          searchItem.innerHTML = `
          <span> <img src="icon/icons8-location-50.png" style="width: 25px;" height="25px"class="m-icon">
          </span>
              <div>
                <p class="itemTitle">${name}</p>
                <p class="itemSubtitle">${state || ""} ${country}</p>
              </div>
              <a href="#/weather?${lat}&${lon}" aria-label="${name}" class="itemLink" data-search-tollger></a>
              `;
          searchResultvar
            .querySelector("[data-search-list]")
            .appendChild(searchItem);
          item.push(searchItem.querySelector(".itemLink"));
        }
        // addEventOnElements(item, "click", function () {
        //   toggleSearch();
        // });
      });
    }, searchTimeoutDuration);
  }
  // console.log(searchResultvar);
  // console.log(SearchTarget.value);
});
const mainContainer = document.querySelector("[data-container]");
const loading = document.getElementsByClassName("loading")[0];
const currentLocationBtn = document.querySelector((".location", ".second-btn"));
currentLocationBtn.addEventListener("click", () => {
  window.location.hash = "#/current-loaction";
});
const errorcontent = document.querySelector("[data-error-content]")[0];

/**
 * current weather section
 */

export const updateWeater = function (lat, lon) {
  loading.style.display = "grid";
  //   mainContainer.style.overflowy = "hidden";
  mainContainer.style.display = "none";
  mainContainer.classList.remove("fade-in");
  // errorcontent.style.display = "none";

  const currentWeatherSection = document.querySelector(
    "[data-current-weather]"
  );
  const fiveDaysForecast = document.querySelector("[data-5-day-forecast]");
  const highlightsSection = document.querySelector("[data-highlights]");
  const hourlyForcast = document.querySelector("[data-hourly-forecast]");

  currentWeatherSection.innerHTML = "";
  highlightsSection.innerHTML = "";
  fiveDaysForecast.innerHTML = "";
  hourlyForcast.innerHTML = "";

  // if (window.location.hash === "#/current-loaction") {
  //   currentLocationBtn.setAttribute("disabled", "");
  // } else {
  //   currentLocationBtn.removeAttribute("disabled");
  // }

  /**
   * Current weather Section
   */
  fetchData(url.currentWeather(lat, lon), function (currentWeather) {
    loading.style.display = "none";
    mainContainer.style.display = "flex";

    const {
      weather,
      dt: dateUnix,
      sys: { sunrise: sumriseUnixUTC, sunset: sunsetUnixUTC },
      main: { temp, feels_like, pressure, humidity },
      visibility,
      timezone,
    } = currentWeather;

    // console.log(currentWeather);

    const [{ description, icon }] = weather;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                    <h2>Now</h2>
                    <h1 class="temp-1">${parseInt(temp)}&deg;<sup>c</sup></h1>
                    <img src="icon/icons8-cloud-96.png" class="Weather-icon mainWeathericon" alt=${description}>
                    <p class="cloud-condition">${
                      description[0].toUpperCase() + description.slice(1)
                    }</p>
                 
                <ul class="areaDate meta-list">
                    <li class="leftSideDate meta-item">
                        <img class="area-icon" src="icon/icons8-date-50.png">
                        <p style="font-size: 18px;">${module.getDate(
                          dateUnix,
                          timezone
                        )}</p>
                    </li>
                    <li class="leftSideLocation meta-item">
                        <img class="area-icon" src="icon/icons8-location-50.png">
                        <p style="font-size: 18px;" data-location></p>
                    </li>
                </ul>
          `;

    fetchData(url.geoReverse(lat, lon), function ([{ name, country }]) {
      card.querySelector("[data-location]").innerHTML = `${name}, ${country}`;
    });
    currentWeatherSection.appendChild(card);

    /**
     * Today's Highlights
     */

    fetchData(url.airPol(lat, lon), function (airPollution) {
      const [
        {
          main: { aqi },
          components: { pm2_5, so2, no2, o3 },
        },
      ] = airPollution.list;

      const airPollutionCard = document.createElement("div");
      airPollutionCard.classList.add("rightfirst");
      airPollutionCard.innerHTML = `
          <h2 class="title-2">Today's Highlights</h2>
          <div class="rightFirstChild">
            <div class="right-small-one">
              <h3 class="title-1">Air Queality Index</h3>
              <div class="air-quality-2">
                <img src="icon/icons8-wind-100.png" class="Weather-icon" />
                <ul class="card-list">
                  <li class="right-card-item">
                    <p  calss="card-list-p">PM<sub>2.5</sub></p>
                    <p class="card-p-tag">${pm2_5.toPrecision(3)}</p>
                  </li>
                  <li class="right-card-item">
                    <p calss="card-list-p">SO<sub>2</sub></p>
                    <p class="card-p-tag">${so2.toPrecision(3)}</p>
                  </li>
                  <li class="right-card-item">
                    <p calss="card-list-p">NO<sub>2</sub></p>
                    <p class="card-p-tag">${no2.toPrecision(3)}</p>
                  </li>
                  <li class="right-card-item">
                    <p calss="card-list-p">O<sub>3</sub></p>
                    <p class="card-p-tag">${o3.toPrecision(3)}</p>
                  </li>
                </ul>
              </div> 
              <span class="badge aqi-${aqi} lable--${aqi}" title="${
        module.aqiTitle[aqi].massage
      }">
                ${module.aqiTitle[aqi].level}
              </span>
            </div>
            <div class="right-small-two">
              <h3 class="title-1">Sunrise & Sunset</h3>
              <div class="sunrise-sunset">
                <div class="card-list">
                  <img
                    src="icon/icons8-sunrise-96.png"
                    alt="clear_day"
                    class="Weather-icon"/>
                  <div>
                    <p class="lable-1">
                      Sunrise
                    </p>
                    <p  class="title-3 sunriseTime">
                      ${module.getTime(sumriseUnixUTC, timezone)}
                    </p>
                  </div>
                </div>
                <div class="card-list">
                  <img
                    src="icon/icons8-sunset-96.png"
                    alt="clear_night"
                    class="Weather-icon"/>
                  <div>
                    <p class="lable-1">
                      Sunset
                    </p>
                    <p class="title-3 sunsetTime">
                    ${module.getTime(sunsetUnixUTC, timezone)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rightSecondChild">
            <div class="right-small-three highlight-card">
              <h3 class="title-3">Humidity</h3>
              <div class="wrapper">
                <img  class="wrapper-img" src="icon/icons8-humidity-100.png" />
                <p class="title-1 humidity">
                  ${humidity}<span>%</span>
                </p>
              </div>
            </div>
            <div class="right-small-four highlight-card">
              <h3 class="title-3">Pressure</h3>
              <div class="wrapper">
                <img class="wrapper-img" src="icon/icons8-dry-96 (1).png" />
                <p class="title-1 pressure">
                  ${pressure}<span>%</span>
                </p>
              </div>
            </div>
            <div class="right-small-five highlight-card">
              <h3 class="title-3">Visibility</h3>
              <div class="wrapper">
                <img class="wrapper-img" src="icon/icons8-eye-100.png"/>
                <p class="title-1 visibility">
                  ${visibility / 1000}<span>%</span>
                </p>
              </div>
            </div>
            <div class="right-small-six highlight-card">
              <h3 class="title-3">Feels Like</h3>
              <div class="wrapper">
                <img class="wrapper-img" src="icon/icons8-temperature-100.png" />
                <p class="title-1 feelsLike" >
                  ${parseInt(feels_like)}<span>%</span>
                </p>
              </div>
            </div>
          </div>
              `;
      highlightsSection.appendChild(airPollutionCard);
    });

    /**
     * 24h Forecast Section
     */

    fetchData(url.forcast(lat, lon), function (forecast) {
      const {
        list: forecastList,
        city: { timezone },
      } = forecast;
      /**
       * main temp & wind section
       */
      hourlyForcast.innerHTML = `
      <h2 class="title-2">Today at</h2>
      <div class="tempDiv" >
        <ul class="slider-list" data-temp>
        </ul>
      </div>
      <div class="windDiv">
        <ul class="slider-list" data-wind>
        </ul>
      </div>
      `;

      for (const [index, data] of forecastList.entries()) {
        if (index > 7) break;
        const {
          dt: dateTimeUnix,
          main: { temp },
          weather,
          wind: { deg: windDirecation, speed: windSpeed },
        } = data;
        const [{ description, icon }] = weather;

        /**
         * temp section
         */
        const tempLi = document.createElement("li");
        tempLi.classList.add("slider-item");

        tempLi.innerHTML = `
        <div class="slider-card">
            <p class="p-tag">${module.getHours(dateTimeUnix, timezone)}</p>
              <img src="icon/icons8-moon-48.png" class="Weather-icon" alt="${description}" title="${description}"/>
            <p class="p-tag">${parseInt(temp)}&deg;</p>
        </div>
        `;
        hourlyForcast.querySelector("[data-temp]").appendChild(tempLi);
        /**
         * wind section
         */
        const wind = document.createElement("li");
        wind.classList.add("slider-item");
        wind.innerHTML = `
        <div class="slider-card">
        <p class="p-tag">${module.getHours(dateTimeUnix, timezone)}</p>
          <img 
          src="icon/icons8-navigation-1.png"
          class="Weather-icon"/
          alt="direction"
          style = "transform: rotate(${windDirecation - 180}deg);"
          >
          <p class="p-tag">${parseInt(module.disteanceinKmh(windSpeed))}km/h</p>
      </div>
        `;
        // console.log(module.getHours);
        hourlyForcast.querySelector("[data-wind]").appendChild(wind);
      }

      /**
       * 5 Day Forcast
       */
      fiveDaysForecast.innerHTML = `
      <ul data-forcast-list>
      </ul>
      `;
      for (let i = 7, len = forecastList.length; i < len; i += 8) {
        const {
          main: { temp_max },
          weather,
          dt_txt,
        } = forecastList[i];

        const [{ description, icon }] = weather;
        const date = new Date(dt_txt);

        const crtLi = document.createElement("li");
        crtLi.classList.add("card-item");
        crtLi.innerHTML = `
        <div class="icon-wrapper">
        <img
          src="icon/icons8-moon-48.png"
          width="25px"
          height="25px"
          alt="${description}"
          class="Weather-icon WeatherIconForDays"
          title="${description}"
          />
        <span class="span">
          <p class="temp-2">${parseInt(temp_max)}</p>
        </span>
      </div>
      <p class="labal-1 leftDate">${date.getDate()} ${
          module.monthsName[date.getMonth()]
        }</p>
      <p class="labal-1">${module.weekDaysName[date.getUTCDay()]}</p>
        `;
        fiveDaysForecast
          .querySelector("[data-forcast-list]")
          .appendChild(crtLi);
      }
    });
  });
};

export const error404 = function () {};
