let graph = {}
let edges = []

function addEdge(){

let from = document.getElementById("from").value
let to = document.getElementById("to").value
let capacity = parseInt(document.getElementById("capacity").value)
let cost = parseFloat(document.getElementById("cost").value)

if(!graph[from]){
graph[from] = []
}

graph[from].push({
to:to,
capacity:capacity,
base_cost:cost
})

edges.push(from + " → " + to)

let list = document.getElementById("edgeList")

let item = document.createElement("li")

item.innerText = from + " → " + to + " | capacity " + capacity

list.appendChild(item)

}

function runSimulation(){

fetch("/calculate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

graph:graph,
source:"S",
sink:"T",
demand:240

})

})

.then(res=>res.json())

.then(data=>{

document.getElementById("result").innerHTML =
"<h3>Total Cost: "+data.total_cost+"</h3>"

let hours = []
let values = []

data.schedule.forEach((h,i)=>{

hours.push(i)

let sum = 0

for(let key in h){
sum += h[key]
}

values.push(sum)

})

drawChart(hours,values)

})

}

function drawChart(hours,values){

new Chart(document.getElementById("flowChart"),{

type:"line",

data:{
labels:hours,

datasets:[{
label:"Hourly Water Flow",
data:values,
borderWidth:3
}]
}

})

}