import { createContext, ReactNode, useState, useLayoutEffect, ReactElement } from "react";

export const IsMobileContext = createContext(false);



export const MobileContextWrapper = function ({
  children,
}: { children: ReactNode }) {
  const [media, setMedia] = useState(false);

  useLayoutEffect(() => {
    const mq = "screen and (min-width: 526px)";
    const mql = window.matchMedia(mq);

    const cb = (mql: { matches: boolean }) => {
      setMedia(!mql.matches);
      console.log({ mql })
    };

    mql.addEventListener("change", cb);

    cb(mql);
  }, []);

  return (
    <IsMobileContext.Provider value={media}>
      {children}
    </IsMobileContext.Provider>
  );
};
