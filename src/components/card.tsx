import Head from 'next/head';
import React from 'react';
import config from '../../config.json';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import { banner } from '../utils/bin';

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const Card  = ({ inputRef }) => {
  const containerRef = React.useRef(null);
  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);

  const init = React.useCallback(() => setHistory(banner()), []);

  React.useEffect(() => {
    init();
  }, [init]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history]);
  return (
    <section className="fixed h-screen bg-gradient-to-b from-gray-900/5 to-[#e2d8c3] lg:h-[140vh] w-100">
      {/* <!-- Jumbotron --> */}
      <div className="container ">
        <div className="row" style={{ marginRight: 0 }}>
          <div className="col-md-8 " style={{ marginRight: 0 }}>
            <div
              className="card cascading-right position-absolute end-0 "
              style={{
                background: 'hsla(0, 0%, 100%, 0.55)',
                backdropFilter: 'blur(30px)',
                marginRight: 60,
              }}
            >
              <div ref={containerRef} className="overflow-y-auto h-full">
                <History history={history} />

                <Input
                  inputRef={inputRef}
                  containerRef={containerRef}
                  command={command}
                  history={history}
                  lastCommandIndex={lastCommandIndex}
                  setCommand={setCommand}
                  setHistory={setHistory}
                  setLastCommandIndex={setLastCommandIndex}
                  clearHistory={clearHistory}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Card