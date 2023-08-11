import * as cheerio from "https://esm.sh/cheerio";
import { FeedArticleData } from "./database.ts";

interface HackerNewsFeed {
  rss: {
    channel: {
      item: {
        title: string;
        link: string;
        pubDate: string;
        description: string;
      }[];
    };
  };
}

interface TheVergeFeed {
  feed: {
    entry: {
      published: string;
      updated: string;
      title: string;
      content: {
        "@type": "html";
        "#text": string;
      };
      link: {
        "@rel": "alternate";
        "@type": "text/html";
        "@href": string;
        "#text": null;
      };
      id: string;
      author: {
        name: string;
      };
    }[];
  };
}

interface TechCrunchFeed {
  rss: {
    channel: {
      item: {
        title: string;
        link: string;
        comments: string;
        "dc:creator": string;
        pubDate: string;
        category: string[];
        guid: {
          "@isPermaLink": boolean;
          "#text": string;
        };
        description: string;
        "content:encoded": string;
        "wfw:commentRss": string;
        "slash:comments": number;
      }[];
    };
  };
}

interface ArsTechnicaFeed {
  rss: {
    channel: {
      item: {
        title: string;
        link: string;
        comments: string;
        "dc:creator": string;
        pubDate: string;
        category: string[];
        guid: {
          "@isPermaLink": boolean;
          "#text": string;
        };
        description: string;
        "content:encoded": string;
        "wfw:commentRss": string;
        "slash:comments": number;
      }[];
    };
  };
}

interface EngadgetFeed {
  rss: {
    channel: {
      item: {
        title: string;
        description: {
          "@type": "html";
          "#text": string;
        };
        link: string;
        guid: {
          "@isPermalink": boolean;
          "#text": string;
        };
        "dc:creator": string;
        pubDate: string;
        ingested: number;
        modified: Date;
        category: string[];
      }[];
    };
  };
}

interface WiredFeed {
  rss: {
    channel: {
      title: string;
      description: string;
      link: string;
      copyright: string;
      language: string;
      lastBuildDate: string;
      item: {
        title: string;
        link: string;
        pubDate: string;
        "media:content": null;
        description: string;
        category: string[];
        "media:keywords": string;
        "dc:creator": string;
        "dc:subject": string;
      }[];
    };
  };
}

interface VentureBeatFeed {
  rss: {
    channel: {
      item: {
        title: string;
        link: string;
        pubDate: string;
        "dc:creator": string;
        category: string[];
        description: string;
        "content:encoded": string;
      }[];
    };
  };
}

interface MashableFeed {
  rss: {
    channel: {
      item: {
        title: string;
        link: string;
        pubDate: string;
        description: string;
      }[];
    };
  };
}

export const feeds = [
  {
    name: "Hacker News",
    rss: "https://news.ycombinator.com/rss",
    map: (feed: HackerNewsFeed): FeedArticleData[] => {
      return feed.rss.channel.item.map((data) => {
        return {
          title: data.title,
          link: data.link,
          date: new Date(data.pubDate),
          description: data.description,
        };
      });
    },
  },
  {
    name: "The Verge",
    rss: "https://www.theverge.com/rss/index.xml",
    map: (feed: TheVergeFeed): FeedArticleData[] => {
      return feed.feed.entry.map((data) => {
        return {
          title: data.title,
          link: data.link["@href"],
          date: new Date(data.published),
          description: cheerio.load(data.content["#text"]).text(),
        };
      });
    },
  },
  {
    name: "ars Technica",
    rss: "http://feeds.arstechnica.com/arstechnica/index",
    map: (feed: ArsTechnicaFeed): FeedArticleData[] => {
      return feed.rss.channel.item.map((data) => {
        return {
          title: data.title,
          link: data.link,
          date: new Date(data.pubDate),
          description: data.description,
        };
      });
    },
  },
  {
    name: "TechCrunch",
    rss: "https://techcrunch.com/feed",
    map: (feed: TechCrunchFeed): FeedArticleData[] => {
      return feed.rss.channel.item.map((data) => {
        return {
          title: data.title,
          link: data.link,
          date: new Date(data.pubDate),
          description: data.description,
        };
      });
    },
  },
  {
    name: "engadget",
    rss: "https://www.engadget.com/rss.xml",
    map: (feed: EngadgetFeed): FeedArticleData[] => {
      return feed.rss.channel.item.map((data) => {
        return {
          title: data.title,
          link: data.link,
          date: new Date(data.pubDate),
          description: cheerio.load(data.description["#text"]).text(),
        };
      });
    },
  },
  {
    name: "Wired",
    rss: "https://www.wired.com/feed/rss",
    map: (feed: WiredFeed): FeedArticleData[] => {
      return feed.rss.channel.item.map((data) => {
        return {
          title: data.title,
          link: data.link,
          date: new Date(data.pubDate),
          description: data.description,
        };
      });
    },
  },
  {
    name: "Wired science",
    rss: "https://www.wired.com/feed/category/science/latest/rss",
    map: (feed: WiredFeed): FeedArticleData[] => {
      return feed.rss.channel.item.map((data) => {
        return {
          title: data.title,
          link: data.link,
          date: new Date(data.pubDate),
          description: data.description,
        };
      });
    },
  },
  {
    name: "Venture Beat",
    rss: "https://feeds.feedburner.com/venturebeat/SZYF",
    map: (feed: VentureBeatFeed): FeedArticleData[] => {
      return feed.rss.channel.item.map((data) => {
        return {
          title: data.title,
          link: data.link,
          date: new Date(data.pubDate),
          description: data.description,
        };
      });
    },
  },
  {
    name: "Mashable tech",
    rss: "https://mashable.com/feeds/rss/tech",
    map: (feed: MashableFeed): FeedArticleData[] => {
      return feed.rss.channel.item.map((data) => {
        return {
          title: data.title,
          link: data.link,
          date: new Date(data.pubDate),
          description: data.description,
        };
      });
    },
  },
  {
    name: "Mashable science",
    rss: "https://mashable.com/feeds/rss/science",
    map: (feed: MashableFeed): FeedArticleData[] => {
      return feed.rss.channel.item.map((data) => {
        return {
          title: data.title,
          link: data.link,
          date: new Date(data.pubDate),
          description: data.description,
        };
      });
    },
  },
];
