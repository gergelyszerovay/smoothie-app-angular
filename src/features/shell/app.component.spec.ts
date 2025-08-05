import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should create the app', async () => {
    const { fixture } = await render(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title text', async () => {
    await render(AppComponent);
    const headingElement = screen.getByText('Angular + Tailwind CSS');
    expect(headingElement).toBeTruthy();
  });
});
