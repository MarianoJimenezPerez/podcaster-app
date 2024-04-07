import { describe, it, expect } from 'vitest';
import { parseFeedData } from '../parseFeedData';
import { EpisodeDetail } from '@/types';

describe('parseFeedData', () => {
  it('should parse feed data XML into array of EpisodeDetail objects', () => {
    const feedDataXml = `
      <rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
        <channel>
          <item>
            <guid>123</guid>
            <title>Episode 1</title>
            <description>Description for episode 1</description>
            <pubDate>2022-01-01T12:00:00Z</pubDate>
            <itunes:duration>01:00:00</itunes:duration>
          </item>
          <item>
            <guid>456</guid>
            <title>Episode 2</title>
            <description>Description for episode 2</description>
            <pubDate>2022-02-01T12:00:00Z</pubDate>
            <itunes:duration>00:45:00</itunes:duration>
          </item>
        </channel>
      </rss>
    `;
    const expectedEpisodes = [
      {
        guid: '123',
        title: 'Episode 1',
        description: 'Description for episode 1',
        pubDate: '01/01/2022',
        duration: '01:00:00'
      },
      {
        guid: '456',
        title: 'Episode 2',
        description: 'Description for episode 2',
        pubDate: '01/02/2022',
        duration: '00:45:00'
      }
    ];
    const result = parseFeedData(feedDataXml);
    expect(result).toEqual(expectedEpisodes);
  });

  it('should handle empty feed data XML', () => {
    const feedDataXml = '';
    const expectedEpisodes: EpisodeDetail[] = [];
    const result = parseFeedData(feedDataXml);
    expect(result).toEqual(expectedEpisodes);
  });

  it('should handle invalid feed data XML', () => {
    const feedDataXml = '<rss><channel><item><title>Invalid Episode</title></item></channel></rss>';
    const expectedEpisodes: EpisodeDetail[] = [];
    const result = parseFeedData(feedDataXml);
    expect(result).toEqual(expectedEpisodes);
  });
});
