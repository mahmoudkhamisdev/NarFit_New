export interface LocationItem {
  id: string;
  name: string;
}

export const LOCATIONS: LocationItem[] = [
  // Egypt
  { id: 'cairo', name: 'Cairo' },
  { id: 'giza', name: 'Giza' },
  { id: 'alexandria', name: 'Alexandria' },
  { id: 'mansoura', name: 'Mansoura' },
  { id: 'tanta', name: 'Tanta' },
  { id: 'zagazig', name: 'Zagazig' },
  { id: 'ismailia', name: 'Ismailia' },
  { id: 'port-said', name: 'Port Said' },
  { id: 'suez', name: 'Suez' },
  { id: 'hurghada', name: 'Hurghada' },
  { id: 'sharm-el-sheikh', name: 'Sharm El Sheikh' },
  { id: 'aswan', name: 'Aswan' },
  { id: 'luxor', name: 'Luxor' },
  { id: 'asyut', name: 'Asyut' },
  { id: 'sohag', name: 'Sohag' },

  // GCC / Middle East
  { id: 'dubai', name: 'Dubai' },
  { id: 'abu-dhabi', name: 'Abu Dhabi' },
  { id: 'sharjah', name: 'Sharjah' },
  { id: 'riyadh', name: 'Riyadh' },
  { id: 'jeddah', name: 'Jeddah' },
  { id: 'dammam', name: 'Dammam' },
  { id: 'khobar', name: 'Khobar' },
  { id: 'kuwait-city', name: 'Kuwait City' },
  { id: 'doha', name: 'Doha' },
  { id: 'manama', name: 'Manama' },
  { id: 'muscat', name: 'Muscat' },
  { id: 'amman', name: 'Amman' },
  { id: 'beirut', name: 'Beirut' },

  // International
  { id: 'london', name: 'London' },
  { id: 'manchester', name: 'Manchester' },
  { id: 'new-york', name: 'New York' },
  { id: 'los-angeles', name: 'Los Angeles' },
  { id: 'miami', name: 'Miami' },
  { id: 'paris', name: 'Paris' },
  { id: 'berlin', name: 'Berlin' },
  { id: 'istanbul', name: 'Istanbul' },
  { id: 'toronto', name: 'Toronto' },
  { id: 'sydney', name: 'Sydney' },
];

export const DEFAULT_LOCATION: LocationItem = LOCATIONS[0];
