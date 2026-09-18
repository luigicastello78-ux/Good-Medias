import { DateTime } from "luxon";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.ignores.add("admin/index.html"); // copied verbatim, not templated
  eleventyConfig.addPassthroughCopy("llms.txt");

  // Sep 8, 2026
  eleventyConfig.addFilter("readableDate", (value) =>
    DateTime.fromJSDate(new Date(value), { zone: "utc" }).toFormat("LLL d, yyyy")
  );
  // 2026-09-08, for <time datetime> and schema.org
  eleventyConfig.addFilter("isoDate", (value) =>
    DateTime.fromJSDate(new Date(value), { zone: "utc" }).toFormat("yyyy-LL-dd")
  );
  eleventyConfig.addFilter("slice_first", (arr, n) => (arr || []).slice(0, n));

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("content/posts/*.md").sort((a, b) => a.date - b.date)
  );

  return {
    dir: { input: ".", output: "_site", includes: "_includes", data: "_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
