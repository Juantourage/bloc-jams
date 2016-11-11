  function forEach(pointsArray, revealPoint) {
            for(var i = 0; i < pointsArray.length; i++) {
                revealPoint(i);
            }
  }

//forEach(pointsArray, revealPoint);