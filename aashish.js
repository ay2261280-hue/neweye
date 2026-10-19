<!DOCTYPE html>
<html>
<head>
  <title>Catch the Box Game</title>
  <style>
    body {
      margin: 0;
      text-align: center;
      font-family: Arial, sans-serif;
      background: #eaf6ff;
    }

    h1 {
      color: #333;
    }

    #score, #timer {
      font-size: 22px;
      margin: 10px;
    }

    #gameArea {
      width: 90%;
      height: 450px;
      margin: 20px auto;
      background: white;
      border: 4px solid #333;
      position: relative;
      overflow: hidden;
    }

    #box {
      width: 50px;
      height: 50px;
      background: #ff4d6d;
      position: absolute;
      cursor: pointer;
      border-radius: 10px;
    }

    button {
      padding: 12px 25px;
      font-size: 18px;
      border: none;
      border-radius: 8px;
      background: #4caf50;
      color: white;
      cursor: pointer;
    }

    button:hover {
      background: #388e3c;
    }
  </style>
</head>

<body>

  <h1>🎮 Catch the Box!</h1>

  <div id="score">Score: 0</div>
  <div id="timer">Time: 30</div>

  <button onclick="startGame()">Start Game</button>

  <div id="gameArea">
    <div id="box" onclick="catchBox()"></div>
  </div>

  <script>
    let score = 0;
    let time = 30;
    let gameRunning = false;
    let timer;

    const box = document.getElementById("box");
    const gameArea = document.getElementById("gameArea");

    function moveBox() {
      const maxX = gameArea.clientWidth - box.clientWidth;
      const maxY = gameArea.clientHeight - box.clientHeight;

      const x = Math.random() * maxX;
      const y = Math.random() * maxY;

      box.style.left = x + "px";
      box.style.top = y + "px";
    }

    function catchBox() {
      if (!gameRunning) return;

      score++;
      document.getElementById("score").innerText =
        "Score: " + score;

      moveBox();
    }

    function startGame() {
      score = 0;
      time = 30;
      gameRunning = true;

      document.getElementById("score").innerText = "Score: 0";
      document.getElementById("timer").innerText = "Time: 30";

      moveBox();

      clearInterval(timer);

      timer = setInterval(function() {
        time--;

        document.getElementById("timer").innerText =
          "Time: " + time;

        if (time <= 0) {
          clearInterval(timer);
          gameRunning = false;

          alert("🎉 Game Over! Your score is " + score);
        }
      }, 1000);
    }
  </script>

</body>
</html>
