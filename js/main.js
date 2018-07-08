var eggs = 0;

function workClick(number){
    eggs = eggs + number;
    document.getElementById("eggs").innerHTML = eggs;
	calculateTickAmount();
};

var money = 0;
var sellingPrice = .5;

function sellGoggles(){
	eggsAvail = Math.floor(eggs);
	money = money + eggsAvail*sellingPrice;
	eggs = eggs - eggsAvail;
	document.getElementById('money').innerHTML = money.toFixed(2);
	document.getElementById('eggs').innerHTML = eggs;
	document.getElementById('sellingPrice').innerHTML = sellingPrice.toFixed(2);
	calculateTickAmount();
};


var friends = 0;
var friendMultiplier = 1;

function buyFriend(number){
    var friendCost = Math.floor(10 * Math.pow(1.1,friends*number));     //works out the cost of this friend for number ==10
    if(money >= friendCost){                                   //checks that the player can afford the friend
        friends = friends + number;                                   //increases number of friends
    	money = money - friendCost;                          //removes the eggs spent
        document.getElementById('friends').innerHTML = friends; 
        document.getElementById('money').innerHTML = money.toFixed(2);  //updates the number of eggs for the user
    };
    var nextFriend = Math.floor(10 * Math.pow(1.1,friends));       //works out the cost of the next friend
    document.getElementById('friendCost1').innerHTML = nextFriend;  //updates the cursor cost for the user
	calculateTickAmount();
};

var students = 0;
var studentMultiplier = 1;

function buyStudent(number){
    var studentCost = Math.floor(10 * Math.pow(1.2,students*number))+10;   
    if(money >= studentCost){                                  
        students = students + number;                                
    	money = money - studentCost;                        
        document.getElementById('students').innerHTML = students; 
        document.getElementById('money').innerHTML = money.toFixed(2);  
    };
    var nextStudent = Math.floor(10 * Math.pow(1.2,students*number))+10;       //works out the cost of the next friend
    document.getElementById('studentCost').innerHTML = nextStudent;  //updates the cursor cost for the user
	calculateTickAmount();
	//console.log(studentCost);
};

var factoryWorker = 0;
var factoryMultiplier = 1;

function buyFactoryWorker(number){
    var factoryWorkerCost = Math.floor(10 * Math.pow(1.3,factoryWorker*number))+100;   
    if(money >= factoryWorkerCost){                                  
        factoryWorker = factoryWorker + number;                                
    	money = money - factoryWorkerCost;                        
        document.getElementById('money').innerHTML = money.toFixed(2); 
        document.getElementById('factoryWorker').innerHTML = factoryWorker; 
    };
    var nextFactoryWorker = Math.floor(10 * Math.pow(1.8,factoryWorker))+100;       //works out the cost of the next friend
    document.getElementById('factoryWorkerCost').innerHTML = nextFactoryWorker;  //updates the cursor cost for the user
	var nextFactoryWorker10 = Math.floor(10 * Math.pow(1.8,factoryWorker*10))+100;       //works out the cost of the next friend
    document.getElementById('factoryWorkerCost10').innerHTML = nextFactoryWorker10;  //updates the cursor cost for the user
	calculateTickAmount();
	//console.log(factoryWorkerCost);
};

var enemy = 0;
var enemyMultiplier = 1;

function buyEnemy(number){
    var enemyCost = 10 * Math.pow(2,enemy);   
    if(friends >= enemyCost){                                  
        enemy = enemy + number;                                
    	friends = friends - enemyCost;
		sellingPrice = sellingPrice - .1;
        document.getElementById('enemy').innerHTML = enemy; 
        document.getElementById('friends').innerHTML = friends; 
		document.getElementById('sellingPrice').innerHTML = sellingPrice.toFixed(2); 
    };
    var nextEnemy = Math.floor(10 * Math.pow(2,enemy));       //works out the cost of the next friend
    document.getElementById('enemyCost').innerHTML = nextEnemy;  //updates the cursor cost for the user
	calculateTickAmount();
	//console.log(factoryWorkerCost);
};

var classNum = 0;
function buyClass(number){
    var classCost = 10 * Math.pow(2,classNum)+1000;   
    if(money >= classCost){                                  
        classNum = classNum + number;                                
    	money = money - classCost;
        document.getElementById('classNum').innerHTML = classNum; 
        document.getElementById('money').innerHTML = money.toFixed(2);  
    };
    var nextClass = 10 * Math.pow(2,classNum) + 1000;
    document.getElementById('classCost').innerHTML = nextClass.toFixed(2);
	document.getElementById('studentCost').innerHTML = nextStudent.toFixed(2);
	calculateTickAmount();
	//console.log(factoryWorkerCost);
};

/* var studentWeight = 1;

function buyStudentWeight(){
    var studentWeightCost = Math.floor(10 * Math.pow(1.5,studentWeight))+10;   
    if(eggs >= studentWeightCost){                                  
        studentWeight = studentWeight + 1;                                
    	eggs = eggs - studentWeightCost;                        
        document.getElementById('studentWeight').innerHTML = studentWeight; 
        document.getElementById('eggs').innerHTML = eggs;  
    };
    var nextStudentWC = Math.floor(1 * Math.pow(1.001,studentWeight)+25);       //works out the cost of the next friend
    document.getElementById('studentWeightCost').innerHTML = nextStudentWC;  //updates the cursor cost for the user
}; */

var contract = 0;
function getContract(number){
	var contractCost = 100 * Math.pow(2, contract);
	if(eggs >= contractCost){
		contract = contract + number;
		eggs = eggs - contractCost;
		sellingPrice = sellingPrice + .2;
		document.getElementById('eggs').innerHTML = eggs;
		document.getElementById('sellingPrice').innerHTML = sellingPrice.toFixed(2);
		document.getElementById('contract').innerHTML = contract;
	};
	var contractCost = 100 * Math.pow(2, contract);
	document.getElementById('contractCost').innerHTML = contractCost;
};

var clickAmount = 0;

function calculateTickAmount(){ 
	
	// Calculates Tick Clicks
	var friendClickAmount = friendMultiplier * friends * .5;
	var studentClickAmount = studentMultiplier * students * 1;
	var factoryClickAmount = factoryMultiplier * factoryWorker * 2;
	var enemyClickAmount = enemyMultiplier * enemy * 5;
	var clickAmount = Math.floor(friendClickAmount + studentClickAmount + factoryClickAmount + enemyClickAmount);
	document.getElementById('currentClickAmount').innerHTML = clickAmount;
	return(clickAmount);
};
var tickTally = 0;
window.setInterval(function(){
	var clickAmount = calculateTickAmount();
	workClick(clickAmount);
	if(classNum >= 1){
	tickTally = tickTally + 1;
	};
	if(tickTally ==10){
		tickTally = 0;
		student = student+classNum*number*.1;
		document.getElementById('students').innerHTML = students;
	};
	//console.log(clickAmount);  //Some great logging action.
}, 1000);