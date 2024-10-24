import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { Input } from './Inputs';
import { UrlBuilderProps, urlBuilder } from './urlBuilder';
import { ToastContainer, toast } from 'react-toastify';
import { useLocalStorage } from '@uidotdev/usehooks';
import 'react-toastify/dist/ReactToastify.css';

const Parameter = (props: any) => {
  const { name, value, onChange } = props;

  return (
    <div className="flex">
      <span className="min-w-48 self-center text-right">{name}</span>
      <Input value={value} onChange={onChange} />
    </div>
  );
};

const useUrlBuilder = (props: UrlBuilderProps) => {
  const [urlResult, setUrlResult] = useState('');

  useEffect(() => {
    setUrlResult(urlBuilder(props) || '');
  }, [props]);

  return { urlResult };
};

function App() {
  const [history, setHistory] = useLocalStorage<UrlBuilderProps[]>('urlHistory', []);
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

  const saveToLS = () => {
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
    };

    let newHistory = history.slice();

    newHistory.unshift(entry);

    if (newHistory.length > 10) {
      newHistory = newHistory.slice(0, 10);
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
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="self-center">
          <Parameter
            name="URL"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
          />
          <Parameter
            name="Source"
            value={source}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSource(e.target.value)}
          />
          <Parameter
            name="Medium"
            value={medium}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMedium(e.target.value)}
          />
          <Parameter
            name="Campaign Name"
            value={campaignName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCampaignName(e.target.value)}
          />
          <Parameter
            name="Branding"
            value={branding}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBranding(e.target.value)}
          />
          <Parameter
            name="Targeting Tactic"
            value={targetingTactic}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTargetingTactic(e.target.value)}
          />
          <Parameter
            name="State"
            value={state}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)}
          />
          <Parameter
            name="City"
            value={city}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
          />
          <Parameter
            name="Business Unit"
            value={businessUnit}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessUnit(e.target.value)}
          />
          <Parameter
            name="Creative Type"
            value={creativeType}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCreativeType(e.target.value)}
          />
          <Parameter
            name="Creative Variant"
            value={creativeVariant}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCreativeVariant(e.target.value)}
          />
          <Parameter
            name="Audience"
            value={audience}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAudience(e.target.value)}
          />
        </div>
        {url && urlResult && (
          <button
            className="border rounded-3xl break-all border-green-500 m-9 p-3"
            onClick={handleClick}
          >
            {urlResult}
          </button>
        )}
        {history && history.length > 0 && (
          <div className="flex flex-col">
            <h2>History</h2>
            {history.map((h, i) => (
              <button key={`${h.url}-${i}`} onClick={() => repopulateEntry(h)}>
                {urlBuilder(h)}
              </button>
            ))}
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
