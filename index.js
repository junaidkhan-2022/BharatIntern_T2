
const  tempField  = document.querySelector(".weather1");
const  cityField  = document.querySelector(".weather2 p");
const  dateField  = document.querySelector(".weather2 span");
const  emojiField  = document.querySelector(".weather3 img");
const  weatherField  = document.querySelector(".weather3 span");
const  searchField  = document.querySelector(".serchField");
const  form = document.querySelector("form");
 let target = "kolkata";

const fetchData = async (target) =>{
   try {
    const url = `https://api.weatherapi.com/v1/current.json?key=0431be4d08394867bb8104335242401&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    const {
        current: { temp_c , 
            condition:{text, icon},
        },
        location : { name, localtime },
    } = data;
    updateDOM(temp_c, name, localtime, icon, text);
   } catch (error) {
     alert("Location Not Found.");
   }
};

function updateDOM(temperature,city,time,emoji, text){
    tempField.innerText= `${temperature}°C`;
    cityField.innerText = city;
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFull(new Date(exactDate).getDay());
    dateField.innerText = `${exactTime} - ${exactDay} - ${exactDate}`
    emojiField.src = emoji;
    weatherField.innerText = text;
}
fetchData(target);

function getDayFull(num){
    switch (num) {
        case 0:
            return "Sunday"            
            break;
        case 1:
            return "Monday"            
            break;
        case 2:
            return "Tuesday"            
            break;
        case 3:
            return "Wednesday"            
            break;
        case 4:
            return "Thursday"            
            break;
        case 5:
            return "Saturday"            
            break;
        case 6:
            return "Sunday"            
            break;
        default:
            return "Don't know!!"
            break;
    }
}


form.addEventListener("submit", (e)=>{
    e.preventDefault();

    target = searchField.value;
    fetchData(target);
});
