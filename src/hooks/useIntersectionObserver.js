import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (options) => {
  const [entries, setEntries] = useState([]);
  const observerRef = useRef(null);

  const observe = (elements) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((observedEntries) => {
        setEntries(observedEntries);
      }, options);
    }

    elements.forEach((el) => {
      if (el) observerRef.current.observe(el);
    });
  };

  const disconnect = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  };

  useEffect(() => {
    return () => disconnect();
  }, []);

  return { observe, disconnect, entries };
};

export default useIntersectionObserver;
