import Parser from "rss-parser";

const parser = new Parser();

export async function detectSmallFeeds(feedUrl: string) {
  try {
    const feed = await parser.parseURL(feedUrl);
    const items = feed.items || [];

    let smallCount = 0;
    let total = items.length;

    for (const item of items) {
      const content = item["content:encoded"] || item.contentSnippet || item.description || "";
      const text = content.replace(/<[^>]+>/g, "").trim(); // strip HTML
      const length = text.length;

      // define heuristics
      const hasHTML = /<p>|<div>|<img>|<br>/i.test(content);
      const isSmall = length < 500 && !hasHTML;

      if (isSmall) smallCount++;
    }

    const smallRatio = smallCount / total;
    return {
      feedUrl,
      totalItems: total,
      smallItems: smallCount,
      smallRatio,
      likelySmallFeed: smallRatio > 0.7, // 70% small items => feed likely partial
    };
  } catch (error) {
    console.error("Error analyzing feed:", error);
    return { feedUrl, error: String(error) };
  }
}
