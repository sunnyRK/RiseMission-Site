import type { Source } from "@/components/blog/prose";

/**
 * Verified citations (DOIs resolved + titles confirmed via Crossref on
 * 2026-11-15, habit sources on 2026-11-17). Posts cite from here so a source is written once. Only state
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
  // Habit + gamification sources: DOIs resolved and titles confirmed via Crossref on 2026-11-17.
  lally2010: {
    label: "Lally P. et al. How are habits formed: Modelling habit formation in the real world. European Journal of Social Psychology, 2010",
    href: "https://doi.org/10.1002/ejsp.674",
  },
  gardner2012: {
    label: "Gardner B., Lally P., Wardle J. Making health habitual: the psychology of 'habit-formation' and general practice. British Journal of General Practice, 2012",
    href: "https://doi.org/10.3399/bjgp12X659466",
  },
  gollwitzer2006: {
    label: "Gollwitzer P.M., Sheeran P. Implementation intentions and goal achievement: a meta-analysis of effects and processes. Advances in Experimental Social Psychology, 2006",
    href: "https://doi.org/10.1016/S0065-2601(06)38002-1",
  },
  hamari2014: {
    label: "Hamari J., Koivisto J., Sarsa H. Does gamification work? A literature review of empirical studies on gamification. HICSS, 2014",
    href: "https://doi.org/10.1109/HICSS.2014.377",
  },
  johnson2016: {
    label: "Johnson D. et al. Gamification for health and wellbeing: a systematic review of the literature. Internet Interventions, 2016",
    href: "https://doi.org/10.1016/j.invent.2016.10.002",
  },
  silverman2022: {
    label: "Silverman J., Barasch A. On or off track: how (broken) streaks affect consumer decisions. Journal of Consumer Research, 2022",
    href: "https://doi.org/10.1093/jcr/ucac029",
  },
  aasmDisorders: { label: "American Academy of Sleep Medicine. Sleep disorders (sleepeducation.org)", href: "https://sleepeducation.org/sleep-disorders/" },
} satisfies Record<string, Source>;
