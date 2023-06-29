import axios from "axios";

// axios.defaults.headers.common["x-api-key"] = "live_Ltm2GBWPpfVNBkV01FC69DA1X4Xk5kGZBGw4eapAO9DTZDepX49nl7yBbmf24740";



const selectItemEl = document.querySelector(".breed-select");
// const itemList = document.createElement("option");

// selectItemEl.append(itemList);


console.log(selectItemEl)
// console.log(itemList)


fetch("https://api.thecatapi.com/v1/breeds?api_key=live_Ltm2GBWPpfVNBkV01FC69DA1X4Xk5kGZBGw4eapAO9DTZDepX49nl7yBbmf24740")
.then(response => {return response.json()})
.then(data => {
    // console.log(data.length);
    for (let i = 0; i < data.length; i += 1) {
    // selectItemEl.append(itemList.value = data[0].name)
    const itemList = document.createElement("option");
    selectItemEl.append(itemList);
    itemList.textContent = data[i].name} 
})



