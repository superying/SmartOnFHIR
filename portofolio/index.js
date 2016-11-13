// @Author : Jasmine R.song 
// @Date:Oct.16,2016
// @v1.0.0


 
var pathObj = {
    "people": {
        "strokepath": [
            {
                "path": "M 53.685682,125.92815 C 50.946132,124.54133 57.422853,121.63125 54.036058,121.84004 C 52.560505,122.05539 47.731155,121.89052 50.171528,119.62410 C 51.724670,118.23239 54.892400,118.29440 54.207602,115.31622 C 53.915864,111.82441 54.078515,108.25943 52.969849,104.88257 C 52.352532,102.59147 51.694474,100.29953 50.671467,98.159920 C 49.667879,94.678299 48.855659,91.145138 47.908665,87.650233 C 47.812152,85.882776 46.235211,85.994604 45.110000,85.549448 C 45.497828,83.371302 45.488021,81.113583 45.603592,78.886611 C 46.202949,76.099196 47.590061,73.514328 48.067268,70.678973 C 48.999661,68.340573 48.632813,65.952276 47.583073,63.727119 C 46.776637,61.992040 48.810044,59.821666 49.153712,57.931133 C 49.604516,56.806488 50.481420,55.799775 50.309685,54.518265 C 50.491101,50.787081 50.729072,47.045772 50.459127,43.318715 C 51.482614,41.062949 50.871720,38.470418 50.758261,36.083959 C 49.943215,33.951459 48.958721,31.670568 50.137401,29.395896 C 50.470010,28.291451 51.556732,27.443591 51.677492,26.307153 C 51.718803,24.211572 51.530488,22.063624 52.281494,20.064434 C 52.496532,17.826910 53.259351,15.413818 52.211988,13.285042 C 51.817239,10.956153 52.240572,8.1678773 53.965115,6.4202821 C 55.021181,4.5103198 56.380940,2.4240672 58.790794,2.2124844 C 61.106075,1.5619400 63.636197,2.6030930 64.920680,4.6176302 C 66.762875,7.0859265 67.438176,10.130279 67.974443,13.095510 C 68.910164,15.091747 68.224043,17.951661 70.176901,19.331884 C 71.096333,19.781051 69.620625,20.083391 71.250173,20.164559 C 73.680384,21.266592 71.757597,24.136444 72.892227,26.005111 C 73.753692,28.513941 75.724349,30.444324 76.574373,32.972422 C 77.661727,34.895308 77.816402,37.160121 76.405002,38.967479 C 74.206928,42.359471 72.215765,45.898589 69.625487,49.023879 C 68.430834,50.787731 67.128930,52.514941 67.211835,54.739536 C 66.133206,57.248100 65.378415,59.906631 64.084435,62.317286 C 62.681242,64.297761 61.290107,66.502290 61.440347,69.032472 C 61.285822,74.421499 61.147780,79.831912 61.516191,85.213928 C 61.985007,88.779745 62.660145,92.367223 62.134767,95.973001 C 61.930970,100.35082 61.613872,104.79279 62.276313,109.14348 C 62.749747,111.10361 65.429848,113.24284 63.703860,115.27315 C 62.204494,116.73706 62.871819,118.99147 62.821068,120.67445 C 61.631593,121.37804 61.453865,117.62723 61.721308,120.42285 C 62.740711,122.56302 61.549717,124.81511 59.347407,125.46436 C 57.555776,126.08806 55.559064,126.04849 53.685682,125.92815 z M 66.345727,47.189486 C 67.276948,45.119528 68.374186,43.123588 69.009025,40.926698 C 69.531420,38.817472 71.685579,36.611164 70.288778,34.440547 C 69.903794,33.799324 70.173103,35.384263 69.181526,35.141896 C 66.963741,35.849803 65.735209,37.553706 65.020030,39.820478 C 64.146347,41.815784 64.524322,43.800781 64.968564,45.874542 C 64.987049,46.930368 65.890494,49.705563 66.345728,47.189489 L 66.345727,47.189486 z ",
                "duration": 1800
            }
        ],
        "dimensions": {
            "width": 128,
            "height": 128
        }
    }
}; 

 
 $(document).ready(function(){ 
console.log('begin');

//glasses occurance
//add class'appear' to let them become visible and start animation
function addGlass(elem){
      elem.attr('class','appear');
}
addGlass($('#glass00'));
setTimeout(addGlass,120,$('#glass01'));
setTimeout(addGlass,240,$('#glass02'));
setTimeout(addGlass,360,$('#glass03'));
setTimeout(addGlass,480,$('#glass04'));
setTimeout(addGlass,600,$('#glass05'));
setTimeout(addGlass,720,$('#glass06'));
setTimeout(addGlass,840,$('#glass07'));
setTimeout(addGlass,960,$('#glass08'));
setTimeout(addGlass,1500,$('#glass09'));

setTimeout(function(){
    //console.log('stop');
    $('#melon').attr('class','stop');
},2600);

// pave road
setTimeout(function(){
  
        console.log('click btn3');
        var x = 0;
        var timer = setInterval(function(){
            if(x >= 10000){
                clearInterval(timer);
            }
            paveRoad1(x);
            setTimeout(paveRoad3,500,x);
            setTimeout(paveRoad2,1000,x);
            setTimeout(paveRoad4,1500,x);
            
            x = x + 492.768;

        },30);
        },3000);

//car moving 
setTimeout(function(){
    $('#car').attr('class','moving');
},5500);//car move 8s

//first row glass empty
setTimeout(function(){ $('#grape_juice').attr('class','disappear');},7000);
setTimeout(function(){$('#cherry_juice').attr('class','disappear');},7100);
setTimeout(function(){$('#banana_juice').attr('class','disappear');},7200);
setTimeout(function(){$('#orange_juice').attr('class','disappear');},7300);
setTimeout(function(){$('#pineapple_juice').attr('class','disappear');},7400);

//plane moving
setTimeout(function(){
    $('#plane').attr('class','moving');
},10000);

//second row glass empty
setTimeout(function(){ $('#watermelon_juice').attr('class','disappear');},13000);
setTimeout(function(){$('#lemon_juice').attr('class','disappear');},13100);
setTimeout(function(){$('#carrot_juice').attr('class','disappear');},13200);
setTimeout(function(){$('#kiwi_juice').attr('class','disappear');},13300);
setTimeout(function(){$('#strawberry_juice').attr('class','disappear');},13400);

//overlay fadein and paint div slide up
setTimeout(function(){$('#overlay').attr('class','active');},14500);
setTimeout(function(){$('#people').attr('class','active');},14500);
setTimeout(function(){$('#text').attr('class','active');},14500);


//paint line
function paintWoman(){
    $('#people').lazylinepainter( 
 {
    "svgData": pathObj,
    "strokeWidth": 2,
    "strokeColor": "#e09b99"
}).lazylinepainter('paint'); 


 //$("svg:last").css("background-color", "yellow");
 $('svg:last').attr('class','secondsvg');

// add <linearGradient>
var svg = document.getElementsByTagName('svg')[2]; //Get svg element
console.log(document.getElementsByTagName('svg').length); //there are 2 svgs
var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'linearGradient'); //Create  in SVG's namespace
newElement.setAttribute("id","grad"); 
newElement.setAttribute("x1","0%");
newElement.setAttribute("y1","100%");
newElement.setAttribute("x2","0%");
newElement.setAttribute("y2","100%");
svg.insertBefore(newElement,svg.firstChild);
var stop1 = document.createElementNS("http://www.w3.org/2000/svg","stop");
var stop2 = document.createElementNS("http://www.w3.org/2000/svg","stop");
stop1.setAttribute("offset","1%");
stop2.setAttribute("offset","1%");
stop1.setAttribute("class","color-transparent");
stop2.setAttribute("class","color-purple");
newElement.appendChild(stop1);
newElement.appendChild(stop2);

//add static woman 
var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
newElement2.setAttribute("id","mypath"); 
newElement2.setAttribute("class","cloud");
var womanpath = "M 53.685682,125.92815 C 50.946132,124.54133 57.422853,121.63125 54.036058,121.84004 C 52.560505,122.05539 47.731155,121.89052 50.171528,119.62410 C 51.724670,118.23239 54.892400,118.29440 54.207602,115.31622 C 53.915864,111.82441 54.078515,108.25943 52.969849,104.88257 C 52.352532,102.59147 51.694474,100.29953 50.671467,98.159920 C 49.667879,94.678299 48.855659,91.145138 47.908665,87.650233 C 47.812152,85.882776 46.235211,85.994604 45.110000,85.549448 C 45.497828,83.371302 45.488021,81.113583 45.603592,78.886611 C 46.202949,76.099196 47.590061,73.514328 48.067268,70.678973 C 48.999661,68.340573 48.632813,65.952276 47.583073,63.727119 C 46.776637,61.992040 48.810044,59.821666 49.153712,57.931133 C 49.604516,56.806488 50.481420,55.799775 50.309685,54.518265 C 50.491101,50.787081 50.729072,47.045772 50.459127,43.318715 C 51.482614,41.062949 50.871720,38.470418 50.758261,36.083959 C 49.943215,33.951459 48.958721,31.670568 50.137401,29.395896 C 50.470010,28.291451 51.556732,27.443591 51.677492,26.307153 C 51.718803,24.211572 51.530488,22.063624 52.281494,20.064434 C 52.496532,17.826910 53.259351,15.413818 52.211988,13.285042 C 51.817239,10.956153 52.240572,8.1678773 53.965115,6.4202821 C 55.021181,4.5103198 56.380940,2.4240672 58.790794,2.2124844 C 61.106075,1.5619400 63.636197,2.6030930 64.920680,4.6176302 C 66.762875,7.0859265 67.438176,10.130279 67.974443,13.095510 C 68.910164,15.091747 68.224043,17.951661 70.176901,19.331884 C 71.096333,19.781051 69.620625,20.083391 71.250173,20.164559 C 73.680384,21.266592 71.757597,24.136444 72.892227,26.005111 C 73.753692,28.513941 75.724349,30.444324 76.574373,32.972422 C 77.661727,34.895308 77.816402,37.160121 76.405002,38.967479 C 74.206928,42.359471 72.215765,45.898589 69.625487,49.023879 C 68.430834,50.787731 67.128930,52.514941 67.211835,54.739536 C 66.133206,57.248100 65.378415,59.906631 64.084435,62.317286 C 62.681242,64.297761 61.290107,66.502290 61.440347,69.032472 C 61.285822,74.421499 61.147780,79.831912 61.516191,85.213928 C 61.985007,88.779745 62.660145,92.367223 62.134767,95.973001 C 61.930970,100.35082 61.613872,104.79279 62.276313,109.14348 C 62.749747,111.10361 65.429848,113.24284 63.703860,115.27315 C 62.204494,116.73706 62.871819,118.99147 62.821068,120.67445 C 61.631593,121.37804 61.453865,117.62723 61.721308,120.42285 C 62.740711,122.56302 61.549717,124.81511 59.347407,125.46436 C 57.555776,126.08806 55.559064,126.04849 53.685682,125.92815 z M 66.345727,47.189486 C 67.276948,45.119528 68.374186,43.123588 69.009025,40.926698 C 69.531420,38.817472 71.685579,36.611164 70.288778,34.440547 C 69.903794,33.799324 70.173103,35.384263 69.181526,35.141896 C 66.963741,35.849803 65.735209,37.553706 65.020030,39.820478 C 64.146347,41.815784 64.524322,43.800781 64.968564,45.874542 C 64.987049,46.930368 65.890494,49.705563 66.345728,47.189489 L 66.345727,47.189486 z ";
newElement2.setAttribute("d",womanpath);

svg.appendChild(newElement2);

function setProgress (percentage) {
  document.getElementById('grad').setAttribute('y1', (100 - percentage) + '%');
}


//start fill woman
var x = 0;
setTimeout(function(){
    var timer = setInterval(function(){ 
                          setProgress(x);
                          if (x == 100) {
                              clearInterval(timer);
                          }
                          x++;
                          console.log(x);
                          },50);

 },1000);

}  //end of paint

setTimeout(paintWoman,15500);
 
//pave road
function paveRoad1(x){
    var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    var path =  document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute('d',"M260.025,12.072h-27.283V0h-75.16v492.768h75.16v-12.071h27.283v12.071h75.159V0h-75.159V12.072z M260.025,428.627    h-27.283v-52.069h27.283V428.627z M260.025,324.488h-27.283v-52.069h27.283V324.488z M260.025,220.35h-27.283v-52.07h27.283    V220.35z M260.025,116.211h-27.283v-52.07h27.283V116.211z");
    path.setAttribute('fill',"#71788f");
    var rect1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect1.setAttribute('x','107.092');
    rect1.setAttribute('width','31.478');
    rect1.setAttribute('fill','#71788f');
    rect1.setAttribute('height','492.768');

    var rect2 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect2.setAttribute('x','354.196');
    rect2.setAttribute('width','31.478');
    rect2.setAttribute('fill','#71788f');
    rect2.setAttribute('height','492.768');
    g.appendChild(path);
    g.appendChild(rect1);
    g.appendChild(rect2);
    g.setAttribute('transform','translate(1300,'+x+')');
    document.getElementById('road01').appendChild(g);
 }

 function paveRoad2(x){
    var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    var path =  document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute('d',"M260.025,12.072h-27.283V0h-75.16v492.768h75.16v-12.071h27.283v12.071h75.159V0h-75.159V12.072z M260.025,428.627    h-27.283v-52.069h27.283V428.627z M260.025,324.488h-27.283v-52.069h27.283V324.488z M260.025,220.35h-27.283v-52.07h27.283    V220.35z M260.025,116.211h-27.283v-52.07h27.283V116.211z");
    path.setAttribute('fill',"#71788f");
    var rect1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect1.setAttribute('x','107.092');
    rect1.setAttribute('width','31.478');
    rect1.setAttribute('fill','#71788f');
    rect1.setAttribute('height','492.768');

    var rect2 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect2.setAttribute('x','354.196');
    rect2.setAttribute('width','31.478');
    rect2.setAttribute('fill','#71788f');
    rect2.setAttribute('height','492.768');
    g.appendChild(path);
    g.appendChild(rect1);
    g.appendChild(rect2);
    g.setAttribute('transform','translate(5300,'+x+')');
    document.getElementById('road02').appendChild(g);
 }


function paveRoad3(y){
    var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    var path =  document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute('d',"M260.025,12.072h-27.283V0h-75.16v492.768h75.16v-12.071h27.283v12.071h75.159V0h-75.159V12.072z M260.025,428.627    h-27.283v-52.069h27.283V428.627z M260.025,324.488h-27.283v-52.069h27.283V324.488z M260.025,220.35h-27.283v-52.07h27.283    V220.35z M260.025,116.211h-27.283v-52.07h27.283V116.211z");
    path.setAttribute('fill',"#71788f");
    var rect1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect1.setAttribute('x','107.092');
    rect1.setAttribute('width','31.478');
    rect1.setAttribute('fill','#71788f');
    rect1.setAttribute('height','492.768');

    var rect2 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect2.setAttribute('x','354.196');
    rect2.setAttribute('width','31.478');
    rect2.setAttribute('fill','#71788f');
    rect2.setAttribute('height','492.768');
    g.appendChild(path);
    g.appendChild(rect1);
    g.appendChild(rect2);
    g.setAttribute('transform','translate('+y+',500) rotate(90)');
    document.getElementById('road03').appendChild(g);
 }

function paveRoad4(y){
    var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    var path =  document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute('d',"M260.025,12.072h-27.283V0h-75.16v492.768h75.16v-12.071h27.283v12.071h75.159V0h-75.159V12.072z M260.025,428.627    h-27.283v-52.069h27.283V428.627z M260.025,324.488h-27.283v-52.069h27.283V324.488z M260.025,220.35h-27.283v-52.07h27.283    V220.35z M260.025,116.211h-27.283v-52.07h27.283V116.211z");
    path.setAttribute('fill',"#71788f");
    var rect1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect1.setAttribute('x','107.092');
    rect1.setAttribute('width','31.478');
    rect1.setAttribute('fill','#71788f');
    rect1.setAttribute('height','492.768');

    var rect2 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect2.setAttribute('x','354.196');
    rect2.setAttribute('width','31.478');
    rect2.setAttribute('fill','#71788f');
    rect2.setAttribute('height','492.768');
    g.appendChild(path);
    g.appendChild(rect1);
    g.appendChild(rect2);
    g.setAttribute('transform','translate('+y+',2600) rotate(90)');
    document.getElementById('road04').appendChild(g);
 }









});








