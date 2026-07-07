# Chapter Data Audit — `src/data/subjects.js`

Flag-only. **No data was changed.** Every item below is provable from the source; none can be
auto-fixed safely because I can't watch the videos to confirm the title↔video mapping. Decide
per item, then I'll apply.

## 1. Non-contiguous chapter numbers (likely unpublished, confirm intent)
| Subject | Present `n` | Missing |
|---|---|---|
| Physics | 1,2,3,4,5,7,8,9,10,12,13 | **6, 11** |
| Biology | 1,2,3,4,5,6,7,8,11,12,13,14 | **9, 10** |
| Chemistry | 1–11 | — ok |
| General Math | 1–15 | — ok |
| ICT | 1–6 | — ok |
| Higher Math | 1–12 | — ok |

The gaps aren't bugs in themselves (the SPA keys by `n`, so holes are fine), but the sidebar shows
`07 … 08` etc. with jumps. Options: (a) leave as-is, (b) add the missing chapters, (c) renumber
contiguous — (c) is risky, it re-labels every deep link `#/physics/12` → `#/physics/11`.

## 2. English-gloss convention is inconsistent
Only **math** titles carry English in parentheses; every other subject is Bengali-only.
And even within math it's not uniform:
- `math` ch10 `বীজগাণিতিক অনুপাত ও সমানুপাত` — **no** English gloss (the lone exception in math).
- Recommendation: pick one rule for the whole site — either add glosses everywhere or drop them
  from math — so titles read consistently.

## 3. Contradictory / suspect labels (highest priority)
- **`math` ch11** — `দুই চলকবিশিষ্ট সরলরেখা (Calculator Hacks)`. The Bengali means "straight line in
  two variables"; the English gloss "Calculator Hacks" is unrelated. One of the two is wrong, or the
  gloss is a leftover marketing tag. The `desc` mentions both, so the underlying video is ambiguous.
- **`hmath` ch12** — `কম্পাঙ্ক বিভাজক` ("frequency divider"). Not a standard SSC Higher-Math chapter
  name; likely a mistitle (e.g. a statistics/quartile topic). Verify against the video.
- **`biology` ch4** — `প্রাণীর শ্রেণিবিন্যাস` (Animal Classification) sits before ch5
  `টিস্যু ও টিস্যুতন্ত্র`; this ordering is non-standard for SSC Biology. Not necessarily wrong (custom
  coaching order), but flag to confirm the video matches.

## 4. Data-shape inconsistency (cosmetic, already handled by `getClasses()`)
Three chapter shapes coexist: `classes:[…]` (multi-class), `video`+`list` (single), and
`video`+`practice:{…}`. `getClasses()` normalizes all three, so nothing breaks — but standardizing on
one shape would make the data easier to maintain. No action needed unless you want uniformity.

## 5. Minor
- `physics` ch1 has `list:null` while its siblings carry a playlist id — intentional? (single video).
- Subject-level `playlist` is set for physics/chemistry/math/hmath but `null` for biology/ict, even
  though their chapters have `list` ids. The field appears unused by the app; safe to drop or fill.

---
Tell me which items to apply (e.g. "fix 3 + normalize 2") and I'll edit `subjects.js` accordingly.
