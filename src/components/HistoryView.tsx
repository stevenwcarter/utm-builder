import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button, { ButtonTypes } from './Button';
import { urlBuilder, UrlBuilderPropsWithResult } from '../urlBuilder';

interface HistoryViewProps {
  history: UrlBuilderPropsWithResult[];
  repopulateEntry: (h: UrlBuilderPropsWithResult) => void;
  removeFromHistory: (url: string) => void;
}
export const HistoryView = (props: HistoryViewProps) => {
  const { history, repopulateEntry, removeFromHistory } = props;

  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col mt-9 max-w-[1280px] m-auto">
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
  );
};
