import { EbuyPage } from './app.po';

describe('ebuy App', () => {
  let page: EbuyPage;

  beforeEach(() => {
    page = new EbuyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
