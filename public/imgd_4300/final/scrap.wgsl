fn closestFood(pos: vec2f, foodCount: u32) -> vec2f {
  var closest = targetFoods[1];
  var closestDist = distance(pos, closest);

  for (var i: u32 = 2u; i <= foodCount; i = i + 1u) {
    let curr = targetFoods[i];
    let dist = distance(pos, curr);

    if (dist < closestDist) {
      closest = curr;
      closestDist = dist;
    }
  }

  return closest;
}

/*
      let closest = closestFood(vant.pos, foodCount);
      let toClosest = closest - vant.pos;

      if (length(toClosest) > 0.001) {
        let toFood = normalize(toClosest);
        let targetDir = atan2(toFood.x, toFood.y) / pi2;

        // stronger = more direct targeting
        vant.dir = mix(vant.dir, targetDir, 0.18);
      }

      pheromones[pIndex] = min(1., pheromone + 0.25);
      */