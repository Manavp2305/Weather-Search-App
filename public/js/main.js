const cityName = document.getElementById('cityname');
const submitbtn= document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val= document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const dayElement = document.getElementById("day");
const dateElement = document.getElementById("today_date");

const curDate = document.getElementById("date");


const getInfo = async(event) => {
   event.preventDefault();
  let cityVal = cityName.value;

  if(cityVal===""){
    city_name.innerText="Please Write the name before search";
    datahide.classList.add('data_hide');

  }else{
    try {
    
     let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=671142bb12362fbf0fd337e8a5a8c59b`;
    const response = await fetch(url);
    const data = await response.json()
    const arrData=[data]

      city_name.innerText=`${arrData[0].name},${arrData[0].sys.country}`;
      temp_real_val.innerText=arrData[0].main.temp;

      const tempMood = arrData[0].weather[0].main;
      // condition to check sunny or cloudy
      if(tempMood=="Clear")
      {
          temp_status.innerHTML = " <i class='fa-solid fa-sun fas'style='color:#eccc68;'></i>"
      }
      else if(tempMood=="Clouds")
        {
          temp_status.innerHTML = " <i class='fa-solid fa-cloud fas'style='color:#eccc68;'></i>"
        }
      else if(tempMood=="Rain")
        {
          temp_status.innerHTML = " <i class='fa-solid fa-cloud-rain fas'style='color:#eccc68;'></i>"
        }
      else
        {
          temp_status.innerHTML = " <i class='fa-solid fa-cloud fas'style='color:#eccc68;'></i>"
        }

        datahide.classList.remove('data_hide');


     
    } catch {
      city_name.innerText="Please Enter the city name Properly";
      datahide.classList.add('data_hide');
    }
  }

};
submitbtn.addEventListener("click", getInfo); 

const getCurrentDay = () => {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let currentTime = new Date();
  let day = weekday[currentTime.getDay()];
  return day;
};

const getCurrentTime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var now = new Date();
  var month = months[now.getMonth() ];
  var date = now.getDate();

  let hours = now.getHours();
  let mins = now.getMinutes();

  let periods = "AM";

  if (hours > 11) {
    periods = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }

  return `${month} ${date} | ${hours}:${mins}${periods}`;
};
curDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();
dayElement.innerText = getCurrentDay(); // Update the day element
dateElement.innerText = getCurrentTime(); // Update the date element