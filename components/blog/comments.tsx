"use client";

import Giscus from "@giscus/react";

export function Comments() {
  return (
    <div id="comments" className="mt-12 pt-8 border-t border-border/30 scroll-mt-24">
      <h3 className="text-xl font-semibold mb-6 gradient-text">Comments</h3>
      <div className="giscus-wrapper">
        <Giscus
          repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
          repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
          category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
          categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="transparent_dark"
          lang="en"
          loading="lazy"
        />
      </div>
    </div>
  );
}
