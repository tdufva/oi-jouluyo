# O, helga blog. migration

The new calendar remains the home page. The earlier podcast is a static archive at `avsnitt/`, with 77 episode pages at their original URL paths. Archive navigation, search and filters support Finnish and Swedish; the original episode texts retain their original languages.

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

The selected destination is **RedCircle's free Core plan**. Import the existing show rather than creating a second show:

`https://www.ohelga.blog/avsnitt?format=rss`

Until that import has completed and been checked, the archive plays the existing Squarespace audio and links to the existing RSS feed. The local audio backup is not a public audio host.

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

In Squarespace's blog settings, use **Feeds → Podcasting → Change Feed → Moving from Squarespace** to point the original RSS feed to the verified RedCircle feed. Verify the old URL returns an HTTP 301 redirect and the new feed contains every episode with its original GUID. Check the existing Apple Podcasts listing has adopted the new feed; do not submit a duplicate show.

Keep that redirect working for at least four weeks, as required by Apple's migration guidance. Do not cancel Squarespace before the audio, cover art and feed migration are complete.

## Hover domain configuration

Hover currently manages DNS as well as registration. The existing website records are four apex A records (`198.185.159.144`, `198.185.159.145`, `198.49.23.144`, `198.49.23.145`) and `www` CNAME `ext-cust.squarespace.com`.

For GitHub Pages the apex A records become `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; the eventual `www` CNAME is `tdufva.github.io`. The repository's custom domain must be configured before pointing DNS at GitHub, and HTTPS must be checked afterwards.

The MX record and `mail` CNAME belong to Hover email and must be retained.

For a staged move, `ohelga.blog` can serve the new site while `www.ohelga.blog` continues serving Squarespace and its podcast redirect. Move `www` after the feed migration window, unless an HTTP redirect service has first been put in place for the original feed address.

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
