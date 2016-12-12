import { HttpTaskPage } from './app.po';

describe('http-task App', function() {
  let page: HttpTaskPage;

  beforeEach(() => {
    page = new HttpTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
