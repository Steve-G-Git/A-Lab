# Steve Garnet — IT Portfolio

A personal IT portfolio site built to support a job search for entry-level help desk and IT support roles. Developed while studying for CompTIA A+ (Core 1 & Core 2).

Live site: **https://steve-g-git.github.io/A-Lab/**

---

## Overview

This site demonstrates IT knowledge and problem-solving ability through working interactive tools — not just a list of topics studied. Every concept covered in the tools reflects active CompTIA A+ exam preparation.

---

## Pages

| File | Description |
|---|---|
| `index.html` | Landing page — skills, certifications, project overview |
| `about.html` | Background, experience, and approach |
| `projects.html` | Project showcase with technical descriptions |
| `lab.html` | CompTIA A+ Lab Terminal (interactive study tool) |
| `troubleshooter.html` | Network Troubleshooter (scenario-based diagnostic tool) |

---

## Projects

### CompTIA A+ Lab Terminal

A browser-based terminal simulator that responds to typed commands, parses input, and returns structured study content across all four CompTIA A+ domains — hardware, networking, operating systems, and security.

Built in vanilla JavaScript with no libraries or frameworks. Input is captured via keyboard events, parsed against a command registry, and routed to the appropriate content or quiz handler. The quiz engine randomizes questions from a domain-organized data structure, evaluates typed answers against an accepted-answers array, and tracks XP state across the session.

**Domains covered:** Hardware · Networking · Operating Systems · Security  
**Tech used:** HTML, CSS, JavaScript (vanilla)

---

### Network Troubleshooter

A scenario-based diagnostic tool structured around the CompTIA A+ troubleshooting methodology: identify the problem, establish a theory, test the theory, create an action plan, verify resolution, document findings.

Covers four scenarios reflecting common help desk situations: no internet access, WAN connectivity failure (router responds locally but has no upstream IP), a broadcast storm caused by a physical network loop, and a workstation blocked by switch-level MAC filtering after a hardware swap. Each step maps choices to outcomes and explanatory feedback. Incorrect paths explain *why* the answer is wrong — the tool teaches reasoning, not just correct answers.

**Tech used:** HTML, CSS, JavaScript (vanilla)

---

## Tech Stack

- HTML5 / CSS3 / JavaScript (no frameworks)
- Hosted on GitHub Pages
- No build tools, no dependencies

---

## Background

I come from a precision manufacturing background (US Synthetic — polycrystalline diamond compacts for oil and gas drill bits) with hands-on experience in Lean manufacturing and the Toyota Production System. I approach IT troubleshooting the same way I approached process improvement: isolate variables, test assumptions, document results, refine until the issue is resolved and repeatable.

Currently studying for CompTIA A+. CompTIA Network+ is next.

---

## Contact

**Email:** stevegarnet@outlook.com  
**Location:** Tooele, Utah — open to remote or local IT support roles
