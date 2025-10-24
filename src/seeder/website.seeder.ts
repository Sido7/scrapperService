import { raw } from "express";
import { WebsiteCreateInput } from "../interfaces/IWebsite";
import Website from "../models/website";


export const websiteData: WebsiteCreateInput[] = [
      {
    name: "TechCrunch",
    url: "http://feeds.feedburner.com/TechCrunch/",
    category: "Technology",
    frequency: 24,
    selectors: {
      item: "item",
      title: "title",
      link: "link",
      pubDate: "pubDate",
       raw_content: "content",
      content: "contentSnippet",
      image: "media:content.@url",
    },
    is_active: true,
    failure_count: 0,
    type: "rss"
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
    category: "Technology",
    frequency: 12,
    selectors: {
      title: "title",
      link: "link",
      pubDate: "pubDate",
      raw_content: "content",
      content: "contentSnippet"
    },
    is_active: true,
    failure_count: 0,
    type: "rss"
  },
  {
    name: "Everyday Fiction",
    url: "https://everydayfiction.com/feed",
    category: "Fiction",
    frequency: 24,
    selectors: {
      title: "title",
      link: "link",
      pubDate: "pubDate",
     raw_content: "content",
      content: "contentSnippet",
    },
    is_active: true,
    failure_count: 0,
     type: "rss"
  },
  {
    name: "Flash Fiction Magazine",
    url: "https://flashfictionmagazine.com/feed/",
    category: "Fiction",
    frequency: 24,
    selectors: {
      title: "title",
      link: "link",
      pubDate: "pubDate",
      raw_content: "content",
      content: "contentSnippet",
    },
    is_active: true,
    failure_count: 0,
     type: "rss"
  },
  // --- Educational and health-focused sites ---
  {
    name: "Healthline – Sexual Health",
    url: "https://www.healthline.com/rss/sexual-health",
    category: "Health",
    frequency: 24,
    selectors: {
      title: "title",
      link: "link",
      pubDate: "pubDate",
      raw_content: "content",
      content: "contentSnippet",
    },
    is_active: true,
    failure_count: 0,
     type: "rss"
  },
  {
    name: "Psychology Today – Relationships",
    url: "https://www.psychologytoday.com/us/rss",
    category: "Psychology",
    frequency: 24,
    selectors: {
      title: "title",
      link: "link",
      pubDate: "pubDate",
      raw_content: "content",
      content: "contentSnippet",
    },
    is_active: true,
    failure_count: 0,
     type: "rss"
  },
  {
    name: "Men's Health",
    url: "https://www.menshealth.com/rss/all.xml/",
    category: "Lifestyle",
    frequency: 24,
    selectors: {
      title: "title",
      link: "link",
      pubDate: "pubDate",
      raw_content: "content",
      content: "contentSnippet",
    },
    is_active: true,
    failure_count: 0,
     type: "rss"
  },
  {
    name: "Women's Health",
    url: "https://www.womenshealthmag.com/rss/all.xml/",
    category: "Lifestyle",
    frequency: 24,
    selectors: {
      title: "title",
      link: "link",
      pubDate: "pubDate",
      raw_content: "content",
      content: "contentSnippet",
    },
    is_active: true,
    failure_count: 0,
     type: "rss"
  },
  {
    name: "WebMD  Relationships and Family",
    url: "https://rssfeeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC",
    category: "Health",
    frequency: 24,
    selectors: {
      title: "title",
      link: "link",
      pubDate: "pubDate",
     raw_content: "content",
      content: "contentSnippet",
    },
    is_active: true,
    failure_count: 0,
     type: "rss"
  },

]

export const htmlWebsites: WebsiteCreateInput[] = [
  // --- SEXUAL HEALTH / LIFESTYLE ---
  {
    name: "Healthline - Sexual Health",
    url: "https://www.healthline.com/health/sex",
    category: "Sexual Health",
    frequency: 24,
    type: "html",
    selectors: {
      article: ".css-1l4spti article",
      title: "h2 a",
      link: "h2 a[href]",
      content: ".css-0 p",
      image: "img[src]",
      publishedAt: "time[datetime]",
    },
    is_active: true,
    failure_count: 0,
  },
  {
    name: "Medical News Today - Sexual Health",
    url: "https://www.medicalnewstoday.com/categories/sexual-health",
    category: "Sexual Health",
    frequency: 24,
    type: "html",
    selectors: {
      article: ".listing-container article",
      title: "h3 a",
      link: "h3 a[href]",
      content: ".css-1v6v9oc p",
      image: "img[src]",
      publishedAt: "time[datetime]",
    },
    is_active: true,
    failure_count: 0,
  },
  {
    name: "Cosmopolitan - Sex & Love",
    url: "https://www.cosmopolitan.com/sex-love/",
    category: "Lifestyle",
    frequency: 24,
    type: "html",
    selectors: {
      article: ".simple-item",
      title: ".simple-item-title a",
      link: ".simple-item-title a[href]",
      content: ".simple-item-dek",
      image: "img[src]",
      publishedAt: "time[datetime]",
    },
    is_active: true,
    failure_count: 0,
  },
  {
    name: "Men's Health - Sex & Relationships",
    url: "https://www.menshealth.com/sex-women/",
    category: "Lifestyle",
    frequency: 24,
    type: "html",
    selectors: {
      article: ".simple-item",
      title: ".simple-item-title a",
      link: ".simple-item-title a[href]",
      content: ".simple-item-dek",
      image: "img[src]",
      publishedAt: "time[datetime]",
    },
    is_active: true,
    failure_count: 0,
  },
  {
    name: "Women's Health Mag - Sex & Love",
    url: "https://www.womenshealthmag.com/sex-love/",
    category: "Lifestyle",
    frequency: 24,
    type: "html",
    selectors: {
      article: ".simple-item",
      title: ".simple-item-title a",
      link: ".simple-item-title a[href]",
      content: ".simple-item-dek",
      image: "img[src]",
      publishedAt: "time[datetime]",
    },
    is_active: true,
    failure_count: 0,
  },

  // --- POLITICS ---
  {
    name: "BBC News - Politics",
    url: "https://www.bbc.com/news/politics",
    category: "Politics",
    frequency: 12,
    type: "html",
    selectors: {
      article: "div.gs-c-promo",
      title: "h3.gs-c-promo-heading__title",
      link: "a.gs-c-promo-heading[href]",
      content: "p.gs-c-promo-summary",
      image: "img[src]",
      publishedAt: "time[datetime]",
    },
    is_active: true,
    failure_count: 0,
  },
  {
    name: "Reuters - Politics",
    url: "https://www.reuters.com/politics/",
    category: "Politics",
    frequency: 12,
    type: "html",
    selectors: {
      article: "article.story",
      title: "h3.story-title",
      link: "a[href]",
      content: "p.story-content",
      image: "img[src]",
      publishedAt: "time[datetime]",
    },
    is_active: true,
    failure_count: 0,
  },
  {
    name: "The Guardian - Politics",
    url: "https://www.theguardian.com/politics",
    category: "Politics",
    frequency: 12,
    type: "html",
    selectors: {
      article: "div.fc-item__container",
      title: "a.js-headline-text",
      link: "a.js-headline-text[href]",
      content: "div.fc-item__standfirst",
      image: "img[src]",
      publishedAt: "time[datetime]",
    },
    is_active: true,
    failure_count: 0,
  },

  // --- SPORTS ---
  {
    name: "ESPN - Sports News",
    url: "https://www.espn.com/",
    category: "Sports",
    frequency: 6,
    type: "html",
    selectors: {
      article: ".headlineStack__list li",
      title: "a",
      link: "a[href]",
      content: "",
      image: "",
      publishedAt: "",
    },
    is_active: true,
    failure_count: 0,
  },
  {
    name: "Sky Sports - Latest News",
    url: "https://www.skysports.com/",
    category: "Sports",
    frequency: 6,
    type: "html",
    selectors: {
      article: ".news-list__headline",
      title: "a",
      link: "a[href]",
      content: "",
      image: "",
      publishedAt: "",
    },
    is_active: true,
    failure_count: 0,
  },
  {
    name: "The Guardian - Sport",
    url: "https://www.theguardian.com/sport",
    category: "Sports",
    frequency: 6,
    type: "html",
    selectors: {
      article: "div.fc-item__container",
      title: "a.js-headline-text",
      link: "a.js-headline-text[href]",
      content: "div.fc-item__standfirst",
      image: "img[src]",
      publishedAt: "time[datetime]",
    },
    is_active: true,
    failure_count: 0,
  },
];


async function websiteSeeder(websitesInfo: WebsiteCreateInput[]){
    
    await Website.insertMany(websitesInfo)
}

export default websiteSeeder