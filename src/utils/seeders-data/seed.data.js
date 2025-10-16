const { v4 } = require("uuid");
const interests = [
  {
    id: v4(),
    name: "Adventure & Outdoor",
    description: "Hiking, camping, outdoor adventures",
    icon: "adventure",
  },
  {
    id: v4(),
    name: "Culture & History",
    description: "Museums, historical sites, cultural experiences",
    icon: "culture",
  },
  {
    id: v4(),
    name: "Food & Dining",
    description: "Culinary experiences, local cuisine, restaurants",
    icon: "food",
  },
  {
    id: v4(),
    name: "Nightlife & Entertainment",
    description: "Bars, clubs, entertainment venues, nightlife",
    icon: "nightlife",
  },
  {
    id: v4(),
    name: "Photography",
    description: "Scenic spots, photo opportunities, landscapes",
    icon: "photography",
  },
  {
    id: v4(),
    name: "Wellness & Relaxation",
    description: "Spa, wellness, peaceful locations, meditation",
    icon: "wellness",
  },
  {
    id: v4(),
    name: "Business Travel",
    description: "Business meetings, conferences, work travel",
    icon: "business",
  },
  {
    id: v4(),
    name: "Family Friendly",
    description: "Kid-friendly activities, family attractions",
    icon: "family",
  },
];
module.exports = { interests };
