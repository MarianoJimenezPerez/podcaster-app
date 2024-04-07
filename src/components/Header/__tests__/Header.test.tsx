import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FetchingContext } from '@/context/FetchingContext';
import Header from '../Header';

describe('<Header />', () => {
  afterEach(cleanup);

  it('should find the title on header component', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText('Podcaster')).toBeDefined();
  });

  it('should render with indicatorClass when isFetching is true', async () => {
    const contextValues = { isFetching: true, updateFetching: () => {} };
    render(
      <BrowserRouter>
        <FetchingContext.Provider value={contextValues}>
          <Header />
        </FetchingContext.Provider>
      </BrowserRouter>
    );

    const indicator = screen.getByTestId('fetching-indicator');
    const className = indicator.getAttribute('class');
    expect(className).toBe('led__indicator led__indicator--blinking');
  });

  it('should render without indicatorClass when isFetching is false', async () => {
    const contextValues = { isFetching: false, updateFetching: () => {} };
    render(
      <BrowserRouter>
        <FetchingContext.Provider value={contextValues}>
          <Header />
        </FetchingContext.Provider>
      </BrowserRouter>
    );

    const indicator = screen.getByTestId('fetching-indicator');
    const className = indicator.getAttribute('class');
    expect(className).toBe('led__indicator');
  });
});
