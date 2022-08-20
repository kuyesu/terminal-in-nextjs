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

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
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
    <>
      <Head>
        <title>{config.title}</title>
      </Head>

      <div className="p-8 overflow-hidden h-full ">
        <section className="overflow-y-auto bg-gradient-to-b from-gray-900/5 to-[#e2d8c3]  w-100 mt-3">
          {/* <!-- Jumbotron --> */}
          <div className="container ">
            <div className="row" style={{ marginRight: 0 }}>
              <div className="col-md-12 " style={{ marginRight: 0 }}>
                <div
                  className="card cascading-right overflow-y-auto"
                  style={{
                    background: 'hsla(0, 0%, 100%, 0.05)',
                    backdropFilter: 'blur(100px)',
                    // backdropFilter: 'drop-shadow(4px 4px 10px blue)',
                    maxHeight: '80vh',
                    height: '80vh',
                    border: '1px solid #164d56',
                  }}
                >
                  <div className="dot-container">
                    <ul id="navidation">
                      <li>
                        <a>Kuyeso Rogers</a>
                      </li>
                    </ul>
                    <div className="dots-wrapper">
                      <div
                        id="dot-3"
                        className="browser-dot"
                        style={{ opacity: 1 }}
                      ></div>
                      <div
                        id="dot-2"
                        className="browser-dot"
                        style={{ opacity: 1 }}
                      ></div>
                      <div
                        id="dot-1"
                        className="browser-dot"
                        style={{ opacity: 1 }}
                      ></div>
                    </div>
                  </div>
                  <div
                    ref={containerRef}
                    className="overflow-y-auto h-full mt-2 mb-1"
                    style={{
                      padding: '35px',
                      paddingTop: '80px',
                    }}
                  >
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
      </div>
    </>
  );
};

export default IndexPage;
