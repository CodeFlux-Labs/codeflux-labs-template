const { expo, slug } = require("../../app.json");

export const ONBOARDING_COMPLETE = `${slug || expo.slug}-hasSeenOnboarding`;
