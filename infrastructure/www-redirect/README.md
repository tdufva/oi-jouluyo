# www.ohelga.blog redirects

The calendar and podcast archive are hosted on **GitHub Pages at https://ohelga.blog/**. The separate `www` hostname uses a small Sites Worker to preserve the legacy podcast feed while redirecting website visitors to the calendar.

| Incoming URL | HTTP 301 destination |
| --- | --- |
| `https://www.ohelga.blog/` | `https://ohelga.blog/` |
| `https://www.ohelga.blog/?luukku=12&lang=sv` | Same path and query on `https://ohelga.blog` |
| `https://www.ohelga.blog/avsnitt/` | `https://ohelga.blog/avsnitt/` |
| `https://www.ohelga.blog/avsnitt?format=rss` | RedCircle RSS feed |
| `https://www.ohelga.blog/avsnitt/?format=rss` | RedCircle RSS feed |

The RSS destination is `https://feeds.redcircle.com/84f56904-c061-4877-be4c-c527ec8fa5a5`. The route also accepts the older `format=atom` variant. All other paths and query parameters are retained, including old episode links and shared calendar doors. GET and HEAD behave identically.

This is a redirect service, with no database, uploads, scheduled jobs or external API credentials. Its public audience is necessary for website visitors and podcast applications. Do not make it private or remove its custom hostname while the old RSS address is in use.

## Hosting identity

- Sites project: `appgprj_6b0598057b4c819185b8f1693eaa53ef`
- Published origin: `https://ohelga-www-redirect.tomidufva.chatgpt.site`
- Custom domain: `appgdom_6b059e0c7a70819188fffeea7ac39704`
- Source checkout: `.migration/www-redirect/` (separate Sites source repository, excluded from this GitHub repository).

`worker.mjs` and `test.mjs` in this directory are reviewable copies of the implementation. To change the deployed service, edit `worker/index.js` in the Sites checkout, use the Sites source/build/publishing workflow, and update these copies.

## Hover DNS

`www` is a CNAME to `custom-domains.chatgpt.site`. Keep the `_openai-site-verification.www` and `_cf-custom-hostname.www` TXT records returned by Sites. The four apex A records remain GitHub Pages addresses. Hover mail records are independent of this service.

The old RSS URL remains available through this service. This avoids depending on Squarespace to keep the HTTP redirect running after the website has moved.

## Checks

```sh
node infrastructure/www-redirect/test.mjs
curl -I https://www.ohelga.blog/
curl -I 'https://www.ohelga.blog/avsnitt?format=rss'
curl -I 'https://www.ohelga.blog/?luukku=12&lang=sv'
```

The first and third requests should redirect to the corresponding calendar URLs; the second should redirect directly to the RedCircle feed. Check TLS without disabling certificate verification. The managed hosting applies upstream bot filtering: the stock Python-urllib user agent received Cloudflare 403/1010, while curl and explicitly identified podcast/monitoring clients returned the expected redirects. This filtering happens before the Worker. Browser requests and simulated AppleCoreMedia, Pocket Casts and Overcast requests were checked; following the old RSS URL reached all 77 RedCircle episodes.

If rollback is needed, the previous `www` CNAME was `ext-cust.squarespace.com`. Restoring it requires the original Squarespace site and podcast redirect setting to remain active.
