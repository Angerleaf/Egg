var energy = 0;
var money = 0;
var battery = 100;
var batteryLevel = 1;
var savegame;
var clickadd = 1;

var ants = 0;
var bees = 0;
var beeCost = 10;
var batteryCost = 11;
var antCost = 10;
var spd = 1000;
var strength = 0;
var strengthCost = 10;


function saveG() {
    var save = {
        energy: energy,
        money: money,
        battery: battery,
        batteryLevel: batteryLevel,
        ants: ants,
        bees: bees
    };
    localStorage.setItem("save",JSON.stringify(save));
}

function loadG() {
    savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.energy !== "undefined") energy = savegame.energy;
    if (typeof savegame.money !== "undefined") money = savegame.money;
}

function resetG() {
    localStorage.removeItem("save")
}

function energyAdd(number){
    if(energy < battery){
        energy = energy + number;
        document.getElementById("energy").innerHTML = energy; 
    }   
}

function energySell(){
    money += energy;
    energy = 0; 
}


function buyStrength() {
    strengthCost = Math.floor(10 * Math.pow(1.1,strength));
    if(money >= strengthCost){
        strength = strength + 1;
        clickadd = strength + 1;
        money = money - strengthCost;
        document.getElementById("clickadd").innerHTML = clickadd;
        document.getElementById('strength').innerHTML = strength;
        document.getElementById('money').innerHTML = money; 
    }
    document.getElementById('strengthCost').innerHTML = Math.floor(10 * Math.pow(1.1,strength));
}
function buyAnt(){
    antCost = Math.floor(10 * Math.pow(1.1,ants));
    if(money >= antCost){
        ants = ants + 1;
    	money = money - antCost;
        document.getElementById('ants').innerHTML = ants;
        document.getElementById('money').innerHTML = money; 
    };      
    document.getElementById('antCost').innerHTML = Math.floor(10 * Math.pow(1.1,ants));
};
function buyBee(){
    beeCost = Math.floor(10 * Math.pow(1.1,bees));
    if(money >= beeCost){
        bees = bees + 1;
    	money = money - beeCost;
        document.getElementById('bees').innerHTML = bees;
        document.getElementById('money').innerHTML = money; 
    };
    document.getElementById('beeCost').innerHTML = Math.floor(10 * Math.pow(1.1,bees));
};

function buyBattery(){
    batteryCost = Math.floor(10 * Math.pow(1.1,batteryLevel));
    if(money >= batteryCost){
        batteryLevel += 1;
    	money = money - batteryCost;
        document.getElementById('batteryLevel').innerHTML = batteryLevel;
        document.getElementById('money').innerHTML = money; 
    };      
    document.getElementById('batteryCost').innerHTML = Math.floor(10 * Math.pow(1.1,batteryLevel));
};
function speed(number){
    spd = number;
    window.clearInterval(id);
    id = setInterval(update, spd);
}

var id = setInterval(update, spd);

function update(){

    if(energy < battery) {
        energyAdd(ants);
        energyAdd(bees);
    }
}

var interval = setInterval(function() {

    document.getElementById("battery").innerHTML = battery;
    document.getElementById('energy').innerHTML = energy; 
    document.getElementById('money').innerHTML = money; 
    var current_progress = Math.round(energy/battery*100);
    $("#dynamic")
    .css("width", current_progress + "%")
    .attr("aria-valuenow", current_progress)
    .text("Battery " + current_progress + "%");
    if(current_progress >= 50) {
        $('#dynamic').removeClass("progress-bar progress-bar-striped active");
        $('#dynamic').addClass("progress-bar progress-bar-warning progress-bar-striped active");  
    }
    else {
        $('#dynamic').removeClass("progress-bar progress-bar-warning progress-bar-striped active");
        $('#dynamic').removeClass("progress-bar progress-bar-danger progress-bar-striped active");
        $('#dynamic').addClass("progress-bar progress-bar-striped active");
    }
    if(current_progress >= 90) {
        $('#dynamic').removeClass("progress-bar progress-bar-warning progress-bar-striped active");
        $('#dynamic').removeClass("progress-bar progress-bar-striped active");
        $('#dynamic').addClass("progress-bar progress-bar-danger progress-bar-striped active");
    }
    else {
        $('#dynamic').removeClass("progress-bar progress-bar-danger progress-bar-striped active");
        $('#dynamic').addClass("progress-bar progress-bar-striped active");
    }
    

    battery = batteryLevel * 100;

    if(energy > battery){
        energy = battery;
    }
    
    if(money >= document.getElementById('antCost').innerHTML){
        $('#ant').removeClass('disabled');
        $('#ant').removeClass('btn btn-danger');
        $('#ant').addClass('btn btn-success');
    }
    else {
        $('#ant').addClass('disabled');
        $('#ant').removeClass('btn btn-success');
        $('#ant').addClass('btn btn-danger');
    }
    if(money >= document.getElementById('beeCost').innerHTML){
        $('#bee').removeClass('disabled');
        $('#bee').removeClass('btn btn-danger');
        $('#bee').addClass('btn btn-success');
    }
    else {
        $('#bee').addClass('disabled');
        $('#bee').removeClass('btn btn-success');
        $('#bee').addClass('btn btn-danger');
    }
    if(money >= document.getElementById('batteryCost').innerHTML){
        $('#batt').removeClass('disabled');
        $('#batt').removeClass('btn btn-danger');
        $('#batt').addClass('btn btn-success');
    }
    else {
        $('#batt').addClass('disabled');
        $('#batt').removeClass('btn btn-success');
        $('#batt').addClass('btn btn-danger');
    }
    if(money >= document.getElementById('strengthCost').innerHTML){
        $('#str').removeClass('disabled');
        $('#str').removeClass('btn btn-danger');
        $('#str').addClass('btn btn-success');
    }
    else {
        $('#str').addClass('disabled');
        $('#str').removeClass('btn btn-success');
        $('#str').addClass('btn btn-danger');
    }
}, 1);