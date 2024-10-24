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

  it('uses examples', () => {
    const tests = rawTests.split('\n');

    let count = 0;

    tests.forEach((test) => {
      count++;
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
      ] = test.split('\t');

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

      console.log('On item: ', count);
      const urlEncoded = unBraces(url?.trim());

      if (resultUrl !== '') {
        expect(result).toBe((unBraces(resultUrl) || '').replace(urlEncoded || '', url?.trim()));
      }
    });
  });
});
