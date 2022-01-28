import * as cv from '@u4/opencv4nodejs';
import * as path from 'path';
import * as React from 'react';

export default class Root extends React.Component{
  canvas: HTMLCanvasElement = null

  renderImage(img: cv.Mat) {
    const { canvas } = this
    const matRGBA = img.channels === 1
      ? img.cvtColor(cv.COLOR_GRAY2RGBA)
      : img.cvtColor(cv.COLOR_BGR2RGBA)

    canvas.height = img.rows
    canvas.width = img.cols
    const imgData = new ImageData(
      new Uint8ClampedArray(matRGBA.getData()),
      img.cols,
      img.rows
    );
    const ctx = canvas.getContext('2d')
    ctx.putImageData(imgData, 0, 0)
  }

  componentDidMount() {
    const img = cv.imread(path.resolve('assets', 'got.jpg')).resizeToMax(500)
    this.renderImage(img)
  }

  render() {
    return (
      <div>
        <h1> opencv4nodejs with webpack and react </h1>
        <canvas ref={el => { this.canvas = el }}></canvas>
      </div>
    )
  }
}
