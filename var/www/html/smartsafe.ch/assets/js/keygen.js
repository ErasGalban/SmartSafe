var min = 100
var max = 1000

function isPrime(num) {
  for (var i = 2; i < num; i++)
    if (num % i === 0)
      return false;
  return num > 1;
}

function isEven(num) {
  if (num % 2 == 0) {
    return true;
  }
}

function gcd(num1, num2) {
	if ( ! num2) {
		return num1;
	}
	return gcd(num2, num1 % num2)
}

while(Number.isInteger(d)==false){
	var p1
	do {
  		p1 = Math.floor(Math.random() * (max - min) + min)
	} while (!isPrime(p1))
	var p2
	do {
  		p2 = Math.floor(Math.random() * (max - min) + min)
	} while (p2 != p1 && !isPrime(p2))
	var n = p1 * p2
	var phi_n = (p1 - 1) * (p2 - 1)
	var e
	do {
		e = Math.floor(Math.random() * (20 - 2) + 2);
	} while (isEven(e) && e > 1)
	var d = (phi_n + 1)/e
  
}
console.log(`p1=${p1} p2=${p2} n=${n} phi_n=${phi_n} e=${e} d=${d} gcd=${gcd(phi_n, e)}`)