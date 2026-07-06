# Master Brief — Emilie El Chidiac Portfolio Rebrand

> **How to use this file:** This is a self-contained brief. Paste it (or point to it) at the start of a fresh Claude session to kick off the redesign. It encodes the full context, the brand strategy, the project inventory, the design concept, the work streams, the orchestration strategy, and what still needs to be gathered. It was produced in a dedicated discovery session that read Emilie's CV, all 14 of her MaCAD projects (IAAC submission sheet), her two solo blog posts in full, and her LinkedIn.

---

## 0. Your role & how to run this project (orchestration)

You are the **orchestrator** of a multi-session personal rebrand. Optimize for **precision, efficiency, and pressure-tested decisions** — not speed alone.

- **Model:** Run the orchestration on **Fable (`claude-fable-5`)**. Spawn **subagents** for parallel, well-scoped work (asset gathering, per-project write-ups, component builds, research) and heavier build/reasoning tasks. Use `Explore` subagents for read-only sweeps; `general-purpose`/`Plan` for design and build planning. Launch independent subagents **in parallel** (one message, multiple tool calls).
- **Read-only first.** Explore and confirm before editing. Never overwrite Emilie's `old material/` or the current `index.html` until a replacement is approved — branch first.
- **Pressure-test before committing** to any big directional or design decision.

### Skills playbook — which to use, when
- **`artifact-design`** — load BEFORE building any HTML/visual artifact or the design system; calibrates design investment. Mandatory first step for any UI work.
- **`web-artifacts-builder`** — for the actual multi-component front-end build (React + Tailwind + shadcn/ui, state, routing). This site is complex enough to warrant it.
- **`design:design-system`** — to define/audit tokens (color, type, spacing), component variants, and naming before/while building.
- **`design:design-critique`** — after each major screen/mockup, for structured feedback on hierarchy, usability, consistency.
- **`design:ux-copy`** — for microcopy, CTAs, empty states, nav labels, the mode-toggle labels.
- **`design:accessibility-review`** — WCAG AA pass on the editorial mode before "done" (the 3D mode needs a legible fallback).
- **`llm-council`** — to **pressure-test** the big forks: brand spine wording, EXPLORE-vs-READ concept, hero-project selection, LinkedIn headline options. Use it as the adversarial check.
- **`deep-research`** — for external inputs: European design-technology / computational-design R&D firms and their hiring signals — **prioritize firms with a strong international hiring record**; neuroarchitecture references; portfolio benchmarks (studios she admires); WebGL/orb-network technique references.
- **`canvas-design`** — for static brand assets (favicon, OG/social share image, CV PDF layout, LinkedIn banner).
- **`docx` / `pdf`** — for regenerating the downloadable CV and reading the old portfolio PDF.
- **`verify` / `run`** — to launch the built site and confirm it works on desktop + mobile before deploy.

### Definition of good process
Explore → **pressure-test the plan (`llm-council`)** → design system (`artifact-design` + `design:design-system`) → build in parallel subagents (`web-artifacts-builder`) → critique (`design:design-critique`) → a11y + verify → deploy. Keep Emilie in the loop at each phase boundary.

---

## 1. Who Emilie is (positioning)

**Emilie El Chidiac** — architect turned computational / design-technology specialist. B.Arch (Lebanese American University, Dean's list, GPA 3.7; Biennale Arte 2024 featured). Real professional depth across Dubai/Kuwait/Beirut (SOMA, Dynamic Solution Co., BIM International, LAU XR Lab, Jemma Chidiac Architects). Now completing **Year 1 (the technical year) of the Master in Advanced Computation for Architecture and Design (MaCAD) at IAAC, Barcelona**. Year 2 is her **thesis**.

**Title / anchor:** **Design Technology Architect** (a real, industry-recognized role — Foster+Partners, BIG, Zaha CODE, Grimshaw all have such teams). Keep this as the anchor; sharpen the sub-line toward her niche.

**Audience priority (design for #1 first):**
1. **European firms with R&D / computational / design-technology teams** — hiring managers & design-technology leads. *Primary, now.*
2. **Academic / PhD** — served by a strong research/writing presence (she's open to a PhD, possibly alongside a job).
3. **Consultancy clients + a long-term personal platform** — light hooks now, room to grow.

**Goals:** Land an R&D role in Europe; keep a door open to a PhD; surface consultancy capability; and — long term — own this space as her professional + lightly-personal home ("what I'm up to, what I'm interested in, who I am").

**Confidence directive:** Shift all copy from *"I'm learning / I will"* to *"I build / I design / I research."* She has the receipts; the writing should know it.

---

## 2. The brand spine (the through-line)

Reading all 14 projects surfaced one coherent identity — use it as the backbone of the whole site and the thesis narrative:

> **"Behavior Information Modeling" — design technology that makes buildings responsive to the human mind.**

Evidence it's real and defensible:
- **NeuroSpace** (solo) — a working browser tool that reframes BIM as *Behavior* Information Modeling, scoring how architecture affects cortisol/circadian/cognitive load.
- **Optimizing for the Mind** — her MaCAD Theory Podcast interview with **Dr. Cleo Valentine** (architectural neuroimmunology, HKS/Cambridge/UCL-RISE), where the "Behavior Information Modeling" reframe originated.
- **Sensi** (award-winning flagship) — a multisensory comfort **copilot**.
- Plus her stated love of **neuroarchitecture**.

This spine simultaneously serves the R&D job (proves computational depth), the PhD door (a genuine research thesis), and her personality (she cares about people, not just geometry). Confirm the exact public phrasing with Emilie, but this is the spine.

---

## 3. Voice & tone (canonical — match this everywhere)

Her writing voice is consistent across blogs and LinkedIn and is a real asset. Principles, distilled from her own words:

- **Open with a hook or a thought experiment**, not a thesis statement. ("What if your building could think about you?"; "We taught a floor plan to tell you how it feels.")
- **Radically honest**, including failure. ("…and how I almost failed"; "Is it perfect? Not even close.") She shows the "epic fails" and "spaghetti code."
- **Funny, warm, human.** ("I wanted to hug it. Literally."; "if your building could think about you, it would probably appreciate a few more plants.")
- **Technically fearless but legible** — she'll name Kangaroo, Dendro voxelization, Rhino.Compute, Pinia, WASM in one breath and then explain *why it matters* to a non-expert.
- **Ends on an invitation / forward look**, not a full stop. ("I'm just waiting for someone to hand me the air pump.")
- Light emoji use in social contexts; em-dashes and rhetorical asides in prose.

**Do not sand this down into corporate voice.** The mix of rigor + play *is* the brand. (Keep a slightly more restrained register on the top-level positioning lines; let it loose in the blog/EXPLORE mode.)

---

## 4. The design concept (approved with Emilie)

**A two-mode portfolio — the toggle itself is the statement:** "I can make the expressive/experimental *and* the rigorous/legible, and I know when each fits." This is a Design Technology Architect in one interaction, and it replaces the old site's throwaway "red mode" gimmick with something meaningful.

- **EXPLORE mode** — a **3D network of orbs**: projects **and** thoughts as connected nodes you fly into, linked by shared themes (AI, geometry, XR, neuro, research). This *is* a portfolio piece — it demonstrates WebGL / creative-coding / spatial-computational skill to exactly the R&D audience. NB: Sensi's "relationship galaxy" already prototypes this interaction — reuse that DNA.
- **READ mode** — a clean **editorial** view: fast, scannable, mobile-first, recruiter- and skim-friendly. For the hiring manager with 90 seconds.

**Personality (approved: "a real glimpse"):** a blog/lab (neuroarchitecture, books, films, process logs, half-formed research), humor in the copy, and a **"Now"** page. Personality is a feature, not a risk.

---

## 5. Information architecture

- **Home** — mode toggle, positioning line, hero. Establishes the spine in 5 seconds.
- **Work** — curated projects, filterable by three lenses (below).
- **Writing / "Lab"** — the blog. Keeps the site alive between milestones; showcases the research brain. High priority, not an afterthought. Seed it with her existing IAAC blog posts + podcast.
- **About** — the pivot story, photo, skills, a line on **consultancy availability**.
- **CV** — web version + downloadable PDF, kept in sync with the print CV.
- **Contact.**
- **Now** — "what I'm up to" (thesis, reading, current experiments).

### The three project lenses (organize by what work *proves*, not by era)
- **Computation & Research** — the headline. MaCAD studios, NeuroSpace, thesis research, Graph ML, data/AI.
- **Design & Practice** — a *curated few* professional projects, each **reframed through its computational/technical angle** (see §6).
- **Explorations** — small, sharp, fun: competitions, XR, 3D printing, generative-AI experiments, workshops.

---

## 6. Project inventory & curation

### MaCAD projects (2025–26) — all confirmed present in the IAAC submission sheet
Recurring studio team: **Charles Abi Chahine, Lakzhmy Zaro, María Sánchez Domínguez**. Solo work is flagged.

| Project | Course | Type | Essence | Award | Docs |
|---|---|---|---|---|---|
| **Sensi** ⭐ | AIA Studio | Group (Emilie ~85%) | Multisensory comfort **copilot**; 3D "relationship galaxy" | 🏆 **MaCAD Awards 2026 "Design Copilots" — only trophy of her year** | GitHub + blog |
| **NeuroSpace** ⭐ | Cloud Data Mgmt | **SOLO** | Browser tool: BIM → *Behavior* Information Modeling; Rhino.Compute + Vue/Three.js | — | GitHub + blog |
| **The Huddle** | ACESD Studio | Group | Wind-adaptive research hub, Patagonia; WASP + Kangaroo, ETFE, timber | 🏆 studio award | blog |
| **The Lungs: Building the Nervous System** | BIMSC Studio | Group | Hyperbuilding studio turned into a **web app** | 🏆 studio award | blog |
| **IEgoarCh (LegoArch)** | AIA Generative AI | Group (w/ Charles) | Text/image → buildable LEGO set; "AI imagines it, code makes it buildable" | 🏆 jury award | GitHub + blog |
| **A Ballooning Market** | Complex Forming | **SOLO** | Pneumatic "parasitism," Bab al-Luq Cairo; Kangaroo; RGB→CMY light | — | blog |
| **Optimizing for the Mind** | BIMSC Theory | Group (w/ Charles) | Podcast interview w/ Dr. Cleo Valentine; GenAI + game engines in BIM | — | blog + Spotify |
| **Analyzing Narkomfin Through Its Graph** | AIA Graph ML | Group | Graph ML on a Constructivist icon | — | GitHub + blog |
| **Cappelletti Pavilion** | Structural Optimization | Group | "Scales a pasta formula into architecture"; Python + GH form-finding | — | blog |
| **Encoding Urban Risk** | AIA Data Encoding | Group | Data-science spatial risk analysis | — | GitHub + blog |
| **Computational Bucketing** | Collab. Workflows | Group | BIM data pipelines via Speckle | — | GitHub + blog |
| **Turning Data Into Geometry** | Integrative Modeling | Group | Rhino.Inside.Revit workflows | — | blog |
| **Revitalizing the Tsukiji Fish Market** | Environmental Analysis | Group | Environmental analysis of Tokyo (solar/thermal/wind) | — | blog |
| **Pelagñou: An Archipelagic Technoculture** | AIA Theory | Group | Written theory/research essay | — | blog |

**Hero set (deep documentation — process, code, diagrams):** **Sensi, NeuroSpace, The Huddle, The Lungs, LegoArch** (all awarded or solo-flagship), plus **A Ballooning Market** for voice/ownership. The rest become standard cards or Explorations. Confirm final heroes with Emilie.

**Blog/podcast sources to mine for copy (public):**
- `blog.iaac.net/the-data-pipeline-behind-neurospace-from-sliders-to-synapses/`
- `blog.iaac.net/a-ballooning-market-why-i-decided-to-fill-a-historic-market-with-balloons-and-how-i-almost-failed/`
- Plus the per-project blog posts linked in the sheet (search `blog.iaac.net/?s=<project>` when a slug is unknown).

### Professional / pre-MaCAD work — curate a few, reframe through a technical lens
From the CV, strongest candidates for the **Design & Practice** lens (keep 2–4, reframed):
- **Marsception "Rings of Mars: Ring 4000"** (self-employed) — Top 50; AI-driven workflows, Rhino, V-Ray. Futuristic + computational → strong fit.
- **SOMA towers** (Dubai) — Verve/City Walk, Enara, Saria, District O — facade & massing studies in Rhino/Grasshopper + BIM. Proves real, built-scale delivery.
- **Dynamic Solution Co.** (Kuwait) — experiential / exhibition / parametric + 3D-printed products.
- **LAU XR Lab** — AR/VR for education (research pedigree, ties to XR in her headline).

The old site's projects (Chahine, City Walk, Culinary, Escape/Marsception, Homage, Solitude) map onto these — assess against the reframe; **retire anything that dilutes the R&D focus** (per Emilie's "curated few, reframed" choice). Old high-res assets live in `old material/Emilie El Chidiac - Selected Work Portfolio-LQ.pdf` (read it in the build session).

---

## 7. Materials to gather (asset pipeline) — DO THIS EARLY

The IAAC submission sheet holds, per project, links to: **submission folders, G-slide decks, GitHub repos, blog posts, and a "high-res images" Drive link.** For every **featured** project you must **download the relevant materials from the accessible links** and bring them into the repo (`/assets/projects/<slug>/`), optimized for web.

**Access reality (needs Emilie):** The sheet and its Drive folders require her **IAAC Google login**. Two paths:
1. **Live, browser-driven (preferred for reading):** Emilie connects the **Claude for Chrome** extension and logs in; you drive the sheet/Drive to read and open assets.
2. **Bulk download (preferred for actual files):** Emilie downloads each featured project's **high-res image folder** (and any GH definitions / GitHub zips) into a local `/incoming/<slug>/` folder you specify. Downloading files is a permissioned action — give her an exact checklist (project → what to grab).

Also gather: her **headshot/photo**, the **EEC logo** (`old material/EEC LOGO.ai` / `.png` — may need re-export/vectorizing), and the **old portfolio PDF** for professional-work imagery.

**Produce a gathering checklist as your first deliverable** (table: project → asset type → source link → status), so Emilie can fill the gaps in one pass.

---

## 8. LinkedIn optimization (parallel work stream — Emilie asked for this)

Emilie will connect Chrome so you can review live. **Read/propose only — never post, connect, or change settings without her explicit per-action approval.** Priorities, highest-impact first:

1. **Location & availability (handle honestly).** Public **Location** stays her real current base — never a city she isn't genuinely based in (the MaCAD is hybrid/online, so Barcelona only if actually true). In **recruiter-facing Job Preferences** set target locations = **Europe/Barcelona** and enable **"open to relocating."** Use the **recruiters-only** open-to-work setting (Emilie chose no public #OpenToWork badge). This signals intent without misrepresenting residence.
   - **Targeting note:** prioritize firms with a track record of hiring internationally (IAAC's cohort is global; computational/R&D groups like Zaha CODE, Foster+Partners ATG, BIG, UNStudio/UNSense recruit worldwide).
2. **Add an "About" section (currently missing).** Draft one in her voice, built on the Behavior-Information-Modeling spine, R&D positioning, and 2–3 proof points (Sensi trophy, NeuroSpace, podcast). End with an availability line.
3. **Sharpen the headline** toward the niche. Current: *"Design Technology Architect ∣ Master's Student @IAAC ∣ R&D, Advanced Workflows, & AI/XR Integration."* Offer 3 options that name **neuroarchitecture / Behavior Information Modeling / computational design** and read as confident (drop "Student" framing in favor of "MaCAD Candidate" or similar). **Pressure-test options with `llm-council`.**
4. **Featured section:** pin the new portfolio site, Sensi, NeuroSpace, the podcast.
5. **Consistency pass:** align titles/dates with the CV; ensure the portfolio URL is present.
6. Keep her strong existing post voice — it's already excellent; don't rewrite what works.

Deliver LinkedIn changes as a **copy doc for her to paste**, plus a short prioritized action list.

---

## 9. Tech & build

- **Current state (to replace):** a single `index.html` using React + Babel + Tailwind all via CDN — a throwaway prototype. Full rebuild is approved.
- **Recommended stack:** **Vite + React + TypeScript + Tailwind**; **react-three-fiber / drei** for EXPLORE mode; **framer-motion** for editorial transitions; content in typed data files or MDX for the blog. Static output → **GitHub Pages** (current host; keep it), custom **domain later**.
- **Non-negotiables:** excellent on **mobile and desktop**; fast (lazy-load the 3D bundle; the READ mode must work with zero WebGL); accessible (EXPLORE mode needs a legible non-3D fallback — the READ mode is that fallback); SEO/OG tags; a synced downloadable CV.
- **Assets:** compress images (the current `pic-em.png` is 4.3 MB — unacceptable); generate responsive sizes; an OG/social share image via `canvas-design`.

---

## 10. Suggested session plan (phased — recommended over one mega-session)

1. **Session 1 — Brand & content lock + asset gathering.** Confirm spine wording & heroes; produce the asset-gathering checklist; Emilie downloads/connects; draft positioning + hero copy. Pressure-test the spine and heroes with `llm-council`.
2. **Session 2 — Design system + editorial (READ) build.** Tokens, type, components (`artifact-design` → `design:design-system` → `web-artifacts-builder`); build Home + Work + About + CV in READ mode; `design:design-critique` pass.
3. **Session 3 — EXPLORE (3D orb network) mode.** Build the projects+thoughts network; wire the mode toggle; performance + fallback.
4. **Session 4 — Writing/Lab + LinkedIn + polish + deploy.** Seed the blog; a11y (`design:accessibility-review`) + `verify`; ship to GitHub Pages; deliver the LinkedIn copy doc.

---

## 11. Decisions — resolved (discovery session) & still open

**Resolved:**
- **Build cadence:** phased across ~4 sessions (per §10).
- **Domain:** launch on the existing **GitHub Pages** URL; add a custom domain later.
- **Brand-spine wording:** keep "Behavior Information Modeling" as the *working* spine; **finalize the exact public phrasing in Session 1** (workshop it).
- **LinkedIn availability:** recruiters-only "open to work" (no public badge); honest location + "open to relocate" (see §8).

**Still needed from Emilie (mostly Session 1):**
- **Confirm the hero project set** (proposed: Sensi, NeuroSpace, The Huddle, The Lungs, LegoArch, A Ballooning Market).
- **Which professional projects** to keep in Design & Practice — and any **NDA constraints** on SOMA/Dynamic client work.
- **Asset downloads** per the checklist; a **headshot**; confirm whether the **EEC logo** stays or evolves.
- **How personal** the blog is on day one (books/films/Now vs. research-only to start).

## 12. Definition of done (for the whole rebrand)
A deployed, fast, responsive, accessible site on GitHub Pages that: leads with the Behavior-Information-Modeling spine; offers working EXPLORE + READ modes; features the hero projects with real assets and her voice; has a live blog seeded with her IAAC writing; includes a synced downloadable CV; and is matched by an optimized LinkedIn profile. Verified on desktop + mobile via `verify`/`run`.
