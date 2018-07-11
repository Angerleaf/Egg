var savegame;

var energy = {
    name:'energy',
    total:0,
    clickadd:1,
},
money = {
    name:'money',
    total:0,
},
ants = {
	name:'ants',
    total:0,
    cost:10,
},
bees = {
    name:'bees',
    total:0,
    cost:10,
},
battery = {
    name:'battery',
    level:1,
    capacity:100,
    cost:10,
},
strength = {
    name:'strength',
    level:0,
    cost:10,
}
var spd = 1000;

function saveG() {
    var save = {
        energy: energy,
        money: money,
        ants: ants,
        bees: bees,
        battery: battery,
        strength: strength,
    }
    localStorage.setItem("save",JSON.stringify(save));
}

function loadG() {
    savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.energy !== "undefined") energy = savegame.energy;
    if (typeof savegame.money !== "undefined") money = savegame.money;
    if (typeof savegame.ants !== "undefined") ants = savegame.ants;
    if (typeof savegame.bees !== "undefined") bees = savegame.bees;
    if (typeof savegame.battery !== "undefined") battery = savegame.battery;
    if (typeof savegame.strength !== "undefined") strength = savegame.strength;
}

function resetG() {
    localStorage.removeItem("save")
    energy = {
        name:'energy',
        total:0,
        clickadd:1,
    },
    money = {
        name:'money',
        total:0,
    },
    ants = {
        name:'ants',
        total:0,
        cost:10,
    },
    bees = {
        name:'bees',
        total:0,
        cost:10,
    },
    battery = {
        name:'battery',
        level:1,
        capacity:100,
        cost:10,
    },
    strength = {
        name:'strength',
        level:0,
        cost:10,
    }    
}

function energyAdd(number){
    if(energy.total < battery.capacity){
        energy.total = energy.total + number;
    }   
}

function energySell(){
    money.total += energy.total;
    energy.total = 0; 
}


function buyStrength() {
    strength.cost = Math.floor(10 * Math.pow(1.1,strength.level));
    if(money.total >= strength.cost){
        strength.level = strength.level + 1;
        energy.clickadd = strength.level + 1;
        money.total = money.total - strength.cost;
    }
}
function buyAnt(){
    ants.cost = Math.floor(10 * Math.pow(1.1,ants.total));
    if(money.total >= ants.cost){
        ants.total = ants.total + 1;
    	money.total = money.total - ants.cost;
    }
}
function buyBee(){
    bees.cost = Math.floor(10 * Math.pow(1.1,bees.total));
    if(money.total >= bees.cost){
        bees.total = bees.total + 1;
    	money.total = money.total - bees.cost; 
    }
}

function buyBattery(){
    battery.cost = Math.floor(10 * Math.pow(1.1,battery.level));
    if(money.total >= battery.cost){
        battery.level += 1;
    	money.total = money.total - battery.cost;
    }    
}
function speed(number){
    spd = number;
    window.clearInterval(id);
    id = setInterval(update, spd);
}

var id = setInterval(update, spd);

function update(){

    if(energy.total < battery.capacity) {
        energyAdd(ants.total);
        energyAdd(bees.total);
    }
}

var interval = setInterval(function() {

    document.getElementById("battery.capacity").innerHTML = battery.capacity;
    document.getElementById('energy.total').innerHTML = energy.total; 
    document.getElementById('money.total').innerHTML = money.total;
    document.getElementById('ants.total').innerHTML = ants.total;
    document.getElementById('ants.cost').innerHTML = Math.floor(10 * Math.pow(1.1,ants.total));
    document.getElementById('bees.total').innerHTML = bees.total;
    document.getElementById('bees.cost').innerHTML = Math.floor(10 * Math.pow(1.1,bees.total));
    document.getElementById('battery.level').innerHTML = battery.level;
    document.getElementById('battery.capacity').innerHTML = battery.capacity;
    document.getElementById('battery.cost').innerHTML = Math.floor(10 * Math.pow(1.1,battery.level));
    document.getElementById('strength.cost').innerHTML = Math.floor(10 * Math.pow(1.1,strength.level));
    document.getElementById("energy.clickadd").innerHTML = energy.clickadd;
    document.getElementById('strength.level').innerHTML = strength.level; 


    var current_progress = Math.round(energy.total/battery.capacity*100);
    $("#dynamic")
    .css("width", current_progress + "%")
    .attr("aria-valuenow", current_progress)
    .text("Battery " + current_progress + "%");
    if(current_progress >= 50) {
        $('#dynamic').removeClass("progress-bar progress-bar-striped progress-bar-animated");
        $('#dynamic').addClass("progress-bar bg-warning progress-bar-striped progress-bar-animated");  
    }
    else {
        $('#dynamic').removeClass("progress-bar bg-warning progress-bar-striped progress-bar-animated");
        $('#dynamic').removeClass("progress-bar bg-danger progress-bar-striped progress-bar-animated");
        $('#dynamic').addClass("progress-bar progress-bar-striped progress-bar-animated");
    }
    if(current_progress >= 90) {
        $('#dynamic').removeClass("progress-bar bg-warning progress-bar-striped progress-bar-animated");
        $('#dynamic').removeClass("progress-bar progress-bar-striped progress-bar-animated");
        $('#dynamic').addClass("progress-bar bg-danger progress-bar-striped progress-bar-animated");
    }
    else {
        $('#dynamic').removeClass("progress-bar bg-danger progress-bar-striped progress-bar-animated");
        $('#dynamic').addClass("progress-bar progress-bar-striped progress-bar-animated");
    }
    

    battery.capacity = battery.level * 100;

    if(energy.total > battery.capacity){
        energy.total = battery.capacity;
    }
    
    if(money.total >= document.getElementById('ants.cost').innerHTML){
        $('#ant').removeClass('disabled');
        $('#ant').removeClass('btn btn-danger');
        $('#ant').addClass('btn btn-success');
    }
    else {
        $('#ant').addClass('disabled');
        $('#ant').removeClass('btn btn-success');
        $('#ant').addClass('btn btn-danger');
    }
    if(money.total >= document.getElementById('bees.cost').innerHTML){
        $('#bee').removeClass('disabled');
        $('#bee').removeClass('btn btn-danger');
        $('#bee').addClass('btn btn-success');
    }
    else {
        $('#bee').addClass('disabled');
        $('#bee').removeClass('btn btn-success');
        $('#bee').addClass('btn btn-danger');
    }
    if(money.total >= document.getElementById('battery.cost').innerHTML){
        $('#batt').removeClass('disabled');
        $('#batt').removeClass('btn btn-danger');
        $('#batt').addClass('btn btn-success');
    }
    else {
        $('#batt').addClass('disabled');
        $('#batt').removeClass('btn btn-success');
        $('#batt').addClass('btn btn-danger');
    }
    if(money.total >= document.getElementById('strength.cost').innerHTML){
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