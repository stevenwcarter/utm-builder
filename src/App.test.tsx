import { unBraces, urlBuilder, UrlBuilderProps } from './urlBuilder';
import rawTests from './examples.csv';

describe('urlBuilder', () => {
  it('example 1', () => {
    const props: UrlBuilderProps = {
      url: 'http://www.constellation.com',
      source: 'google',
      medium: 'cpc',
      campaignName: 'test1',
      branding: 'br',
      targetingTactic: 'pr',
      state: 'tx',
      city: 'atl',
      businessUnit: 'en',
      creativeType: '',
      creativeVariant: '',
    };

    expect(urlBuilder(props)).toBe(
      (
        unBraces(
          'http://www.constellation.com?utm_source=google&utm_medium=cpc&utm_campaign=test1_br_pr_tx_atl_en&utm_content={ad_content}&utm_term={keyword}',
        ) || ''
      ).replace('%3A%2F%2F', '://'),
    );
  });

  it('adds campaign name', () => {
    const props: UrlBuilderProps = {
      url: 'http://foo.com',
      campaignName: 'bar',
    };

    expect(urlBuilder(props)).toBe('http://foo.com?utm_campaign=bar');
  });

  it('adds utm_content if campaignName does not have pmax', () => {
    const props: UrlBuilderProps = {
      url: 'http://foo.com',
      campaignName: 'bar',
      content: 'foobar',
    };

    expect(urlBuilder(props)).toBe('http://foo.com?utm_campaign=bar&utm_content=foobar');
  });

  it('adds utm_term if campaignName does not have pmax', () => {
    const props: UrlBuilderProps = {
      url: 'http://foo.com',
      campaignName: 'bar',
      term: 'term_bar',
    };

    expect(urlBuilder(props)).toBe('http://foo.com?utm_campaign=bar&utm_term=term_bar');
  });

  it('adds both utm_content and utm_term if campaignName does not have pmax', () => {
    const props: UrlBuilderProps = {
      url: 'http://foo.com',
      campaignName: 'bar',
      content: 'foo_content',
      term: 'term_bar',
    };

    expect(urlBuilder(props)).toBe(
      'http://foo.com?utm_campaign=bar&utm_content=foo_content&utm_term=term_bar',
    );
  });

  const tests = rawTests.split('\n');
  const example_tests = tests.map((t, i) => [i, t, t.split('\t').slice(-1)[0]]);

  it.each(example_tests)('example: %d', (_lineNum, test, _endUrl) => {
    const [
      url,
      source,
      medium,
      campaignName,
      branding,
      targetingTactic,
      state,
      city,
      businessUnit,
      creativeType,
      creativeVariant,
      audience,
      content,
      term,
      resultUrl,
    ] = (test as string).split('\t');

    const result = urlBuilder({
      url,
      source,
      medium,
      campaignName,
      branding,
      targetingTactic,
      state,
      city,
      businessUnit,
      creativeType,
      creativeVariant,
      audience,
      content,
      term,
    });

    const urlEncoded = unBraces(url?.trim());

    if (resultUrl !== '') {
      expect(result).toBe((unBraces(resultUrl) || '').replace(urlEncoded || '', url?.trim()));
    }
  });
});
