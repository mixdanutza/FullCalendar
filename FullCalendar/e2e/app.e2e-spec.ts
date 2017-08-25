import { FullCalendarPage } from './app.po';

describe('full-calendar App', () => {
  let page: FullCalendarPage;

  beforeEach(() => {
    page = new FullCalendarPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
