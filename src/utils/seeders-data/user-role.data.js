const { v4 } = require("uuid");

const userRoles = [
  {
    id: v4(),
    title: "I want to explore & plan my own trips",
    name: "traveler",
    features: ["Self Planning", "AI Recommendations", "Professional Help"],
    description:
      "Plan your own adventures, get AI recommendations,or work with professional trip planners",
  },
  {
    id: v4(),
    title: "I want to offer trip planning services",
    name: "planner",
    description: "Share your travel expertise, earn money by planning trips,and build your reputation",
    features: ["Earn Money", "Share Expertise", 'Build Reputation'],
    description: "User who helps travelers plan trips.",
  },
  {
    id: v4(),
    title: 'I want to do both',
    name: "both",
    description: "Plan your own trips and help others too.Get the full Tripify experience",
    features: ["Complete Access", "Community", "Flexibility"],
    description: "User who can act as both traveler and planner.",
  },
];

module.exports = {
  userRoles,
};
