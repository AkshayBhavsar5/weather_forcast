const apikey = "f747c494e929fdae38e0c6c95663734b";

export function weatherapi() {
  //let url = `https://api.openweathermap.org/data/2.5/weather?q&units=metric=${searchBtnValue}&appid=f747c494e929fdae38e0c6c95663734b`;
  // console.log(url);

  fetch(`${url}&appid=${apikey}`)
    .then((res) => res.json())
    .then((data) => callback(data));
}

