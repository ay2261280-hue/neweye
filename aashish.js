<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blacklisted Website</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:radial-gradient(circle at top,#242424,#080808 60%,#000);color:#fff;min-height:100vh}
.website{width:94%;max-width:1200px;margin:20px auto;padding:18px;border:2px solid #777;border-radius:24px;box-shadow:0 0 35px #000}
header{text-align:center;padding:35px 15px;border:1px solid #555;border-radius:20px;background:#111}
h1{font-size:clamp(28px,6vw,60px);letter-spacing:3px}
header p{color:#aaa;margin-top:10px}
nav{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:18px 0}
nav a{color:#fff;text-decoration:none;border:1px solid #555;padding:11px 18px;border-radius:25px}
section{margin:20px 0;padding:22px;border:1px solid #444;border-radius:20px;background:#111}
h2{margin-bottom:8px}.sub{color:#999;margin-bottom:18px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:15px}
.card{padding:20px;border:1px solid #444;border-radius:16px;background:#181818}
.icon{font-size:40px;margin-bottom:10px}
input{width:100%;padding:14px;border-radius:25px;border:1px solid #555;background:#050505;color:white;outline:none}
button{padding:12px 18px;border:0;border-radius:25px;background:#fff;color:#000;font-weight:bold;cursor:pointer;margin-top:10px}
button:hover{transform:scale(1.04)}
.row{display:flex;gap:10px;align-items:center}.row input{flex:1}
.result{margin-top:15px;padding:15px;border:1px solid #333;border-radius:14px;color:#ccc;min-height:55px}
canvas{display:block;width:100%;max-width:700px;height:330px;background:#050505;border:1px solid #444;border-radius:15px;margin:15px auto}
#gameStatus{text-align:center;color:#aaa}
footer{text-align:center;padding:20px;color:#777}
@media(max-width:600px){.row{flex-direction:column}.row button{width:100%}}
</style>
</head>
<body>
<div class="website">
<header id="home">
<h1>WELCOME TO BLACKLISTED WEBSITE</h1>
<p>Music • Gaming • Search • Personal Dashboard</p>
</header>

<nav>
<a href="#home">Home</a><a href="#music">🎵 Music</a><a href="#gaming">🎮 Gaming</a><a href="#search">🔎 Search</a>
</nav>

<section>
<h2>⚡ Dashboard</h2><p class="sub">Everything is inside this one working page.</p>
<div class="cards">
<div class="card"><div class="icon">🎵</div><h3>Music</h3><p>Search songs on YouTube.</p></div>
<div class="card"><div class="icon">🎮</div><h3>Gaming</h3><p>Play the built-in mini game.</p></div>
<div class="card"><div class="icon">🔎</div><h3>Search</h3><p>Search the web directly.</p></div>
</div>
</section>

<section id="music">
<h2>🎵 MUSIC ZONE</h2><p class="sub">Type a song and open the YouTube results.</p>
<div class="row">
<input id="musicInput" placeholder="Enter song name...">
<button id="musicBtn">SEARCH MUSIC</button>
</div>
<div id="musicResult" class="result">No search yet.</div>
</section>

<section id="gaming">
<h2>🎮 GAMING ZONE</h2>
<p class="sub">Catch the moving target! Click it as many times as you can in 20 seconds.</p>
<canvas id="game" width="700" height="330"></canvas>
<div id="gameStatus">Press START GAME.</div>
<div style="text-align:center"><button id="startGame">START GAME</button></div>
</section>

<section id="search">
<h2>🔎 SEARCH ZONE</h2><p class="sub">Search anything on Google.</p>
<div class="row">
<input id="searchInput" placeholder="Type your search...">
<button id="searchBtn">SEARCH</button>
</div>
<div id="searchResult" class="result">No search yet.</div>
</section>

<footer>© 2026 Blacklisted Website</footer>
</div>

<script>
const openUrl=(url)=>window.open(url,"_blank","noopener,noreferrer");

document.getElementById("musicBtn").onclick=()=>{
 const q=document.getElementById("musicInput").value.trim();
 const out=document.getElementById("musicResult");
 if(!q){out.textContent="Please enter a song name.";return}
 const url="https://www.youtube.com/results?search_query="+encodeURIComponent(q);
 out.innerHTML="Searching for <b>"+q.replace(/</g,"&lt;")+"</b>...";
 openUrl(url);
};

document.getElementById("searchBtn").onclick=()=>{
 const q=document.getElementById("searchInput").value.trim();
 const out=document.getElementById("searchResult");
 if(!q){out.textContent="Please enter something to search.";return}
 const url="https://www.google.com/search?q="+encodeURIComponent(q);
 out.innerHTML="Opening Google for <b>"+q.replace(/</g,"&lt;")+"</b>...";
 openUrl(url);
};

document.getElementById("musicInput").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("musicBtn").click()});
document.getElementById("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("searchBtn").click()});

const canvas=document.getElementById("game"),ctx=canvas.getContext("2d");
let playing=false,score=0,timeLeft=20,x=100,y=100,r=28,timer,moveTimer;

function draw(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle="#111";ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
 ctx.fillStyle="#000";ctx.beginPath();ctx.arc(x-9,y-6,4,0,Math.PI*2);ctx.fill();
 ctx.beginPath();ctx.arc(x+9,y-6,4,0,Math.PI*2);ctx.fill();
 ctx.beginPath();ctx.arc(x,y+6,10,0,Math.PI);ctx.stroke();
}
function moveTarget(){
 x=r+Math.random()*(canvas.width-r*2);
 y=r+Math.random()*(canvas.height-r*2);
 draw();
}
canvas.onclick=e=>{
 if(!playing)return;
 const rect=canvas.getBoundingClientRect();
 const mx=(e.clientX-rect.left)*canvas.width/rect.width;
 const my=(e.clientY-rect.top)*canvas.height/rect.height;
 if(Math.hypot(mx-x,my-y)<=r){score++;moveTarget()}
};
document.getElementById("startGame").onclick=()=>{
 clearInterval(timer);clearInterval(moveTimer);
 playing=true;score=0;timeLeft=20;moveTarget();
 document.getElementById("gameStatus").textContent="Score: 0 | Time: 20s";
 moveTimer=setInterval(moveTarget,700);
 timer=setInterval(()=>{
  timeLeft--;
  document.getElementById("gameStatus").textContent=`Score: ${score} | Time: ${timeLeft}s`;
  if(timeLeft<=0){
   clearInterval(timer);clearInterval(moveTimer);playing=false;
   document.getElementById("gameStatus").textContent=`Game Over! Final score: ${score}`;
  }
 },1000);
};
draw();
</script>
</body>
</html>
