export const TYPE: string = 'DAI_HOI_DANG';
export enum typeMap {
  DAI_HOI_DANG = 'DAI_HOI_DANG',
  ASKVN = 'ASKVN'
}
export const isShowArrowScroll = (type: string, lengthData: number) => {
  const config: any = {
    Avaiable : 6,
    IllustratedMaps: 8,
    TravelGuides: 8,
    Comunity: 8
  };
  return lengthData > config[type] ? true : false;
};

export const setAttSlide = (elementClass: any, isShow: boolean) => {
  if (elementClass) {
    let wrapInner = elementClass.getElementsByClassName('horizontal-menu')[0];
    if (wrapInner && !isShow) {
      wrapInner.setAttribute('style', 'padding: 0 50px');
    }
  }
};