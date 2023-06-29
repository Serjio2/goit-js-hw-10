const e=document.querySelector(".breed-select");console.log(e),fetch("https://api.thecatapi.com/v1/breeds?api_key=live_Ltm2GBWPpfVNBkV01FC69DA1X4Xk5kGZBGw4eapAO9DTZDepX49nl7yBbmf24740").then((e=>e.json())).then((t=>{for(let n=0;n<t.length;n+=1){const o=document.createElement("option");e.append(o),o.textContent=t[n].name}}));
//# sourceMappingURL=index.d96a0a03.js.map
