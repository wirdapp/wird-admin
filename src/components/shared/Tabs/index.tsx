import React, { useEffect, useState, ReactElement } from 'react';

interface TabsProps {
  labels: string[];
  contents: ReactElement[];
  contentClass?: string;
}

export default function Tabs(props: TabsProps) {
  const [toggleState, setToggleState] = useState(
    props.labels.length - 1 >= 0 ? props.labels.length - 1 : 0,
  );
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setToggleState(props.labels.length - 1 >= 0 ? props.labels.length - 1 : 0);
  }, [props.labels, props.contents]);

  const toggleTab = (index: number) => {
    setToggleState(index);
    setReset(!reset);
  };

  return (
    <>
      {props.labels.length > 0 && props.contents.length > 0 && (
        <div className="container">
          <div className="bloc-tabs">
            {props.labels.map((label, index) => {
              return (
                <button
                  className={
                    toggleState === index ? 'tabs active-tabs' : 'tabs'
                  }
                  onClick={() => toggleTab(index)}
                  key={index}
                >
                  {' '}
                  {label}
                </button>
              );
            })}
          </div>
          <div className="content-tabs">
            {props.contents.map((content, index) => {
              return (
                <div
                  className={
                    (toggleState === index
                      ? 'content  active-content'
                      : 'content') +
                    (props.contentClass ? props.contentClass : '')
                  }
                  key={index}
                >
                  {React.cloneElement(content, { reset: reset } as Record<string, unknown>)}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
