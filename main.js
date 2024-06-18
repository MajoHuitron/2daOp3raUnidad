document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
  
    // Configuración de los objetos
    const objects = [];
    const numObjects = 10;
  
    // Crear objetos 2D aleatorios
    for (let i = 0; i < numObjects; i++) {
      let size = Math.random() * 20 + 10; // tamaño aleatorio entre 10 y 30
      let x = canvas.width / 2; // comenzar desde el centro del canvas
      let y = canvas.height / 2;
      let dx = (Math.random() - 0.5) * 4; // velocidad en dirección X
      let dy = (Math.random() - 0.5) * 4; // velocidad en dirección Y
      objects.push({ x, y, size, dx, dy });
    }
  
    function drawObjects() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      objects.forEach(obj => {
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
        ctx.fillStyle = "#007bff";
        ctx.fill();
        ctx.closePath();
      });
    }
  
    function updateObjects() {
      objects.forEach(obj => {
        obj.x += obj.dx;
        obj.y += obj.dy;
  
        // Rebote en los bordes
        if (obj.x + obj.size > canvas.width || obj.x - obj.size < 0) {
          obj.dx = -obj.dx;
        }
        if (obj.y + obj.size > canvas.height || obj.y - obj.size < 0) {
          obj.dy = -obj.dy;
        }
      });
  
      // Detectar colisiones entre objetos
      for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
          if (checkCollision(objects[i], objects[j])) {
            // Intercambiar velocidades para simular rebote entre objetos
            let tempDx = objects[i].dx;
            let tempDy = objects[i].dy;
            objects[i].dx = objects[j].dx;
            objects[i].dy = objects[j].dy;
            objects[j].dx = tempDx;
            objects[j].dy = tempDy;
          }
        }
      }
    }
  
    function checkCollision(obj1, obj2) {
      const dx = obj1.x - obj2.x;
      const dy = obj1.y - obj2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < obj1.size + obj2.size;
    }
  
    function animate() {
      updateObjects();
      drawObjects();
      requestAnimationFrame(animate);
    }
  
    animate();
  });
  