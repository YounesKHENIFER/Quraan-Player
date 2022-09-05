import suras from '../data/chapters.json';
export default class {
  static getSurasList() {
    return suras.map(sura => ({
      class: sura.class,
      id: sura.id,
      name_ar: sura.name_ar,
      verses_number: sura.verses_number,
    }));
  }
  static getSuras() {
    return suras.map(sura => ({
      ...sura,
      content: sura.content.split(/\s\[\d\]\s/),
    }));
  }
}
