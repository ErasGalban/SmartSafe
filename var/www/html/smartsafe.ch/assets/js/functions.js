var Display = "";
var Code = "";
var Index;
var e = 7;
var n = 633323;
var d = 90247;
var sentCode
var temparr = []
var door_state = ""


function LoadStatus(){
    door_state=document.getElementById("IsOpenOrClosed").value;
    if(door_state == "Open"){
        document.getElementById("IsOpenOrClosed").setAttribute("style", "color: green;")
    }else if (door_state == "Locked"){
        document.getElementById("IsOpenOrClosed").setAttribute("style", "color: red;")
    }
}
function splitPairs(arr){
    var pairs = []
    for (var i=0; i<arr.length ; i +=2){
        if(arr[i+1]!== undefined){
            pairs.push([arr[i] + arr[i+1]]);
        }
        else {
            pairs.push([arr[i]]);
        }
    }
    return pairs;
};

document.onkeydown = function(e){
    var key_press = e.key;
    if(key_press == "Enter") {
        Submit()
        document.getElementById("IsOpenOrClosed").value = door_state;
    }
    if(key_press == "Delete" || key_press == "Backspace"){
        Reset()
        document.getElementById("IsOpenOrClosed").value = door_state;
    }
    if(key_press >= 0 && key_press <= 9){
	Code = Code.concat(key_press)
        Display = Display.concat("*")
        document.getElementById("OutputPIN").value = Display;
        document.getElementById("IsOpenOrClosed").value = door_state;
    }
    if(key_press == "Escape"){
	locking()
    }
}

function ButtonPress() {
    var ButtonValues = document.getElementsByName("buttons")[Index].value;
    Code = Code.concat(ButtonValues);
    Display = Display.concat("*");
    document.getElementById("OutputPIN").value = Display;
    document.getElementById("IsOpenOrClosed").value = door_state;
}

function encrypt(number, index ,array){
    var temp = parseInt(number)
    var enc = Math.pow(temp, e) % n;
    console.log(temp, enc);
    temparr.push(enc);
}

function ArrayList(item, index) {
}

function Reset() {
    Display = "";
    Code = "";
    document.getElementById("OutputPIN").value = Display;

}
function locking(){
    const ws = new WebSocket('ws://192.168.1.49:8282')
    
    ws.addEventListener("open", () => {
        console.log("We are Connected!");

        ws.send("Lock");
    })

    ws.addEventListener("message", ({data}) =>{
        var answer = data
        if(answer == "Locking the door"){
            door_state = "Locked";
            document.getElementById("IsOpenOrClosed").value = door_state;
            document.getElementById("IsOpenOrClosed").setAttribute("style", "color: red;")
            ws.close();
        }
    })
}


function Submit() {
    var CodeAray = Array.from(Code);
    var CodePairs = Array.from(splitPairs(CodeAray));
    CodePairs.forEach(ArrayList)
    CodePairs.forEach(encrypt)
    CodePairs = temparr
    temparr = []
    CodePairs.forEach(ArrayList)
    console.log(`encrypted transmitted`)
    Display = "";
    Code = "";
    document.getElementById("OutputPIN").value = Display;
    const ws = new WebSocket("ws://192.168.1.49:8282");

        ws.addEventListener("open", () => {
            console.log("We are Connected!");

            ws.send(CodePairs);
        })
        ws.addEventListener("message", ({data})=>{
            var answer2 = data;
            if(answer2 == "Unlocking!"){
                door_state = "Open";
                document.getElementById("IsOpenOrClosed").value = door_state
                document.getElementById("IsOpenOrClosed").setAttribute("style", "color: green;")
                ws.close();
            }
            
        })
}
