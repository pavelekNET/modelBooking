import { ModelBookingPage } from './app.po';

describe('model-booking App', function() {
  let page: ModelBookingPage;

  beforeEach(() => {
    page = new ModelBookingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
