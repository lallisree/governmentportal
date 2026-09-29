export const initialCategories = [
  {
    id: 1,
    name: "Water Supply",
    description: "Municipal pipeline, drinking water quality, sewage, and drainage issues",
    status: "Active"
  },
  {
    id: 2,
    name: "Roads & Highways",
    description: "Pothole maintenance, street paving, divider repairs, and road signage",
    status: "Active"
  },
  {
    id: 3,
    name: "Electricity & Power",
    description: "Power outages, street lighting, transformer faults, and billing queries",
    status: "Active"
  },
  {
    id: 4,
    name: "Public Health & Sanitation",
    description: "Garbage collection, mosquito control, disease prevention, and waste dumping",
    status: "Active"
  }
];

export const initialDepartments = [
  {
    id: 1,
    name: "Water Works Department",
    categoryId: 1,
    status: "Active"
  },
  {
    id: 2,
    name: "Sewerage & Drainage Board",
    categoryId: 1,
    status: "Active"
  },
  {
    id: 3,
    name: "Highway & Urban Roads Authority",
    categoryId: 2,
    status: "Active"
  },
  {
    id: 4,
    name: "Traffic Infrastructure Division",
    categoryId: 2,
    status: "Active"
  },
  {
    id: 5,
    name: "State Electricity Distribution Board",
    categoryId: 3,
    status: "Active"
  },
  {
    id: 6,
    name: "Municipal Solid Waste Management",
    categoryId: 4,
    status: "Active"
  }
];

export const initialServices = [
  {
    id: 1,
    name: "Drinking Water Pipeline Leakage",
    categoryId: 1,
    departmentId: 1,
    status: "Active"
  },
  {
    id: 2,
    name: "Contaminated / Turbid Water Supply",
    categoryId: 1,
    departmentId: 1,
    status: "Active"
  },
  {
    id: 3,
    name: "Open Manhole & Overflowing Drain",
    categoryId: 1,
    departmentId: 2,
    status: "Active"
  },
  {
    id: 4,
    name: "Dangerous Pothole Reporting",
    categoryId: 2,
    departmentId: 3,
    status: "Active"
  },
  {
    id: 5,
    name: "Traffic Signal Malfunction",
    categoryId: 2,
    departmentId: 4,
    status: "Active"
  },
  {
    id: 6,
    name: "Street Light Not Working",
    categoryId: 3,
    departmentId: 5,
    status: "Active"
  },
  {
    id: 7,
    name: "Frequent Power Voltage Fluctuation",
    categoryId: 3,
    departmentId: 5,
    status: "Active"
  },
  {
    id: 8,
    name: "Uncollected Garbage & Debris Dump",
    categoryId: 4,
    departmentId: 6,
    status: "Active"
  }
];

export const initialIssues = [
  {
    id: 101,
    title: "Street light flickering and shut off on 5th Cross Road",
    description: "The street light in front of house #42 has been non-functional for 4 days, causing safety concerns for pedestrians at night.",
    categoryId: 3,
    departmentId: 5,
    serviceId: 6,
    citizenName: "Ramesh Sharma",
    citizenContact: "98765-43210",
    priority: "High",
    status: "In Progress",
    createdAt: "2026-09-27"
  },
  {
    id: 102,
    title: "Severe potable water pipeline burst near Metro Station",
    description: "Clean drinking water is gushing out on the road sidewalk. Water pressure in neighboring residential blocks has dropped to zero.",
    categoryId: 1,
    departmentId: 1,
    serviceId: 1,
    citizenName: "Priya Nair",
    citizenContact: "98450-11223",
    priority: "Critical",
    status: "Open",
    createdAt: "2026-09-28"
  },
  {
    id: 103,
    title: "Deep pothole causing vehicular traffic slowdown on Ring Road",
    description: "Approximately 2-foot wide pothole in the middle lane causing dangerous two-wheeler skidding during evening peak hours.",
    categoryId: 2,
    departmentId: 3,
    serviceId: 4,
    citizenName: "Amitabh Verma",
    citizenContact: "97112-99887",
    priority: "Medium",
    status: "Resolved",
    createdAt: "2026-09-24"
  },
  {
    id: 104,
    title: "Unattended municipal garbage heap emitting foul odor",
    description: "Garbage collection truck has not visited the Sector-4 community dumpster for over 72 hours.",
    categoryId: 4,
    departmentId: 6,
    serviceId: 8,
    citizenName: "Sunita Deshmukh",
    citizenContact: "98200-44556",
    priority: "High",
    status: "Open",
    createdAt: "2026-09-29"
  }
];
