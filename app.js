let today = new Date();
today = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

const countries =
{
    "Cairo": "EG",
    "Alexandria": "EG",
    "Mansoura": "EG",
    "Mahalla El Kubra": "EG",
    "Giza": "EG",
    "Luxor": "EG",
    "Aswan": "EG",
    "Tanta": "EG",

    "Riyadh": "SA",
    "Makkah": "SA",
    "Madinah": "SA",
    "Jeddah": "SA",
    "Dammam": "SA",
    "Taif": "SA",

    "Jerusalem": "PS",
    "Gaza": "PS",
    "Hebron": "PS",
    "Ramallah": "PS",
    "Nablus": "PS",

    "Baghdad": "IQ",
    "Basra": "IQ",
    "Mosul": "IQ",
    "Erbil": "IQ",
    "Najaf": "IQ",

    "Damascus": "SY",
    "Aleppo": "SY",
    "Homs": "SY",
    "Latakia": "SY",

    "Amman": "JO",
    "Zarqa": "JO",
    "Irbid": "JO",
    "Aqaba": "JO",

    "Beirut": "LB",
    "Tripoli (Lebanon)": "LB",
    "Sidon": "LB",
    "Tyre": "LB",

    "Abu Dhabi": "AE",
    "Dubai": "AE",
    "Sharjah": "AE",
    "Ajman": "AE",
    "Al Ain": "AE",

    "Kuwait City": "KW",
    "Hawalli": "KW",
    "Salmiya": "KW",

    "Doha": "QA",
    "Al Wakrah": "QA",
    "Al Rayyan": "QA",

    "Manama": "BH",
    "Muharraq": "BH",
    "Riffa": "BH",

    "Muscat": "OM",
    "Salalah": "OM",
    "Sohar": "OM",
    "Nizwa": "OM",

    "Sanaa": "YE",
    "Aden": "YE",
    "Taiz": "YE",
    "Mukalla": "YE",

    "Rabat": "MA",
    "Casablanca": "MA",
    "Marrakech": "MA",
    "Fes": "MA",
    "Tangier": "MA",

    "Algiers": "DZ",
    "Oran": "DZ",
    "Constantine": "DZ",
    "Annaba": "DZ",

    "Tunis": "TN",
    "Sfax": "TN",
    "Sousse": "TN",
    "Kairouan": "TN",

    "Tripoli (Libya)": "LY",
    "Benghazi": "LY",
    "Misrata": "LY",
    "Sabha": "LY",

    "Khartoum": "SD",
    "Omdurman": "SD",
    "Port Sudan": "SD",

    "Mogadishu": "SO",
    "Hargeisa": "SO",
    "Kismayo": "SO",

    "Djibouti": "DJ",
    "Ali Sabieh": "DJ",

    "Nouakchott": "MR",
    "Nouadhibou": "MR",
    "Rosso": "MR",

    "Moroni": "KM",
    "Mutsamudu": "KM",
    "Fomboni": "KM"
}
const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر"
];

new TomSelect("#selected-city", {
    create: false,
    searchField: ["text", "value"],
    placeholder: "ابحث عن المدينة...",
    maxOptions: null,
    allowEmptyOption: true
});

document.getElementById("selected-city").addEventListener('change', ()=>{
    let cityName = document.getElementById("selected-city").selectedOptions[0].text; 
    document.getElementById("city-name").textContent = 'مواقيت الصلاة ب'+cityName

    let city = document.getElementById("selected-city").value;
    let country = countries[city]
    getTimes(today, city, country)
})

function fun1(str){
    let time = str.slice(0,2);
    if (time == 12) return `${str} PM`;
    if(time > 12){
        return `${time-12}:${str.slice(3,5)} PM`
    }
    return `${str} AM`;
}

function getTimes(date, city, country){

    fetch('https://api.aladhan.com/v1/timingsByCity/'+date+'?city='+city+'&country='+country, {
        headers: {
        'Accept-Encoding': ''
    }
    })
    .then(response=>{
        if(!response.ok){
            throw new Error("Can't connect to server");
        }
        return response.json()
    })
    .then(myJson=>{
        document.getElementById("weekday").textContent = myJson.data.date.hijri.weekday.ar
        document.getElementById("gregorian-date").textContent = `${myJson.data.date.gregorian.day} ${months[(myJson.data.date.gregorian.month.number)-1]} ${myJson.data.date.gregorian.year} مـ`
        document.getElementById("hijri-date").textContent = `${myJson.data.date.hijri.day} ${myJson.data.date.hijri.month.ar} ${myJson.data.date.hijri.year} هـ`
        
        
        document.getElementById("fajr").innerHTML =`
        <h2 class="prayer-name">الفجر</h2>
        <h3 class="prayer-time">${fun1(myJson.data.timings.Fajr)}</h3>
        `
        document.getElementById("Sunrise").innerHTML =`
        <h2 class="prayer-name">الشروق</h2>
        <h3 class="prayer-time">${fun1(myJson.data.timings.Sunrise)}</h3>
        ` 
        document.getElementById("Dhuhr").innerHTML =`
        <h2 class="prayer-name">الظهر</h2>
        <h3 class="prayer-time">${fun1(myJson.data.timings.Dhuhr)}</h3>
        `
        document.getElementById("Asr").innerHTML =`
        <h2 class="prayer-name">العصر</h2>
        <h3 class="prayer-time">${fun1(myJson.data.timings.Asr)}</h3>
        `
        document.getElementById("Maghrib").innerHTML =`
        <h2 class="prayer-name">المغرب</h2>
        <h3 class="prayer-time">${fun1(myJson.data.timings.Maghrib)}</h3>
        `
        document.getElementById("Isha").innerHTML =`
        <h2 class="prayer-name">العشاء</h2>
        <h3 class="prayer-time">${fun1(myJson.data.timings.Isha)}</h3>
        `
    })
    .catch(e=>{
        document.getElementById("error").textContent = e
    })
}

getTimes(today, "cairo", "EG")
