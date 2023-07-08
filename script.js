let b = document.querySelector("body");
let buttonsPressed = {};
let step = 20;
let shot_speed = 30;
const margin_max = 540;
b.addEventListener("keydown", (e) => {
  buttonsPressed[e.keyCode] = true;
});
b.addEventListener("keyup", (e) => {
  buttonsPressed[e.keyCode] = false;
});
setInterval(() => {
  if (buttonsPressed[68]) {
    att_shot();
  }
  if (buttonsPressed[37]) {
    def_shot();
  }
}, 120);
setInterval(() => {
  if (buttonsPressed[38]) {
    def_up();
  }
  if (buttonsPressed[90]) {
    att_up();
  }
  if (buttonsPressed[83]) {
    att_down();
  }
  if (buttonsPressed[40]) {
    def_down();
  }
}, 30);
const obj_att = {
  width: 110,
  height: 110,
  margin_top: 0,
  health: "100",
};
const obj_def = {
  ...obj_att,
};
const div_def = document.getElementById("defender");
const div_att = document.getElementById("attacker");
let def_down = () => {
  if (obj_def.margin_top < margin_max) {
    div_def.style.marginTop = obj_def.margin_top + step + "px";
    obj_def.margin_top += step;
  }
};
let def_up = () => {
  if (obj_def.margin_top > 0) {
    div_def.style.marginTop = obj_def.margin_top - step + "px";
    obj_def.margin_top -= step;
  }
};
let att_down = () => {
  if (obj_att.margin_top < margin_max) {
    div_att.style.marginTop = obj_att.margin_top + step + "px";
    obj_att.margin_top += step;
  }
};
let att_up = () => {
  if (obj_att.margin_top > 0) {
    div_att.style.marginTop = obj_att.margin_top - step + "px";
    obj_att.margin_top -= step;
  }
};
const health_att = document.getElementById("h-a");
const health_def = document.getElementById("h-d");
health_att.style.width = "100%";
health_def.style.width = "100%";
let chek_damage = (type_shoot, y_shot, y_vict, h_vict) => {
  if (type_shoot == "att-shot") {
    if (y_shot >= y_vict && y_shot <= y_vict + h_vict) {
      obj_def.health -= 5;
      health_def.style.width = parseInt(health_def.style.width) - 5 + "%";
      if (obj_def.health <= 0) win("att");
    }
  } else if (type_shoot == "def-shot") {
    if (y_shot >= y_vict && y_shot <= y_vict + h_vict) {
      obj_att.health -= 5;
      health_att.style.width = parseInt(health_att.style.width) - 5 + "%";
      if (obj_att.health <= 0) win("def");
    }
  }
};
let win = (winer) => {
  winer == "att" ? alert("Blue is winer") : alert("Red is winer");
  window.location.reload();
};
const battlefield = document.getElementById("battlefield");
let att_shot = () => {
  let shot = document.createElement("span");
  shot.className = "shot-att";
  shot.style.marginTop = obj_att.margin_top + 45 + "px";
  battlefield.append(shot);
  shot.style.marginLeft = "0px";
  let s = setInterval(() => {
    shot.style.marginLeft = parseInt(shot.style.marginLeft) + shot_speed + "px";
    if (parseInt(shot.style.marginLeft) >= 1220) {
      chek_damage(
        "att-shot",
        parseInt(shot.style.marginTop),
        obj_def.margin_top,
        obj_def.height
      );
      clearInterval(s);
      shot.remove();
    }
  }, 10);
};
let def_shot = () => {
  let shot = document.createElement("span");
  shot.className = "shot-def";
  shot.style.marginTop = obj_def.margin_top + 45 + "px";
  battlefield.append(shot);
  shot.style.marginLeft = "1120px";
  let s = setInterval(() => {
    shot.style.marginLeft = parseInt(shot.style.marginLeft) - shot_speed + "px";
    if (parseInt(shot.style.marginLeft) <= -80) {
      chek_damage(
        "def-shot",
        parseInt(shot.style.marginTop),
        obj_att.margin_top,
        obj_att.height
      );
      clearInterval(s);
      shot.remove();
    }
  }, 10);
};
setInterval(() => {
  if (obj_att.health < 100) {
    obj_att.health += 10;
    health_att.style.width = parseInt(health_att.style.width) + 10 + "%";
  }
  if (obj_def.health < 100) {
    obj_def.health += 10;
    health_def.style.width = parseInt(health_def.style.width) + 10 + "%";
  }
}, 10000);
