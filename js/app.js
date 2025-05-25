const select=document.getElementById("character");
let char=[];

function magical(){
    fetch("https://hp-api.onrender.com/api/characters")

    .then((conv)=>{
        if(!conv.ok){
        throw new Error("this is the first fult");   
        }
        return conv.json();
    })
    .then((print)=>{
        char=print;
        console.log("this is the card"+print);
        card(print.slice(0,16));
    })
    .catch((error)=>{
        console.log("this is the fult "+error);
    })
}

function card(data){
    select.innerHTML="";
data.forEach(element => {
    
    const cards=document.createElement("div");
    cards.className=("cards");
    cards.innerHTML=`
    <img id="image" src="${element.image || 'images/not-found.png'}" onerror="this.src='image/not-found.png'">
    <div id="info">
    <p>Name: ${element.name}</p>
        <p>House: ${element.house}</p>
    <p>DateOfBirth: ${element.dateOfBirth}</p>
</div>
    `;
    select.appendChild(cards);
}
);
}

function filtering(value) {
    return char.filter(function(character) {
        if (value == "All") {
            return true;
        }
        if (value == "Gryffindor") {
            return character.house == "Gryffindor";
        }
        if (value == "Slytherin") {
            return character.house == "Slytherin";
        }
        if (value == "Hufflepuff") {
            return character.house == "Hufflepuff";
        }
        if (value == "Ravenclaw") {
            return character.house == "Ravenclaw";
        }
    });
}

document.getElementById("filter").addEventListener("change", function() {
    const filteredCharacters = filtering(this.value).slice(0,16 );
    card(filteredCharacters);
});

document.addEventListener("DOMContentLoaded", magical);