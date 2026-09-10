# Steve Garnet | IT Portfolio

A personal IT portfolio site built to demonstrate hands-on troubleshooting, technical learning, networking knowledge, and practical problem-solving for entry-level help desk and IT support roles.

[![Live site](https://img.shields.io/badge/live_site-open-2563eb)](https://steve-g-git.github.io/A-Lab/)
![Status](https://img.shields.io/badge/status-active-brightgreen)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[LinkedIn](https://www.linkedin.com/in/steve-garnet-502b10334/) | [GitHub](https://github.com/Steve-G-Git) | [Download résumé](assets/resume/Steve_Garnet_Resume.pdf)

## Overview

This site shows my progression from browser-based IT study tools to a larger React networking application and a documented real-world firmware recovery. The projects emphasize structured troubleshooting, clear technical explanation, and repeatable solutions.

## Project guide

| Project | Format | Open |
|---|---|---|
| LeanOps Lab | Documented Ubuntu Server operations lab | [Repository](https://github.com/Steve-G-Git/LeanOps-Lab) |
| OSI Explorer | Interactive React networking application | [Live site](https://steve-g-git.github.io/osi-explorer/) · [Source](https://github.com/Steve-G-Git/osi-explorer) |
| IT Support Lab Terminal | Browser-based study tool | [Launch](https://steve-g-git.github.io/A-Lab/lab.html) |
| Network Troubleshooter | Scenario-based diagnostic tool | [Launch](https://steve-g-git.github.io/A-Lab/troubleshooter.html) |
| Neptune 4 Plus MCU Recovery | Technical troubleshooting case study | [Read](https://github.com/Steve-G-Git/neptune-4-mcu-recovery) |

## Projects

### 1. LeanOps Lab

**Type:** Infrastructure lab

- **Problem:** A fictional small-business server began with unnecessary exposure, changing network addresses, weak administrative controls, no repeatable monitoring, and no tested recovery process.
- **What I configured:** Ubuntu Server in VirtualBox, NAT and host-only networking, static addressing, key-only SSH, UFW, systemd monitoring, Bash and Python automation, SMTP alerts, Samba access groups, and backup processes.
- **Verification:** Thirteen PDCA cycles include reboot checks, Nmap scans, allowed and denied share tests, controlled failures, rollback, isolated restores, email delivery, and SHA-256 comparisons.
- **Problem and correction:** I corrected a mismatched VirtualBox DHCP subnet and later isolated a systemd sandbox setting that blocked UFW's runtime lock.
- **Next improvement:** Add encrypted, versioned off-site backup or centralized identity after defining an observed problem, validation, and rollback.

[Review the repository](https://github.com/Steve-G-Git/LeanOps-Lab)

### 2. OSI Explorer

**Type:** Interactive study application

- **Problem:** The OSI model is often taught as seven isolated boxes instead of a connected system.
- **What I built:** A React application with seven layer pages, a searchable encyclopedia, a connected knowledge map, and a guided twelve-step packet journey.
- **Verification:** Production build and preview checks, routed navigation, responsive layouts, keyboard focus, reduced-motion behavior, GitHub Actions deployment, and the live site.
- **Problem and correction:** I worked through npm, lockfile, Vite, Git, and deployment failures, including correcting the Vite base path for GitHub Pages.
- **Next improvement:** Add automated content-integrity tests, practical troubleshooting scenarios, and more protocol diagrams.

**Technology:** React, Vite, JavaScript, CSS, React Router, GitHub Actions, GitHub Pages

[Open the live project](https://steve-g-git.github.io/osi-explorer/)  
[View the source repository](https://github.com/Steve-G-Git/osi-explorer)

### 3. IT Support Lab Terminal

**Type:** Browser study tool

- **Problem:** Static notes allowed passive rereading without command-oriented recall practice.
- **What I built:** A terminal interface, command registry, topic navigation, randomized quizzes, accepted-answer matching, session scoring, and XP tracking in vanilla JavaScript.
- **Verification:** The source implements command lookup, tab navigation, quiz flow, score and XP updates, and unknown-command feedback. Automated checks validate page destinations and JavaScript syntax.
- **Problem and correction:** I removed stale A+ branding and corrected oversimplified technical entries during a later accuracy audit.
- **Next improvement:** Separate content from interface code and add automated tests for every command and accepted answer.

**Technology:** HTML, CSS, JavaScript

[Launch the terminal](https://steve-g-git.github.io/A-Lab/lab.html)

### 4. Network Troubleshooter

**Type:** Browser study tool

- **Problem:** Memorizing troubleshooting steps does not provide practice choosing the next action from incomplete evidence.
- **What I built:** A state-driven engine with four network incidents, staged evidence, decision paths, progress tracking, and explanatory feedback.
- **Verification:** The source contains four complete scenarios. Each step defines choices, a correct path, and explanatory feedback; automated checks validate page destinations and JavaScript syntax.
- **Problem and correction:** I removed stale certification branding, corrected a WAN scenario that kept DNS in scope after a numeric-IP test failed, and strengthened the broadcast-storm evidence.
- **Next improvement:** Add varied symptoms, more support scenarios, and automated tests for every scenario branch.

**Technology:** HTML, CSS, JavaScript

[Launch the troubleshooter](https://steve-g-git.github.io/A-Lab/troubleshooter.html)

### 5. Neptune 4 Plus MCU Recovery

**Type:** Technical case study

- **Problem:** A failed firmware update left the Klipper interface available while temperature readings, motors, heaters, and MCU communication were lost.
- **What I investigated:** The Linux host, CH340 serial interface, COM port, UART connection, and MCU firmware using Device Manager, vendor firmware, microSD recovery, and STM32CubeProgrammer.
- **Verification:** The error cleared and temperature, motor, and heater control returned without hardware replacement or host reinstallation.
- **Problem and correction:** The SD-card restore did not fix the fault, and direct UART initially failed with a boot-mode error. These failures focused recovery on the MCU firmware layer.
- **Next improvement:** Capture screenshots and logs during the incident, record exact firmware versions and commands, and document a repeatable rollback procedure.

[View the recovery case study](https://github.com/Steve-G-Git/neptune-4-mcu-recovery)

## Technology

**This portfolio site:** HTML, CSS, JavaScript, GitHub Pages

**Featured application:** React, Vite, JavaScript, CSS, React Router, GitHub Actions

**Support and troubleshooting:** Windows 10/11, Ubuntu Linux, VirtualBox, TCP/IP, IPv4, DNS, default gateways, subnetting, wireless connectivity, Command Prompt, Linux terminal, ping, ipconfig, tracert, nslookup, and ARP

## Background

I come from a precision manufacturing background with hands-on experience in team leadership, Lean manufacturing, standardized work, training, equipment troubleshooting, and root-cause analysis.

I approach IT troubleshooting the same way I approached process improvement: isolate variables, test assumptions, document findings, and produce a repeatable solution.

Currently preparing for the CompTIA Network+ certification through coursework, hands-on networking labs, and practical projects.

## Contact

- **Email:** [stevegarnet@outlook.com](mailto:stevegarnet@outlook.com)
- **LinkedIn:** [linkedin.com/in/steve-garnet-502b10334](https://www.linkedin.com/in/steve-garnet-502b10334/)
- **Résumé:** [Download PDF](assets/resume/Steve_Garnet_Resume.pdf)
- **Location:** Tooele, Utah
- **Career focus:** Help desk, desktop support, technical support, and field support roles

## License

This project is available under the [MIT License](LICENSE).
