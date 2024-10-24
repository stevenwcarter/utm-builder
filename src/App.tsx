import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import './App.css';
import { Input } from './Inputs';
import { UrlBuilderProps, urlBuilder } from './urlBuilder';
import { ToastContainer, toast } from 'react-toastify';
import { useLocalStorage } from '@uidotdev/usehooks';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import Button, { ButtonTypes } from './Button';

const Parameter = forwardRef((props: any, ref: ForwardedRef<HTMLInputElement>) => {
  const { name, value, setter } = props;

  return (
    <div ref={ref} className="flex">
      <span className="min-w-48 self-center text-right">{name}</span>
      <Input value={value} onChange={(e) => setter(e.target.value)} />
    </div>
  );
});

const useUrlBuilder = (props: UrlBuilderProps) => {
  const [urlResult, setUrlResult] = useState('');

  useEffect(() => {
    setUrlResult(urlBuilder(props) || '');
  }, [props]);

  return { urlResult };
};

function App() {
  const topRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useLocalStorage<(UrlBuilderProps & { urlResult: string })[]>(
    'urlHistory',
    [],
  );
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

    if (newHistory.length > 50) {
      newHistory = newHistory.slice(0, 50);
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
      <div className="flex flex-col">
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
        {history && history.length > 0 && (
          <div className="flex flex-col mt-9">
            <h2>History</h2>
            <p>(Click to put back into editor)</p>
            <div className="flex flex-col gap-2 m-4 break-all">
              {history.map((h, i) => {
                const urlHistoryResult = urlBuilder(h);

                return (
                  <div
                    key={`${h.url}-${i}`}
                    className="text-sm text-white w-full flex justify-start items-center"
                  >
                    <Button
                      className="text-white break-all max-w-full"
                      size={'sm'}
                      type={ButtonTypes.DANGER}
                      onClick={() => removeFromHistory(urlHistoryResult)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                    <button
                      className="text-white bg-slate-700 py-1 px-2 rounded-xl"
                      onClick={() => repopulateEntry(h)}
                    >
                      {urlHistoryResult}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
