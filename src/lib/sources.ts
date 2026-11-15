import type { Source } from "@/components/blog/prose";

/**
 * Verified citations (DOIs resolved + titles confirmed via Crossref on
 * 2026-11-15). Posts cite from here so a source is written once. Only state
 * what the source actually supports.
 */
export const SRC = {
  sundelin2023: {
    label: "Sundelin T. et al. Is snoozing losing? Journal of Sleep Research, 2023",
    href: "https://doi.org/10.1111/jsr.14054",
  },
  tassi2000: { label: "Tassi P., Muzet A. Sleep inertia. Sleep Medicine Reviews, 2000", href: "https://doi.org/10.1053/smrv.2000.0098" },
  watson2015: {
    label: "Watson N.F. et al. Recommended amount of sleep for a healthy adult (AASM/SRS consensus). J Clin Sleep Med, 2015",
    href: "https://doi.org/10.5664/jcsm.4758",
  },
  blume2019: {
    label: "Blume C., Garbazza C., Spitschan M. Effects of light on human circadian rhythms, sleep and mood. Somnologie, 2019",
    href: "https://doi.org/10.1007/s11818-019-00215-x",
  },
  wittmann2006: {
    label: "Wittmann M. et al. Social jetlag: misalignment of biological and social time. Chronobiology International, 2006",
    href: "https://doi.org/10.1080/07420520500545979",
  },
  daghlas2021: {
    label: "Daghlas I. et al. Genetically proxied diurnal preference, sleep timing, and risk of major depressive disorder. JAMA Psychiatry, 2021",
    href: "https://doi.org/10.1001/jamapsychiatry.2021.0959",
  },
  windred2023: {
    label: "Windred D.P. et al. Sleep regularity is a stronger predictor of mortality risk than sleep duration. SLEEP, 2023",
    href: "https://doi.org/10.1093/sleep/zsad253",
  },
  mcfarlane2020: {
    label: "McFarlane S.J. et al. Alarm tones, music and their elements: analysis of reported waking sounds to counteract sleep inertia. PLOS ONE, 2020",
    href: "https://doi.org/10.1371/journal.pone.0215788",
  },
  nindsSleep: {
    label: "NIH NINDS. Brain Basics: Understanding Sleep",
    href: "https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep",
  },
  aasmDisorders: { label: "American Academy of Sleep Medicine. Sleep disorders (sleepeducation.org)", href: "https://sleepeducation.org/sleep-disorders/" },
} satisfies Record<string, Source>;
