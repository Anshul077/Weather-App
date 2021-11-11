console.log("welcome to weather app");
var mq = window.matchMedia("(max-width: 450px)");
let loading = document.getElementById("loading");
let display=document.getElementById("display")

if (mq.matches) {
  document.getElementById("bannerImage").src="bg4.jpg"
}

document.getElementById("btn").addEventListener("click", () => {
  if (mq.matches) {
    document.getElementById("container").style.height = "53vh";
    document.getElementById("container").style.marginTop = "20px";
    loading.style.margin="0 100px"
  }
  loading.innerText="LOADING...."
  let cityName = document.getElementById("text").value;

  document.getElementById("container").style.height = "20vh";
  loading.style.display="inline-block"
  display.style.display="none"

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=20c17fa9fcf1314d7ca2460a18f8ed82`
  )
    .then((response) => response.json())
    .then((data) => {
      let city = data["name"];
      
      if(data["message"] || cityName.toUpperCase()!=city.toUpperCase()){
        loading.innerText="WRONG CITY NAME"
      }
      else{
        let temp = data["main"]["temp"];
        let info2 = data["weather"][0]["description"];
        let icon = data["weather"][0]["icon"];
        let humidity = data["main"]["humidity"];
        let speed = data["wind"]["speed"];
  
        var mq = window.matchMedia("(max-width: 450px)");
      if (mq.matches) {
        document.getElementById("container").style.height = "53vh";
      }
      else{
        document.getElementById("container").style.height = "64vh";
      }
        loading.style.display="none"
        display.style.display="inline-block"
        
        let tempC=Math.round(temp-273.15)
        document.getElementById("city").innerText = city.toUpperCase();
        document.getElementById("temp").innerText = tempC+"°C";
        document.getElementById("image").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.getElementById("info2").innerText =info2.toUpperCase();
        document.getElementById("humidity").innerText = "HUMIDITY: "+humidity+"%";
        document.getElementById("speed").innerText = "WIND SPEED: "+speed+"KM/HR";
      }
      
    })
    
});

function loaded() {
  document.getElementById("text").value = "";
}
window.onload = loaded;
