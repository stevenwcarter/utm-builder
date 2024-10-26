export interface UrlBuilderProps {
  url?: string;
  source?: string;
  medium?: string;
  campaignName?: string;
  branding?: string;
  targetingTactic?: string;
  state?: string;
  city?: string;
  businessUnit?: string;
  creativeType?: string;
  creativeVariant?: string;
  audience?: string;
  content?: string;
  term?: string;
}
export type UrlBuilderPropsWithResult = UrlBuilderProps & { urlResult: string };

export const lp = (s?: string) => s?.toLowerCase().trim();
export const unBraces = (s?: string) =>
  s
    ?.replace(/\{/g, '%7B')
    .replace(/\}/g, '%7D')
    .replace(/,/g, '%2C')
    .replace(/\//g, '%2F')
    .replace(/&/g, '%26')
    .replace(/:/g, '%3A')
    .replace(/%26utm/g, '&utm');

const googleCpc = (d: UrlBuilderProps, params: URLSearchParams) => {
  const campaign = [
    lp(d.campaignName),
    lp(d.branding),
    lp(d.targetingTactic),
    lp(d.state),
    lp(d.city),
    lp(d.businessUnit),
  ]
    .filter((a) => a !== '')
    .join('_');

  if (campaign && campaign !== '') {
    params.append('utm_campaign', campaign);
  }

  if (lp(d.campaignName)?.indexOf('pmax') === -1) {
    params.append('utm_content', '{ad_content}');
    params.append('utm_term', '{keyword}');
  }

  return `${d.url?.trim()}?${params.toString()}`;
};

const mediaHandler = (d: UrlBuilderProps, params: URLSearchParams) => {
  const campaign = [lp(d.campaignName), lp(d.targetingTactic), lp(d.businessUnit)]
    .filter((a) => a !== '')
    .join('_');

  if (campaign && campaign !== '') {
    params.append('utm_campaign', campaign);
  }

  if (lp(d.campaignName)?.indexOf('pmax') === -1) {
    params.append(
      'utm_content',
      [lp(d.creativeVariant), lp(d.state), lp(d.city)].filter((a) => a !== '').join('_'),
    );
    const audience = lp(d.audience);

    if (audience) {
      params.append('utm_term', audience);
    }
  }

  return `${d.url?.trim()}?${params.toString()}`;
};

const bingCpc = (d: UrlBuilderProps, params: URLSearchParams) => {
  const campaign = [
    lp(d.campaignName),
    lp(d.branding),
    lp(d.targetingTactic),
    lp(d.state),
    lp(d.city),
    lp(d.businessUnit),
  ]
    .filter((a) => a !== '')
    .join('_');

  if (campaign && campaign !== '') {
    params.append('utm_campaign', campaign);
  }

  if (lp(d.campaignName)?.indexOf('pmax') === -1) {
    params.append('utm_content', '{AdId}');
    params.append('utm_term', '{keyword:keyword}');
  }

  return `${d.url?.trim()}?${params.toString()}`;
};

const paidSocialHandler = (d: UrlBuilderProps, params: URLSearchParams) => {
  const campaign = [lp(d.campaignName), lp(d.targetingTactic), lp(d.businessUnit)]
    .filter((a) => a !== '')
    .join('_');

  if (campaign && campaign !== '') {
    params.append('utm_campaign', campaign);
  }

  if (lp(d.campaignName)?.indexOf('pmax') === -1) {
    params.append(
      'utm_content',
      [lp(d.creativeType), lp(d.creativeVariant), lp(d.state), lp(d.city)]
        .filter((a) => a !== '')
        .join('_'),
    );
    params.append(
      'utm_term',
      ['{{placement}}', lp(d.audience)]
        .filter((a) => a !== '')
        .join('_')
        .replace(/_{2,}/, '_'),
    );
  }

  return `${d.url?.trim()}?${params.toString()}`;
};

const genericHandler = (d: UrlBuilderProps, params: URLSearchParams) => {
  const campaignName = lp(d.campaignName);

  if (campaignName && campaignName !== '') {
    params.append('utm_campaign', campaignName);
  }

  if (campaignName?.indexOf('pmax') === -1) {
    const content = lp(d.content);

    if (content) {
      params.append('utm_content', content);
    }

    const term = lp(d.term);

    if (term) {
      params.append('utm_term', term);
    }
  }

  return params.toString() !== '' ? `${d.url?.trim()}?${params.toString()}` : '';
};

export const urlBuilder = (d: UrlBuilderProps) => {
  const params = new URLSearchParams({});
  const source = lp(d.source);

  if (source && source !== '') {
    params.append('utm_source', source);
  }

  const medium = lp(d.medium);

  if (medium && medium !== '') {
    params.append('utm_medium', medium);
  }

  if (source?.toLowerCase() === 'google' && medium?.toLowerCase() === 'cpc') {
    return googleCpc(d, params);
  }

  if (source?.toLowerCase() === 'bing' && medium?.toLowerCase() === 'cpc') {
    return bingCpc(d, params);
  }

  if (medium && ['display', 'native_display', 'video', 'audio'].includes(medium.toLowerCase())) {
    return mediaHandler(d, params);
  }

  if (medium?.replace(/ /g, '').toLowerCase() === 'paidsocial') {
    return paidSocialHandler(d, params);
  }

  return genericHandler(d, params);
};
