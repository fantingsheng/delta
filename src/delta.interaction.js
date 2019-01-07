export default class Interaction {
  constructor(deltaInst) {
    this.deltaInst = deltaInst;
    this.addInteraction();
  }
  addInteraction() {
    let delta = this.deltaInst;
    delta.bind('zoom', (data) => {
      delta._transform.scale.forEach((s, i) => {
        delta._transform.scale[i] *= data.delta > 0? 2 : 1/2;
      });
      let offsetX = data.x - delta._transform.translate[0];
      let offsetY = data.y - delta._transform.translate[1];
      delta._transform.translate[0] += -(data.delta > 0? 1 : -1/2)*offsetX;
      delta._transform.translate[1] -=  (data.delta > 0? 1 : -1/2)*offsetY;
      delta.refreshAll();
    });
  }
}
