//mumbai location 19°02′11.11″ North, longitude 72°51′34.09″ East
//mumbbai const defuleLocation = "#/wether?lat=19.0144&lon=72.8479";


import{updateWeater,error404} from "./script.js";

const defuleLocation = "#/wether?51.5073219&-0.12767474"; //london

const currentLocation = function () {
   window.navigator.geolocation.getCurrentPosition(res=>{
    const {latitude, longitude} = res.coords;
    // console.log(latitude);
    // console.log(longitude);
    // updateWeater(`lat=${latitude}`,`lon=${longitude}`)  
    updateWeater(latitude,longitude)
  },err =>{
    window.location.hash = defuleLocation;
  })
};

const searchLoaction = query =>updateWeater(...query.split("&"));
// updateWeater("lat=51.5073219","lon=-0.12767474")


const routes = new Map([
  [ "/current-loaction", currentLocation],
  ["/wether", searchLoaction],
]);

const checkHash = function () {
  const requestFromURL = window.location.hash.slice(1)
  const [route,query] = requestFromURL.includes ? requestFromURL.split("?") :[requestFromURL];
  routes.get(route) ? routes.get(route)(query) : error404();
};

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
  if (!window.location.hash) {
    window.location.hash = "#/current-loaction";
  } else {
    checkHash();
  }
});
