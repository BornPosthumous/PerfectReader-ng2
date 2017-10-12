import {
  Injectable,
  Inject
} from '@angular/core';
const cheerio = require('cheerio')

@Injectable()
export class OcrService {

  constructor(
    @Inject('uploadservice') private uploadService,
  ) { }

  getWordChildrenFromLine($, line, lineId) {
    let wordsInLine = []
    $(line).children().each((i, elem) => {
      wordsInLine.push({
        id: i,
        title: this.parseBoundingBoxes(elem.attribs.title),
        class: elem.attribs.class,
        name: elem.name,
        word: $(elem).text(),
        lineId: lineId
      })
    })
    return wordsInLine;
  }
  getXmlAndReturnLineData() {
    return this.uploadService.testXML().map(xml => {
      const $ = cheerio.load(xml);
      let lines = [];
      $('.ocr_line').each((i, elem) => {
        lines.push({
          id: i,
          title: this.parseBoundingBoxes(elem.attribs.title),
          class: elem.attribs.class,
          name: elem.name,
          word: $(elem).text(),
          wordsInLine: this.getWordChildrenFromLine($, elem, i)
        })
      })
      return lines;
    })
  }
  parseBoundingBoxes(xmlTitle) {
    let coords =
      xmlTitle
        .split(' ')
        .filter(el => el !== 'bbox');

    let topLeft = {
      x: parseInt(coords[0]),
      y: parseInt(coords[1])
    }
    let bottomRight = {
      x: parseInt(coords[2]),
      y: parseInt(coords[3])
    }
    return { topLeft, bottomRight }
  }
}
