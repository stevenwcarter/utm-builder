import { useEffect, useRef, useState } from 'react';
import './App.css';
import { UrlBuilderProps, UrlBuilderPropsWithResult, urlBuilder } from './urlBuilder';
import { ToastContainer, toast } from 'react-toastify';
import { useLocalStorage } from '@uidotdev/usehooks';
import 'react-toastify/dist/ReactToastify.css';
import { useUrlBuilder } from './hooks/useUrlBuilder';
import { Parameter } from './components/Parameter';
import { HistoryView } from './components/HistoryView';

export const MAX_HISTORY = 50;

function App() {
  const topRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useLocalStorage<UrlBuilderPropsWithResult[]>('urlHistory', []);
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [branding, setBranding] = useState('');
  const [targetingTactic, setTargetingTactic] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [businessUnit, setBusinessUnit] = useState('');
  const [creativeType, setCreativeType] = useState('');
  const [creativeVariant, setCreativeVariant] = useState('');
  const [audience, setAudience] = useState('');

  const { urlResult } = useUrlBuilder({
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
  });

  useEffect(() => {
    const newHistory = history.map((h) => ({ ...h, urlResult: urlBuilder(h) }));

    setHistory(newHistory);
  }, []);

  const saveToLS = () => {
    if (history.find((h) => h.urlResult === urlResult)) {
      return;
    }

    const entry = {
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
      urlResult,
    };

    let newHistory = history.slice();

    newHistory.unshift(entry);

    if (newHistory.length > MAX_HISTORY) {
      newHistory = newHistory.slice(0, MAX_HISTORY);
    }

    setHistory(newHistory);
  };

  const handleClick = () => {
    saveToLS();
    navigator.clipboard.writeText(urlResult);
    toast('Copied URL to clipboard');
  };

  const repopulateEntry = (entry: UrlBuilderProps) => {
    setUrl(entry.url || '');
    setSource(entry.source || '');
    setMedium(entry.medium || '');
    setCampaignName(entry.campaignName || '');
    setBranding(entry.branding || '');
    setTargetingTactic(entry.targetingTactic || '');
    setState(entry.state || '');
    setCity(entry.city || '');
    setBusinessUnit(entry.businessUnit || '');
    setCreativeType(entry.creativeType || '');
    setCreativeVariant(entry.creativeVariant || '');
    setAudience(entry.audience || '');
    topRef.current!.scrollIntoView(true);
  };

  const removeFromHistory = (urlToRemove: string) => {
    setHistory(history.filter((h) => h.urlResult !== urlToRemove));
  };

  return (
    <>
      <div className="flex flex-col h-screen overflow-y-auto p-8 w-full">
        <h1 className="mb-8">Marketing URL Builder</h1>
        <div className="self-center flex flex-col gap-2">
          <Parameter ref={topRef} name="URL" value={url} setter={setUrl} />
          <Parameter name="Source" value={source} setter={setSource} />
          <Parameter name="Medium" value={medium} setter={setMedium} />
          <Parameter name="Campaign Name" value={campaignName} setter={setCampaignName} />
          <Parameter name="Branding" value={branding} setter={setBranding} />
          <Parameter name="Targeting Tactic" value={targetingTactic} setter={setTargetingTactic} />
          <Parameter name="State" value={state} setter={setState} />
          <Parameter name="City" value={city} setter={setCity} />
          <Parameter name="Business Unit" value={businessUnit} setter={setBusinessUnit} />
          <Parameter name="Creative Type" value={creativeType} setter={setCreativeType} />
          <Parameter name="Creative Variant" value={creativeVariant} setter={setCreativeVariant} />
          <Parameter name="Audience" value={audience} setter={setAudience} />
        </div>
        {url && urlResult && (
          <div className="m-4 p-2 flex flex-col">
            <p>Click to copy to clipboard</p>
            <button
              className="border rounded-3xl break-all border-green-500 m-2 p-3"
              onClick={handleClick}
            >
              {urlResult}
            </button>
          </div>
        )}
        <HistoryView
          removeFromHistory={removeFromHistory}
          repopulateEntry={repopulateEntry}
          history={history}
        />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
