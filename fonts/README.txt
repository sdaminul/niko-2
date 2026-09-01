HaatBazar — /fonts
==================

The UI uses two typefaces:

1. Inter               → body, UI, tables, forms (400 / 500 / 600 / 700)
2. Plus Jakarta Sans   → headings, prices, display numbers (700 / 800)

Right now both are loaded from the Google Fonts CDN inside each HTML <head>:

  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">

To self-host (recommended for production in Bangladesh — faster on 3G/4G):

  1. Download the families, then place these files here:
       inter-regular.woff2   inter-regular.woff   inter-regular.ttf   inter-regular.eot
       inter-medium.woff2    inter-medium.woff
       inter-semibold.woff2  inter-semibold.woff
       inter-bold.woff2      inter-bold.woff
       jakarta-bold.woff2    jakarta-bold.woff
       jakarta-extrabold.woff2  jakarta-extrabold.woff
  2. Un-comment the @font-face blocks in /css/fonts.css
  3. Remove the Google Fonts <link> tags from the HTML files.

Icon set: all icons in this design are inline SVG (Lucide-style, 1.75–2px
stroke), so no icon font file is required.
