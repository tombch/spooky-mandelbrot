let pressed = false;
let zoom = 1;
let start = 0;
let series = 0;
let n = 1;
let xR = 5; let xL = -5; let yU = 3.5; let yD = -3.5;
let prevMouseX = 0;
let prevMouseY = 0;
const w = 1000;
const h = 700;
function setup() 
{
	createCanvas(w, h);
	colorMode(RGB);		
	background(255);
	strokeWeight(5);
	stroke(255, 0, 0);
	point(w/2, h/2);
	strokeWeight(1);
}
function mousePressed() 
{	
	pressed = true;
	return false;
}
function absolute(a, b)
{
	return (((a - b)**2)**(1/2));
}
function draw()
{		
	if (pressed === true)
	{						
		let xMouseCoord = absolute(xR, xL) * mouseX/w + xL;
		let yMouseCoord = yU - absolute(yU, yD) * mouseY/h;	
		if (keyIsDown(17))
		{
			console.log("zooming out");	
			series = series - start*(1/(2**(n-1)));	
			zoom = 1 - series;
			n--;
			xR = xMouseCoord + 0.002*w*zoom;
			xL = xMouseCoord - 0.002*w*zoom;
			yU = yMouseCoord + 0.002*h*zoom;
			yD = yMouseCoord - 0.002*h*zoom;
		}
		else
		{
			console.log("zooming in");
			series = series + start*(1/(2**n));		
			zoom = 1 - series;
			n++;
			xR = xMouseCoord + 0.002*w*zoom;
			xL = xMouseCoord - 0.002*w*zoom;
			yU = yMouseCoord + 0.002*h*zoom;
			yD = yMouseCoord - 0.002*h*zoom;			
		}
		if (start === 0)
		{				
			start = 1;
			n--;
		}			
		console.log("zoom:", (1/zoom));
		console.log("from:", xL, "to:", xR, "on x-axis");	
		console.log("x-axis length displayed: ", xR-xL);	
		console.log("from:", yU, "to:", yD, "on y-axis");	
		console.log("y-axis length displayed: ", yU-yD);	
		console.log(" ");		
		prevMouseX = xMouseCoord;
		prevMouseY = yMouseCoord;
		for (i = 0; i <= w; i++)
		{
			for (j = 0; j <= h; j++)
			{
				let iterationCount = 0;			
				let x = xL + ((absolute(xR, xL))*i)/w;
				let y = yU - ((absolute(yU, yD))*j)/h;
				let zn = [0, 0];
				let exceeded = false;		
				while (iterationCount <= 255)
				{
					zn = [zn[0]**2 - zn[1]**2 + x, 2*zn[0]*zn[1] + y];	
					let distance = (zn[0]**2 + zn[1]**2)**(1/2);
					if (distance > 2)
					{
						exceeded = true;					
						blackWhite(iterationCount / 8);						
						point(i,j);
						break;
					}
					iterationCount = iterationCount + 1;
				}			
				if (exceeded === false)
				{				
					stroke(0);
					point(i,j); 
				}				
				if (x === 0 && y === 0)
				{
					stroke(255)
					point(i,j)
				}
			}
		}
	}
	pressed = false;
}
function colourful(iterationCount)
{
	if (iterationCount <= 255)
		stroke(255 - iterationCount, iterationCount, 0);
	else if (iterationCount > 255 && iterationCount <= 510)
		stroke(0, 510 - iterationCount, iterationCount - 255);
	else if (iterationCount > 510 && iterationCount <= 765)
		stroke(0, iterationCount - 510, 765 - iterationCount);
	else
		stroke(iterationCount - 765, 1020 - iterationCount, 0);		
}
function blackWhite(iterationCount)
{
	stroke(255 - iterationCount);
}