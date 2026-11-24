# O, helga blog. migration

The new calendar is the home page at https://ohelga.blog/. The earlier podcast is a static archive at `avsnitt/`, with 77 episode pages at their original URL paths. Archive navigation, search and filters support Finnish and Swedish; the original episode texts retain their original languages.

## Imported material

- 2022: 25 episodes, including the introduction.
- 2023: 26 episodes, including the two introductions.
- 2024: one introduction. Its description says the rest of that year's calendar moved to Instagram; those posts are not in the website export or RSS.
- 2025: 25 episodes, including the introduction.
- About, ranking, subscription and quiz pages. The quiz remains an external link.
- 107 approved public comments. Email addresses and IP addresses from the export are excluded.
- 136 image files, including cover art and the export's image attachments. Small card thumbnails avoid loading the original illustrations in the episode list.

Four unpublished drafts are excluded from the public site and preserved in the private source export. The old home page's repeated calendar layout is replaced by the searchable archive.

The original XML, RSS and all 77 M4A audio files are backed up in `.migration/ohelga/`, which is ignored by Git. `backup-manifest.json` records the downloaded byte counts and SHA-256 checksums. The audio totals 698,842,565 bytes. Do not upload this private directory to the public repository.

## Audio and podcast subscriptions

All **77 episodes were imported into RedCircle on 24 November 2026**, with their original GUIDs preserved. All 77 audio URLs and all 78 show/episode artwork URLs use RedCircle servers. The new public feed is:

`https://feeds.redcircle.com/84f56904-c061-4877-be4c-c527ec8fa5a5`

The original feed is:

`https://www.ohelga.blog/avsnitt?format=rss`

The archive now plays RedCircle audio and links to the RedCircle RSS feed. The original M4A files remain backed up locally. Three sample RedCircle audio files returned HTTP 206 with valid MP3 data.

After the RedCircle import, download its new RSS as `.migration/ohelga/redcircle-feed.xml`, then regenerate the archive:

```sh
python3 scripts/migrate-squarespace.py \
  --export .migration/ohelga/squarespace-export.xml \
  --feed .migration/ohelga/original-feed.xml \
  --host-feed .migration/ohelga/redcircle-feed.xml \
  --host-feed-url 'THE_ACTUAL_REDCIRCLE_RSS_URL'
python3 scripts/check-archive.py
```

The importer refuses a replacement feed that is missing any original episode GUID or HTTPS audio URL. Check cover images, episode counts and playback before proceeding. Existing Apple Podcasts listing: `https://podcasts.apple.com/podcast/id1655826352`.

The original feed now returns an **HTTP 301** redirect to RedCircle. This was saved in the O, helga blog. site's **Avsnitt → Blog Settings → Feeds → Podcasting → Change Feed → Moving from Squarespace** setting. RedCircle's Verify Redirect step reported success. The new feed contains the `itunes:new-feed-url` tag and all 77 original GUIDs. Apple Podcasts and other directories will adopt the new URL as they refresh. Do not submit a duplicate show.

Keep that redirect working for at least 30 days, **through 24 December 2026**. Do not cancel Squarespace before the audio, cover art and feed migration are complete.

## Hover domain configuration

Hover manages DNS as well as registration. Before migration the website used four apex A records (`198.185.159.144`, `198.185.159.145`, `198.49.23.144`, `198.49.23.145`) and `www` CNAME `ext-cust.squarespace.com`.

On 24 November 2026 the apex A records were changed to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; the eventual `www` CNAME is `tdufva.github.io`. The repository's custom domain must be configured before pointing DNS at GitHub, and HTTPS must be checked afterwards.

The MX record and `mail` CNAME belong to Hover email and must be retained.

`ohelga.blog` now points to GitHub Pages while `www.ohelga.blog` continues serving Squarespace and its podcast redirect. Move `www` after the feed migration window, unless an HTTP redirect service has first been put in place for the original feed address.

GitHub Pages cannot distinguish `/avsnitt?format=rss` from `/avsnitt` using its static routing. Consequently, simply moving `www` to GitHub would return HTML to subscribers using the original RSS address. DNS records cannot provide that HTTP redirect.

## Recreating the import

```sh
python3 scripts/migrate-squarespace.py \
  --export '/path/to/Squarespace-Wordpress-Export.xml' \
  --feed '/path/to/original-feed.xml' \
  --download-images --backup-audio
python3 scripts/check-archive.py
```

Downloads are atomic and resumable. The importer makes three transfers concurrently, strips Squarespace scripts and layout code, and allows only the intended music/video providers. Embedded players load after an explicit click; audio uses `preload="none"`. Episode dates are shown in Finnish time, and durations come from the backed-up audio container metadata when available.

Sources: [RedCircle Core](https://support.redcircle.com/articles/7581935770-redcircle-account-plans), [RedCircle migration](https://support.redcircle.com/articles/2692025797-redcircle-migration-guide), [Squarespace podcast migration](https://support.squarespace.com/hc/en-us/articles/115002267147-Transferring-a-podcast), [Apple RSS migration](https://podcasters.apple.com/support/837-change-the-rss-feed-url), [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
