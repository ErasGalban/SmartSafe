var key = "52,90,22,17,40"
var compare
var d = 90247
var n = 633323
var bigInt = require("big-integer")
var temparr = new Array()

function ArrayList(item, index){
	console.log(`${index} : ${item}`)
}

function decrypt(number, index, array){
	var temp = parseInt(number)
	var dec = bigInt(temp).modPow(d, n)
	temparr.push(dec)
}

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port:8282 });

wss.on("connection", ws => {
	console.log("New client Connected!");

	ws.on("message", data =>{
		console.log(`Client has sent us: ${data}`);
		var recTemp = data
		var received = recTemp.toString();
		if(received == "Lock"){
                        console.log('Locking')
                        compare = ""
                        recArr = []
                        received = ""
                        temparr = []
                        const { spawn } = require('child_process')
                        const door = spawn('lock')
			ws.send("Locking the door")
                }else{
			var recArr = received.split(",")
			recArr.forEach(ArrayList);
			recArr.forEach(decrypt)
			recArr = temparr
			console.log(recArr)
			compare = recArr.toString()
			console.log(compare)
			if(compare == key){
				console.log('correct Pin')
				compare = ""
				recArr = []
				received = ""
				temparr = []
				const { spawn } = require('child_process')
				const door = spawn('unlock')
				ws.send("Unlocking!")
			}else{
				console.log('incorrect Pin')
				compare = ""
				recArr = []
				received = ""
				temparr = []
			}
		}
	})


	ws.on("close", () => {
		console.log("Client has disconnected!");
	})
})
