import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
}

const SEOHead = ({ title, description, canonicalPath }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;
    
    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      metaDesc.setAttribute("content", description);
      document.head.appendChild(metaDesc);
    }

    // OG tags
    const ogTags: Record<string, string> = {
      "og:title": title,
      "og:description": description,
    };
    if (canonicalPath) {
      ogTags["og:url"] = `https://ethiopia-explorers.lovable.app${canonicalPath}`;
    }
    
    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute("content", content);
      } else {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        tag.setAttribute("content", content);
        document.head.appendChild(tag);
      }
    });

    // Canonical
    if (canonicalPath) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (link) {
        link.href = `https://ethiopia-explorers.lovable.app${canonicalPath}`;
      }
    }

    return () => {
      document.title = "Ethiopia Travel Explorer — Discover Ancient Wonders & Natural Beauty";
    };
  }, [title, description, canonicalPath]);

  return null;
};

export default SEOHead;
