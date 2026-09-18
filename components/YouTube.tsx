"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { youtubeId } from "@/lib/format";

type Props = {
  url: string;
  title?: string;
  caption?: string;
  /** Stamp the print EXAMPLE (placeholder content the owner will replace). */
  example?: boolean;
};

/**
 * A video print. Shows the video's own thumbnail as a pasted print with a play
 * stamp; the YouTube player (privacy-enhanced domain) loads only on click.
 */
export function YouTube({ url, title = "Project video", caption, example = false }: Props) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState<"maxres" | "hq">("maxres");
  const id = youtubeId(url);

  if (!id) {
    return (
      <p className="empty">
        The video link <b>{url}</b> is not a YouTube link the site can embed. Paste the normal watch link in the admin panel.
      </p>
    );
  }

  return (
    <figure>
      <div className="print-frame">
        <span className="tape tl" aria-hidden="true" />
        <div className="video">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button type="button" className="video-facade" onClick={() => setPlaying(true)} aria-label={`Play: ${title}`}>
              {/* Example content shows an authored still in the world's ink; real links show the video's own thumbnail. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  example
                    ? "/placeholders/video.svg"
                    : `https://i.ytimg.com/vi/${id}/${thumb === "maxres" ? "maxresdefault" : "hqdefault"}.jpg`
                }
                alt=""
                loading="lazy"
                width={example || thumb === "maxres" ? 1280 : 480}
                height={example || thumb === "maxres" ? 720 : 360}
                onLoad={(e) => {
                  // YouTube answers a 120×90 grey card when a video has no maxres thumbnail.
                  if (thumb === "maxres" && e.currentTarget.naturalWidth < 200) setThumb("hq");
                }}
                onError={() => setThumb("hq")}
              />
              <span className="video-play">
                <Play aria-hidden="true" />
                Play
              </span>
            </button>
          )}
        </div>
        <span className="tape br" aria-hidden="true" />
      </div>
      {caption || example ? (
        <figcaption className="print-meta mt-4">
          {caption ? <span>{caption}</span> : null}
          {example ? <span className="stamp example">Example video</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
