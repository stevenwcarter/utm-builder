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

// http://www.constellation.com
// ?utm_source=google
// utm_medium=cpc
// utm_campaign=test1_br_pr_tx_atl_en
// utm_content=%7Bad_content%7D
// utm_term=%7Bkeyword%7D

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

  if (source === 'google' && medium === 'cpc') {
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

    return params.toString() !== '' ? `${d.url?.trim()}?${params.toString()}` : '';
  }

  if (source === 'bing' && medium === 'cpc') {
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

    return params.toString() !== '' ? `${d.url?.trim()}?${params.toString()}` : '';
  }

  if (
    medium === 'display' ||
    medium === 'native_display' ||
    medium === 'video' ||
    medium === 'audio'
  ) {
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

    return params.toString() !== '' ? `${d.url?.trim()}?${params.toString()}` : '';
  }

  if (medium?.replace(/ /g, '') === 'paidsocial') {
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
          .replace('__', '_'),
      );
    }

    return params.toString() !== '' ? `${d.url?.trim()}?${params.toString()}` : '';
  }

  const campaignName = lp(d.campaignName);

  if (campaignName && campaignName !== '') {
    params.append('utm_campaign', campaignName);
  }

  if (lp(d.campaignName)?.indexOf('pmax') === -1) {
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

// = IFS(
//   AND(LP(C201, "source")="google", LP(D201, "medium")="cpc"),
//     TEXTJOIN("&", TRUE,
//       URL(LPX(B201, "url"), LP(C201, "source"), LP(D201, "medium")),
//       CONCATENATE("utm_campaign=", TEXTJOIN("_", TRUE, LP(E201,"campaign name"), LP(F201, "branding"), LP(G201, "targeting tactic"), LP(H201, "state"), LPO(I201, "city"), LP(J201, " business unit"))),
//       IF(ISNUMBER(SEARCH("pmax", E201)), "", CONCAT_IF("utm_content=", "{ad_content}")),
//       IF(ISNUMBER(SEARCH("pmax", E201)), "", CONCAT_IF("utm_term=", "{keyword}"))
//     ),
//   AND(LP(C201, "source")="bing", LP(D201, "medium")="cpc"),
//     TEXTJOIN("&", TRUE,
//       URL(LPX(B201, "url"), LP(C201, "source"), LP(D201, "medium")),
//       CONCATENATE("utm_campaign=", TEXTJOIN("_", TRUE, LP(E201,"campaign name"), LP(F201, "branding"), LP(G201, "targeting tactic"), LP(H201, "state"), LPO(I201, "city"), LP(J201, " business unit"))),
//       IF(ISNUMBER(SEARCH("pmax", E201)), "", CONCAT_IF("utm_content=", "{AdId}")),
//       IF(ISNUMBER(SEARCH("pmax", E201)), "", CONCAT_IF("utm_term=", "{keyword:keyword}"))
//     ),
//   OR(LP(D201, "medium")="display", LP(D201, "medium")="native_display", LP(D201, "medium")="video", LP(D201, "medium")="audio"),
//     TEXTJOIN("&", TRUE,
//       URL(LPX(B201, "url"), LP(C201, "source"), LP(D201, "medium")),
//       CONCATENATE("utm_campaign=", TEXTJOIN("_", TRUE, LP(E201,"campaign name"), LP(G201, "targeting tactic"), LP(J201, " business unit"))),
//       IF(ISNUMBER(SEARCH("pmax", E201)), "", CONCAT_IF("utm_content=", TEXTJOIN("_", TRUE, LPO(L201,"creative variant"), LPO(H201, "state"), LPO(I201, "city")))),
//       IF(ISNUMBER(SEARCH("pmax", E201)), "", CONCAT_IF("utm_term=", TEXTJOIN("_", TRUE, LPO(M201,"audience")))),
//     ),
//   OR(LP(D201, "medium")="paid+social"),
//     TEXTJOIN("&", TRUE,
//       URL(LPX(B201, "url"), LP(C201, "source"), LP(D201, "medium")),
//       CONCATENATE("utm_campaign=", TEXTJOIN("_", TRUE, LP(E201,"campaign name"), LP(G201, "targeting tactic"), LP(J201, " business unit"))),
//       IF(ISNUMBER(SEARCH("pmax", E201)), "", CONCAT_IF("utm_content=", TEXTJOIN("_", TRUE, LPO(K201,"creative type"), LPO(L201,"creative variant"), LPO(H201, "state"), LPO(I201, "city")))),
//       IF(ISNUMBER(SEARCH("pmax", E201)), "", CONCAT_IF("utm_term=", TEXTJOIN("_", TRUE, "{{placement}}", LPO(M201,"audience")))),
//     ),
//   TRUE,
//    TEXTJOIN("&", TRUE,
//       URL(LPX(B201, "url"), LP(C201, "source"), LP(D201, "medium")),
//       CONCATENATE("utm_campaign=", TEXTJOIN("_", TRUE, LP(E201,"campaign name"))),
//       IF(ISNUMBER(SEARCH("pmax", E201)), "", CONCAT_IF("utm_content=", TEXTJOIN("_", TRUE, LPO(N201,"content")))),
//       IF(ISNUMBER(SEARCH("pmax", E201)), "", CONCAT_IF("utm_term=", TEXTJOIN("_", TRUE, LPO(O201,"term")))),
//     )
// )
