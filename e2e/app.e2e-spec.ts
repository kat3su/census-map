import { CensusMapPage } from './app.po';

describe('census-map App', () => {
  let page: CensusMapPage;

  beforeEach(() => {
    page = new CensusMapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
