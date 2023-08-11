import { parse } from "https://deno.land/x/xml/mod.ts";
import dayjs from "https://esm.sh/dayjs";
import type { FeedArticleData } from "./database.ts";
import { feeds } from "./feed.ts";

export async function main() {
  const data = await Promise.all(
    feeds.map(async (feed) => {
      const result = await fetch(feed.rss).then((r) => r.text());
      const data = parse(result);

      try {
        const mapped = feed.map(data as any);

        console.log(` ✅️ ${feed.name}`);

        return mapped;
      } catch (error) {
        console.error(` ❌️ ${feed.name}`);
        console.error(error);
      }
    })
  );

  const articles = data
    .flat()
    .filter((item) =>
      dayjs(item?.date).isSame(dayjs(), "day")
    ) as FeedArticleData[];

  console.log(articles);
}
