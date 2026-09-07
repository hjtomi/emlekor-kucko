import {createContext, useContext, useEffect, useState, type ReactNode} from 'react';
import {fallbackSiteContent, type SiteContent} from '../data/content';
import {client} from '../sanity/client';
import {mapSanityToSiteContent, type SanitySiteContent} from '../sanity/mapSiteContent';
import {SITE_CONTENT_QUERY} from '../sanity/queries';

const SiteContentContext = createContext<SiteContent>(fallbackSiteContent);

export function SiteContentProvider({children}: {children: ReactNode}) {
  const [content, setContent] = useState<SiteContent>(fallbackSiteContent);

  useEffect(() => {
    let cancelled = false;

    client
      .fetch<SanitySiteContent>(SITE_CONTENT_QUERY)
      .then((data) => {
        if (!cancelled) setContent(mapSanityToSiteContent(data));
      })
      .catch(() => {
        if (!cancelled) setContent(fallbackSiteContent);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
