# Mobile Design Analysis — Figma node 1:3020 ("Mobile")

> Source: Figma file `8ZOR4PMJK2tTWb6qjxaGMC`, section node `1:3020` ("Mobile"), fetched via REST API.
> Scope: **7 mobile screens** (390px wide canvas): Home, Doctors list, Doctor booking, Guides list, Medicines shop, Checkout, Hospitals directory.
> Desktop section is node `1:884` (separate, not covered here).
> Purpose: single source of truth for mobile implementation. Do not re-analyze Figma; read this file.

---

## 0. Canvas & global shell

- **Frame width:** 390px (all 7 screens). Content is single column, no horizontal scroll.
- **Horizontal padding:** 16px both sides → usable content width **358px**.
- **Vertical rhythm:** sections use 16px gap; section padding usually `24,16,24,16` (top 24, right 16, bottom 24, left 16) or `24,16,32,16`.
- **Header bar:** height 63px, horizontal padding 12/16, vertical 12, `SPACE_BETWEEN` / `CENTER`. White bg (`surface`), 1px bottom border `line`. Contains Logo (left) + WhatsApp button (right). Same on every screen.
- **Bottom nav:** height 70px, padding `8,8,10,8`, `SPACE_BETWEEN`. White bg, 1px top border `line`. 5 tabs: Home, Doctors, Guides, Medicines, Hospitals. Active tab: brand-700 icon bg + brand-700 label + w700; inactive: mint icon bg + ink-3 label + w500.
- **Backgrounds:** page bg white; alternating sections use mint-ish `rgba(238,247,246)` (Why, FAQ, Hospitals header area) and `rgba(244,247,246)` (Hospitals). Emergency strip uses accent-100 `rgba(253,240,213)`.

### Logo
- Mark: 32×32, radius 16, brand-700 bg, white "M" 16px w700.
- "Medizaai": Hind Siliguri 22px w700, brand-900, 91×33.

### WhatsApp button (header)
- 100×37, radius 10, brand-700 bg, padding 8/14. Label "হোয়াটসঅ্যাপ" 14px w600 white.

---

## 1. Design tokens observed (mobile)

| Token | Hex/rgba | Usage |
|---|---|---|
| brand-700 | `#0f766e` rgba(15,118,110) | primary buttons, active nav, stat numbers, links, tag text |
| brand-900 | `#0f4f49` rgba(15,79,73) | headings, hero title, header logo text, button on accent |
| ink | `#12201e` rgba(18,32,30) | body text, card titles |
| ink-2 | `#4e5f5c` rgba(78,95,92) | secondary text, subtitles |
| ink-3 | `#6b7b78` rgba(107,123,120) | placeholders, captions |
| line | `#d8e2e0` rgba(216,226,224) | borders, dividers |
| ph | `#cadfdc` rgba(202,223,220) | medicine image placeholder bg |
| surface | `#ffffff` | cards, inputs, bars |
| mint | `#eef7f6` rgba(238,247,246) | section bg (Why, FAQ, intro cards) |
| accent | `#f0a935` rgba(240,169,53) | stat numbers, accent buttons, selected chips |
| accent-100 | `#fdf0d5` rgba(253,240,213) | hero tag, emergency strip bg |
| brand-100 | `#d9eeeb` rgba(217,238,235) | icon circles, tag bg, inactive nav bg |

Note: section bg uses `rgba(238,247,246)` not exact `mint` (#e8fffd) nor `cream`. Treat as a soft mint surface; use `mint` token or add `mint-soft` if pixel-critical. (Known: add tokens only when needed.)

---

## 2. Typography scale (mobile)

Font: Hind Siliguri throughout.

| Role | Size | Weight | Line-height | Usage |
|---|---|---|---|---|
| Hero title | 32px | 700 | 40 | Home hero H1 |
| Section title | 26px | 700 | 34 | "আমাদের সেবা", "কেন Medizaai?", etc. |
| Card title / name | 20px | 700 | 30 | doctor name, guide name, medicine? |
| Sub-heading | 22px | 700 | 33 | doctor profile name, logo |
| Card name (list) | 18px | 600 | 27 | doctor card name, hospital name |
| Body strong | 17px | 600 | 26 | hospital card name (long), step text |
| Body | 16px | 400/500/600 | 24 | paragraphs, inputs, buttons |
| Caption | 15px | 400/500 | 23 | helper text |
| Small | 14px | 400/500/600/700 | 21 | tags, secondary lines, buttons |
| Tiny | 13px | 400/500 | 20 | nav labels, captions |
| Micro | 12px | 500 | 18 | chips, tags |

Rule: never below 14px for body; 12-13px only for tags/chips/nav.

---

## 3. Reusable components (mobile)

### Button (primary)
- Padding `8,14` (or `13,22` for large), radius 10.
- Primary: brand-700 bg, white text 14/16px w600.
- Accent: accent bg, brand-900 text (cart bar "কার্ট দেখুন").
- Outline: white bg, 1px brand-700 stroke, brand-700 text ("গাইড নিন").
- Sizes: small 37h (header/badges), medium 39-50h (CTAs), large 50h (form submit).

### Card
- White bg, radius 14, 1px `line` stroke, padding 16 (or 20 for forms), vertical layout, gap 10-12.
- Form cards add drop shadow: `rgba(15,79,74,0.12) blur 16 offset(0,6)`.

### Chip / Tag
- Tag (pill): radius 99, padding 3/10, brand-100 bg, brand-700 text 12px w500.
- Chip (selectable): radius 99, padding 7/14, 1px stroke. Active: brand-700 bg + white text; inactive: white bg + ink text + line stroke.
- "ভিডিও কলে পাওয়া যায়": accent-100? Actually bg rgba(225,244,233) (green-soft) text brand-900. Note: not a defined token; closest is brand-100. Use brand-100 or add token.

### Input
- Height 50, radius 10, 1px line stroke, padding 12/14, placeholder ink-3 16px w400.

### Radio option row
- Height 46-50, radius 10, horizontal, gap 10, padding 10/12 or 12/14. Selected: brand-100 bg + brand-700 stroke + brand-700 radio; unselected: white bg + line stroke + line radio.

### Stepper (qty)
- Minus/Plus circles 30×30 radius 15; minus outline brand-700, plus filled brand-700. Value 16px w600.

### Icon circle
- 44×44, radius 14.67 (≈14.7), brand-100 bg, contains 18px ellipse/icon brand-700.

### Avatar/photo
- Doctor photo: 72×72 (list) / 88×88 (profile), radius 36/44 (circle).
- Guide photo: 324×150, radius 12.
- Hospital photo: 64×64 or 72×72, radius 12.
- Medicine image: 151×84, radius 12, bg ph.

### Package row (guide)
- 324×46, radius 10, horizontal SPACE_BETWEEN, padding 10/12. Selected: mint bg + brand-700 stroke; unselected: white + line stroke. Left label 16px w500; right price 16px w700 brand-700.

### Number badge (how-it-works)
- 44×44 circle, brand-700 bg, white number 20px w700.

### Bottom sheet / cart bar
- 74h, brand-900? Actually bg brand-900 rgba(15,79,73), white text. Contains item count + total + accent button.

---

## 4. Screen: Home (`Mobile - Home`, 1:3021, 390×3746)

### Header
As global. (node 1:3022)

### Hero (1:3029) — 390×654
- Background: image fill (FILL) + overlay rectangle with linear gradient brand-900@0 → rgba(15,34,51,0)@1 (top→bottom). Darker overlay for contrast (known issue #2).
- Layout vertical, gap 16, padding 24/16/28/16.
- **Tag** (1:3031): pill radius 99, accent-100 bg, brand-700 text "রাজশাহীর জন্য" 12px w500.
- **Title** (1:3033): "রাজশাহীর সবচেয়ে সহজ স্বাস্থ্যসেবা" 32px w700 white, 358×80 (2 lines).
- **Subtitle** (1:3034): "ভিডিও কলে ডাক্তার, হাসপাতালে গাইড আর ঘরে ওষুধ।" 17px w400, rgba(217,238,235) (brand-100), 358×26.
- **Search bar** (1:3035): 358×49, white bg, radius 12, padding 6/14/6/6 (left 14? actually pad 6,6,6,14 = top6 right6 bottom6 left14). Horizontal, counter center. Placeholder "ডাক্তার বা বিভাগ খুঁজুন" 16px ink-3. Button (1:3037): 58×37, accent bg, radius 10, "খুঁজুন" 14px w600 brand-900. Needs chevron for service selector (known issue #3) — not present in this mobile hero (search is plain input + button).
- **Stats** (1:3039): horizontal gap 12. Three stats 111×53 vertical: number 22px w700 accent + label 13px w400 brand-100.
  - "১৩" / "হাসপাতাল"
  - "২০–৪০" / "মিনিটে ডেলিভারি"
  - "৩" / "গাইড প্যাকেজ"
- **Chat card** (1:3049): 358×290, white bg, radius 16, padding 16, gap 10, vertical.
  - Title "আমাদের সঙ্গে কথা বলুন" 20px w700 brand-900.
  - 3 radio option rows (46h, radius 10, gap 10): "ডাক্তার দেখাতে চাই" (selected, mint bg + brand-700 stroke), "গাইড লাগবে", "ওষুধ অর্ডার করতে চাই".
  - Button (1:3060): 326×50, brand-700 bg, radius 10, "হোয়াটসঅ্যাপে চ্যাট করুন" 16px w600 white.

### Services (1:3062) — 390×390
- Title "আমাদের সেবা" 26px w700 brand-900, 358×34.
- 2×2 grid of cards (row gap 12, card gap 8 vertical). Each card 173×138, white bg, radius 14, 1px line stroke, padding 14, vertical gap 8.
  - Icon circle 44×44 radius 14.67 brand-100 bg with 18px ellipse brand-700.
  - Label 18px w600 ink (e.g. "ডাক্তার").
  - Sub 14px w400 ink-2 (e.g. "ভিডিও কলে", "হাসপাতালে সঙ্গী", "হোম ডেলিভারি", "১৩টির তালিকা").
- Cards: Doctors, Guides, Medicines, Hospitals.

### Why (1:3086) — 390×478
- Section bg mint rgba(238,247,246), padding 24/16.
- Title "কেন Medizaai?" 26px w700 brand-900.
- 4 cards 358×83, white bg, radius 14, 1px line stroke, padding 16, vertical gap 12.
  - Each: horizontal row gap 12, counter center: icon circle 44×44 + text block 268×49 (vertical gap 2).
  - Title 17px w600 ink; desc 14px w400 ink-2.
  - "সহজ বুকিং" / "নাম ও মোবাইল নম্বরেই বুকিং, লগইন ছাড়া।"
  - "ফোনে নিশ্চিতকরণ" / "আমরা ফোন করে সময় ও ফি নিশ্চিত করি।"
  - "দ্রুত ডেলিভারি" / "রাজশাহী শহরে ২০–৪০ মিনিটে।"
  - "হাসপাতালে গাইড" / "গাইড আপনার সঙ্গে হাসপাতালে যাবেন।"

### Doctors (1:3116) — 390×512
- Title "জনপ্রিয় ডাক্তার" 26px w700 brand-900.
- 2 doctor cards (358×199), white bg, radius 14, 1px line stroke, padding 16, vertical gap 12.
  - Top row horizontal gap 14, counter center: photo 72×72 circle + info 238×83 vertical gap 4.
    - Name 18px w600 ink (e.g. "ডা. শুভ আব্দুল্লাহ").
    - Tag "মেডিসিন" 12px w500 brand-700 on brand-100 pill.
    - Tag "ভিডিও কলে পাওয়া যায়" 12px w500 brand-900 on rgba(225,244,233) pill.
  - Qualification line 14px w400 ink-2: "এমবিবিএস, এমসিপিএস · অভিজ্ঞতা: [— বছর]".
  - Fee row horizontal SPACE_BETWEEN counter center: "ফি ৳১০০" 20px w700 brand-700 + button 80×37 brand-700 "বুক করুন" 14px w600 white.

### Hospitals (1:3148) — 390×600
- Section bg rgba(244,247,246), padding 24/16.
- Title "জনপ্রিয় হাসপাতাল" 26px w700 brand-900.
- 3 cards (358×155/160), white bg, radius 14, 1px line stroke, padding 16, vertical gap 10.
  - Row: photo 72×72 radius 12 + text block 240×51/77 vertical gap 4.
    - Name 17px w600 ink (e.g. "রাজশাহী মেডিকেল কলেজ হাসপাতাল" — 2 lines 52h).
    - Location/phone 14px w400 ink-2: "[এলাকা] · [ফোন]".
  - Button 324×39 outline brand-700 "গাইড নিন" 14px w600 brand-700, white bg.

### How it works (1:3174) — 390×262
- Title "কিভাবে কাজ করে" 26px w700 brand-900.
- 3 steps, each 358×44 horizontal gap 14 counter center:
  - Number circle 44×44 brand-700, white number 20px w700 (১, ২, ৩).
  - Text 300×26, 17px w600 ink: "প্রয়োজন বলুন", "আমরা বুকিং করি", "সেবা পান".

### FAQ (1:3188) — 390×373
- Section bg mint, padding 24/16.
- Title "সাধারণ প্রশ্ন" 26px w700 brand-900.
- 3 cards (radius 14, white bg, 1px line stroke, padding 14/16, vertical gap 8).
  - Expanded card (358×117): question row SPACE_BETWEEN: question 16px w600 ink + chevron "∨" 22px w700 brand-700; answer 15px w400 ink-2, 324×46 (2 lines, lh 23).
  - Collapsed cards (358×63): question + "+" 22px w700 brand-700.

### Emergency (1:3203) — 390×79
- accent-100 bg, padding 16, vertical gap 2.
- "জরুরি সেবা ২৪/৭: ৯৯৯" 16px w700 brand-900.
- "কল করুন: ০১XXXXXXXXX" 14px w400 brand-900.

### Footer (1:3206) — 390×265
- brand-900 bg, padding 32/16/24/16, vertical gap 12.
- "Medizaai" 24px w700 white.
- Tagline 16px w400 brand-100.
- Contact lines 16px w400 brand-100: "হোয়াটসঅ্যাপ: +880...", "জরুরি: ৯৯৯", "সকাল ৯টা – রাত ৯টা".
- "শর্তাবলী ও গোপনীয়তা" 14px w400 brand-100.
- "© 2025 Medizaai" 13px w400 brand-100.

### Bottom nav (1:3213)
Global 5 tabs. Active = Home (brand-700). Icons are 20×20 vector sets inside 30×30 circles.

---

## 5. Screen: Doctors list (`Mobile - Doctors`, 1:3252, 390×934)

- Header (1:3253) global.
- Content (1:3260): white bg, vertical gap 16, padding 24/16/32/16.
  - Title "ডাক্তার" 26px w700 brand-900.
  - Subtitle "ভিডিও কলে পাওয়া যায় এমন ডাক্তারদের তালিকা" 16px w400 ink-2.
  - Search input 358×50 (radius 12, line stroke) placeholder "ডাক্তার বা বিভাগ খুঁজুন".
  - Chips (1:3265): horizontal gap 8. Active "সব" brand-700 bg white text; inactive "মেডিসিন", "গাইনি" white bg ink text line stroke. Padding 7/14, radius 99.
  - "২ জন ডাক্তার" 16px w500 ink-2.
  - 2 doctor cards (same component as Home, 358×199).
  - Empty-state-ish card 358×66, white bg, radius 14, line stroke, padding 20, centered: "আরও ডাক্তার শিগগিরই যোগ হবে" 16px w600 ink.
- Bottom nav (1:3305): active = Doctors.

---

## 6. Screen: Doctor booking (`Mobile - Doctor Booking`, 1:3344, 390×1055)

- Header global.
- Content (1:3352): white bg, vertical gap 16, padding 24/16/32/16.
  - Breadcrumb "হোম / ডাক্তার / ডা. শুভ আব্দুল্লাহ" 13px w400 ink-2.
  - Doctor card (1:3354): 358×158, white bg, radius 14, 1px line stroke, padding 16, gap 14 vertical.
    - Top row horizontal gap 14 counter center: photo 88×88 circle + info 222×89 vertical gap 4.
      - Name 22px w700 ink.
      - Tag "মেডিসিন" (brand-100 pill) + "ভিডিও কলে পাওয়া যায়" (green-soft pill).
    - Qualification 14px w400 ink-2.
  - Booking form card (1:3364): 358×656, white bg, radius 14, 1px line stroke, padding 20, gap 12 vertical, drop shadow.
    - Title "ভিডিও কল বুক করুন" 22px w700 brand-900.
    - Fee row (1:3366): 316×30 SPACE_BETWEEN counter center: "ফি" 16px w700 ink + "৳১০০" 20px w700 brand-700.
    - 6 fields, each 316×77 vertical gap 6:
      - "আপনার নাম" / input placeholder "পুরো নাম"
      - "মোবাইল নম্বর" / "01XXXXXXXXX"
      - "পছন্দের তারিখ" / "দিন / মাস / বছর"
      - "পছন্দের সময়" / "যেমন: সন্ধ্যা ৭টা"
      - "নোট (ঐচ্ছিক)" / "সমস্যার সংক্ষিপ্ত বিবরণ"
    - Submit button 316×50 brand-700 "বুকিং নিশ্চিত করুন" 16px w600 white.
    - Helper "আমরা ফোন করে সময় ও ফি নিশ্চিত করব।" 13px w400 ink-3.
- Bottom nav (1:3392): active = Doctors.

---

## 7. Screen: Guides list (`Mobile - Guides`, 1:3431, 390×1914)

- Header global.
- Content (1:3439): white bg, vertical gap 16, padding 24/16/32/16.
  - Title "গাইড" 26px w700 brand-900.
  - Intro card (1:3441): 358×76, mint bg rgba(238,247,246), radius 12, 1px brand-700 stroke, padding 14. Text 15px w400 brand-900: "গাইড আপনার সঙ্গে হাসপাতালে গিয়ে সাহায্য করেন। এটি সরাসরি সঙ্গে যাওয়ার সেবা, ভিডিও কল নয়।"
  - 2 guide cards (358×517), white bg, radius 14, 1px line stroke, padding 16, gap 10 vertical.
    - Photo 324×150 radius 12 (image fill).
    - Name 20px w700 ink (e.g. "মো. আব্দুল্লাহ").
    - Tag "অভিজ্ঞতা ৫ বছর" 12px w500 brand-700 on brand-100 pill.
    - Subtitle 14px w400 ink-2 (e.g. "সব হাসপাতাল, সব ধরনের বিশেষজ্ঞ ডাক্তার").
    - 3 package rows (324×46, radius 10, horizontal SPACE_BETWEEN, padding 10/12):
      - "নরমাল" / "৳২৫০" (selected: mint bg + brand-700 stroke)
      - "এক্সট্রা" / "৳৫০০"
      - "প্রিমিয়াম" / "৳১০২০"
      - Price 16px w700 brand-700.
    - Button 324×50 brand-700 "বুক করুন" 16px w600 white.
  - Second guide: "দীপা দাস" — packages ৳৩০০/৳৭৫০/৳১২২০.
  - Third guide: "আব্দুল বাসিদ তোহা" — packages ৳২৫০/৳৫০০/৳১০২০.
- Bottom nav (1:3494): active = Guides.

---

## 8. Screen: Medicines shop (`Mobile - Medicines`, 1:3533, 390×1263)

- Header global.
- Content (1:3541): white bg, vertical gap 16, padding 24/16/16/16.
  - Title "ওষুধ" 26px w700 brand-900.
  - Info card (1:3543): 358×70, mint bg, radius 12, padding 12. "ডেলিভারি ৳৩০ · সর্বনিম্ন অর্ডার ৳১০০" 15px w500 brand-900; "২০–৪০ মিনিট · ক্যাশ অন ডেলিভারি" 14px w400 ink-2.
  - Search input 358×50 placeholder "ওষুধ খুঁজুন".
  - Chips (1:3548): "সব"(active), "জ্বর", "গ্যাস্ট্রিক", "অ্যালার্জি".
  - Product rows: 2 cards per row (horizontal gap 12), each card 173×243, white bg, radius 14, 1px line stroke, padding 10, vertical gap 6.
    - Image 151×84 radius 12, bg ph (placeholder).
    - Name 15px w600 ink (e.g. "Paracetamol 500mg", "ORS", "Omeprazole 20mg", "Cetirizine 10mg", "Zinc", "Mupirocin ointment").
    - Price 14px w700 brand-700 (e.g. "৳২ / ট্যাবলেট", "৳১০ / স্যাশে", "৳৪ / ক্যাপসুল", "৳২ / ট্যাবলেট", "৳৪ / ট্যাবলেট", "৳১১৫ / টিউব").
    - Stepper 151×30 SPACE_BETWEEN: minus circle outline + value 16px w600 + plus circle filled.
    - Button 151×39 outline brand-700 "যোগ করুন" 14px w600 brand-700.
- Cart bar (1:3638): 390×74, brand-900 bg, padding 12/16, horizontal SPACE_BETWEEN counter center.
  - Left: "৪টি আইটেম" 13px w400 brand-100 + "৳১৫০" 20px w700 white.
  - Right: button 107×50 accent bg radius 10 "কার্ট দেখুন" 16px w600 brand-900.
- Bottom nav (1:3644): active = Medicines.

---

## 9. Screen: Checkout (`Mobile - Checkout`, 1:3683, 390×1216)

- Header global.
- Content (1:3691): white bg, vertical gap 16, padding 24/16.
  - Title "চেকআউট" 26px w700 brand-900.
  - Order summary card (1:3693): 358×276, white bg, radius 14, 1px line stroke, padding 16, gap 10.
    - "অর্ডারের সারাংশ" 18px w700 ink.
    - Lines (324×24, SPACE_BETWEEN): "Paracetamol × ১০" 16px w400 ink-2 / "৳২০" 16px w500 ink; "ORS × ৫"/"৳৫০"; "Omeprazole × ১০"/"৳৪০"; "Zinc × ১০"/"৳৪০".
    - Divider 324×1 brand-100-ish line rgba(216,226,224).
    - "ওষুধের মোট" / "৳১৫০"; "ডেলিভারি চার্জ" / "৳৩০".
  - Delivery info card (1:3714): 358×506, white bg, radius 14, 1px line stroke, padding 16, gap 12.
    - "ডেলিভারি তথ্য" 18px w700 ink.
    - 5 fields (324×77): name, mobile, area, street, house — same input component.
  - Payment card (1:3736): 358×121, white bg, radius 14, 1px line stroke, padding 16, gap 10.
    - "পেমেন্ট" 18px w700 ink.
    - Radio option (selected): "ক্যাশ অন ডেলিভারি" 16px w500 ink, mint bg + brand-700 stroke.
- Order bar (1:3741): 390×120, white bg, 1px top line stroke, padding 12/16/16/16, vertical gap 10.
  - Row SPACE_BETWEEN counter center: "সর্বমোট" 16px w700 ink + "৳১৮০" 20px w700 brand-700.
  - Button 356×50 brand-700 "অর্ডার নিশ্চিত করুন" 16px w600 white.
- No bottom nav on checkout (order bar replaces it).

---

## 10. Screen: Hospitals (`Mobile - Hospitals`, 1:3747, 390×1370)

- Header global.
- Content (1:3755): white bg, vertical gap 16, padding 24/16/32/16.
  - Title "হাসপাতাল ও ডায়াগনস্টিক" 26px w700 brand-900.
  - Subtitle "রাজশাহীর ১৩টি সেন্টার" 16px w400 ink-2.
  - Search input 358×50 placeholder "নাম, এলাকা বা ধরন".
  - Chips: "সব"(active), "হাসপাতাল", "ডায়াগনস্টিক".
  - Hospital cards (358×147/157), white bg, radius 14, 1px line stroke, padding 16, gap 10.
    - Row: photo 64×64 radius 12 + text 248×48/74 vertical gap 2.
      - Name 17px w600 ink (e.g. "রামেক", "ইসলামী ব্যাংক মেডিকেল কলেজ হাসপাতাল", "বরেন্দ্র মেডিকেল কলেজ হাসপাতাল", "রাজশাহী জেনারেল হাসপাতাল", "ল্যাব এইড", "ইবনে সিনা ডায়াগনস্টিক").
      - "[এলাকা] · [ফোন]" 13px w400 ink-2.
    - Row SPACE_BETWEEN counter center: tag pill ("হাসপাতাল" brand-100 / "ডায়াগনস্টিক" brand-100) + outline button "গাইড নিন" 82×39 brand-700.
- Bottom nav (1:3833): active = Hospitals.

---

## 11. Implementation notes

1. **Widths:** design canvas 390px; use `max-w-[390px]`? No — mobile-first responsive; content padding 16px, max content 390. On larger screens center the column or switch to desktop layout (node 1:884). For mobile pass, cap at 390 and center.
2. **Stroke weights:** all strokes are 1px (line token). Stroke weight not specified in JSON (default 1).
3. **Image fills:** every photo is an IMAGE fill with scaleMode FILL → use `next/image` with `fill` + `object-cover`. Placeholders under `public/images/...`.
4. **Icon sets:** header/bottom-nav icons are vector groups (e.g. home-05, doctor-01). Use lucide-react equivalents or export SVGs. Keep 20×20 inside 30×30 circle.
5. **Bangla digits:** all numbers in design are already Bangla (১৩, ২০–৪০, ৳১০০). Use `toBn()` / `formatPrice()`.
6. **Known issues to fix in code** (from CLAUDE.md):
   - Hero image surgery scene → friendly placeholder.
   - Hero stats & search need stronger contrast → darker gradient overlay (already gradient brand-900→transparent).
   - Search service selector must look like dropdown (chevron) — mobile hero has no selector; desktop may.
   - Card sub-text ≥ 14px (design uses 14px min for body; tags 12-13px OK).
   - Doctor cards need rating + BMDC badge room (design has tags only; add slots).
   - "Choose your need" vs "Try now" consistency — share one data source.
   - Carousels need visible larger arrows on desktop.
7. **Missing mobile screens** (not in node 1:3020): Cart, Booking success, Account/bookings, About, Contact/FAQ (full), Privacy, Login/OTP, Guide profile booking (detail). These may be in Desktop section or not yet designed for mobile. Check Desktop section 1:884 or ask.
8. **Tokens to consider adding:** green-soft pill bg `rgba(225,244,233)` used for "ভিডিও কলে পাওয়া যায়" tag and selected package? Actually selected package uses mint. Add `brand-50`/`green-soft` if pixel-critical. Ask before adding.

---

## 12. Quick reference: node IDs

| Screen | Node ID | Size |
|---|---|---|
| Mobile (section) | 1:3020 | 4117×4058 |
| Home | 1:3021 | 390×3746 |
| Doctors list | 1:3252 | 390×934 |
| Doctor booking | 1:3344 | 390×1055 |
| Guides list | 1:3431 | 390×1914 |
| Medicines shop | 1:3533 | 390×1263 |
| Checkout | 1:3683 | 390×1216 |
| Hospitals | 1:3747 | 390×1370 |

Desktop section: 1:884 (not analyzed).
