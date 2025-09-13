// Mock data based on the SQL structure from the 2011 election results
export interface PollingUnit {
  uniqueid: number;
  polling_unit_id: number;
  ward_id: number;
  lga_id: number;
  uniquewardid: number;
  polling_unit_number: string;
  polling_unit_name: string;
  polling_unit_description: string;
  lat: string;
  long: string;
  entered_by_user: string;
  date_entered: string;
  user_ip_address: string;
}

export interface Party {
  id: number;
  partyid: string;
  partyname: string;
}

export interface AnnouncedPuResult {
  result_id: number;
  polling_unit_uniqueid: number;
  party_abbreviation: string;
  party_score: number;
  entered_by_user: string;
  date_entered: string;
  user_ip_address: string;
}

export interface LGA {
  uniqueid: number;
  lga_id: number;
  lga_name: string;
  state_id: number;
  lga_description: string;
  entered_by_user: string;
  date_entered: string;
  user_ip_address: string;
}

export interface Ward {
  uniqueid: number;
  ward_id: number;
  ward_name: string;
  lga_id: number;
  ward_description: string;
  entered_by_user: string;
  date_entered: string;
  user_ip_address: string;
}

// Real LGA data for Delta State (state_id: 25) from the SQL database
export const mockLGAs: LGA[] = [
  { uniqueid: 1, lga_id: 1, lga_name: "Aniocha North", state_id: 25, lga_description: "Aniocha North", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.2" },
  { uniqueid: 2, lga_id: 2, lga_name: "Aniocha South", state_id: 25, lga_description: "Aniocha South", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.1" },
  { uniqueid: 3, lga_id: 5, lga_name: "Ethiope East", state_id: 25, lga_description: "Ethiope East", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.5" },
  { uniqueid: 4, lga_id: 6, lga_name: "Ethiope West", state_id: 25, lga_description: "Ethiope West", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.6" },
  { uniqueid: 5, lga_id: 7, lga_name: "Ika North East", state_id: 25, lga_description: "Ika North East", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.8" },
  { uniqueid: 6, lga_id: 8, lga_name: "Ika South", state_id: 25, lga_description: "Ika South", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.7" },
  { uniqueid: 7, lga_id: 9, lga_name: "Isoko North", state_id: 25, lga_description: "Isoko North", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.9" },
  { uniqueid: 8, lga_id: 10, lga_name: "Isoko South", state_id: 25, lga_description: "Isoko South", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.10" },
  { uniqueid: 9, lga_id: 11, lga_name: "Ndokwa East", state_id: 25, lga_description: "Ndokwa East", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.11" },
  { uniqueid: 10, lga_id: 12, lga_name: "Ndokwa West", state_id: 25, lga_description: "Ndokwa West", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.12" },
  { uniqueid: 11, lga_id: 13, lga_name: "Okpe", state_id: 25, lga_description: "Okpe", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.13" },
  { uniqueid: 12, lga_id: 14, lga_name: "Oshimili North", state_id: 25, lga_description: "Oshimili North", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.14" },
  { uniqueid: 13, lga_id: 15, lga_name: "Oshimili South", state_id: 25, lga_description: "Oshimili South", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.15" },
  { uniqueid: 14, lga_id: 16, lga_name: "Patani", state_id: 25, lga_description: "Patani", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.16" },
  { uniqueid: 15, lga_id: 17, lga_name: "Sapele", state_id: 25, lga_description: "Sapele", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.17" },
  { uniqueid: 16, lga_id: 18, lga_name: "Udu", state_id: 25, lga_description: "Udu", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.18" },
  { uniqueid: 17, lga_id: 19, lga_name: "Ughelli North", state_id: 25, lga_description: "Ughelli North", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.19" },
  { uniqueid: 18, lga_id: 20, lga_name: "Ughelli South", state_id: 25, lga_description: "Ughelli South", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.20" },
  { uniqueid: 19, lga_id: 21, lga_name: "Ukwuani", state_id: 25, lga_description: "Ukwuani", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.21" },
  { uniqueid: 20, lga_id: 22, lga_name: "Uvwie", state_id: 25, lga_description: "Uvwie", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.22" },
  { uniqueid: 21, lga_id: 31, lga_name: "Bomadi", state_id: 25, lga_description: "Bomadi", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.3" },
  { uniqueid: 22, lga_id: 32, lga_name: "Burutu", state_id: 25, lga_description: "Burutu", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.4" },
  { uniqueid: 23, lga_id: 33, lga_name: "Warri North", state_id: 25, lga_description: "Warri North", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.23" },
  { uniqueid: 24, lga_id: 34, lga_name: "Warri South", state_id: 25, lga_description: "Warri South", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.24" },
  { uniqueid: 25, lga_id: 35, lga_name: "Warri South West", state_id: 25, lga_description: "Warri South West", entered_by_user: "Bincom", date_entered: "2011-04-27", user_ip_address: "127.0.0.25" }
];

// Real parties from the SQL database
export const mockParties: Party[] = [
  { id: 1, partyid: "PDP", partyname: "PDP" },
  { id: 2, partyid: "DPP", partyname: "DPP" },
  { id: 3, partyid: "ACN", partyname: "ACN" },
  { id: 4, partyid: "PPA", partyname: "PPA" },
  { id: 5, partyid: "CDC", partyname: "CDC" },
  { id: 6, partyid: "JP", partyname: "JP" },
  { id: 7, partyid: "ANPP", partyname: "ANPP" },
  { id: 8, partyid: "LABOUR", partyname: "LABOUR" },
  { id: 9, partyid: "CPP", partyname: "CPP" }
];

// Real polling units from the SQL database
export const mockPollingUnits: PollingUnit[] = [
  { uniqueid: 8, polling_unit_id: 6, ward_id: 8, lga_id: 17, uniquewardid: 181, polling_unit_number: "DT1708006", polling_unit_name: "Sapele Ward 8 PU", polling_unit_description: "Sapele Ward 8 PU", lat: "5.59371889", long: "5.999311165", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 9, polling_unit_id: 4, ward_id: 1, lga_id: 19, uniquewardid: 194, polling_unit_number: "DT1901004", polling_unit_name: "Primary School in Aghara", polling_unit_description: "Primary School in Aghara", lat: "5.599585986", long: "6.001336288", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 10, polling_unit_id: 5, ward_id: 1, lga_id: 19, uniquewardid: 194, polling_unit_number: "DT1401005", polling_unit_name: "Ishere Primary School Aghara", polling_unit_description: "Ishere Primary School Aghara", lat: "5.595722496", long: "5.99961724", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 11, polling_unit_id: 5, ward_id: 3, lga_id: 34, uniquewardid: 244, polling_unit_number: "DT3403005", polling_unit_name: "Igini Primary School", polling_unit_description: "Esisi Road", lat: "5.602005475", long: "6.001611141", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 12, polling_unit_id: 1, ward_id: 4, lga_id: 21, uniquewardid: 220, polling_unit_number: "DT2104001", polling_unit_name: "Umukwapa poll unit 1", polling_unit_description: "Umukwapa poll unit 1", lat: "5.596383741", long: "5.99023883", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 13, polling_unit_id: 16, ward_id: 1, lga_id: 22, uniquewardid: 223, polling_unit_number: "DT2201016", polling_unit_name: "Church in Effurun1 Ovie", polling_unit_description: "Church in Effurun1 Ovie", lat: "5.59759314", long: "5.991187248", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 14, polling_unit_id: 6, ward_id: 1, lga_id: 19, uniquewardid: 194, polling_unit_number: "DT1901006", polling_unit_name: "Ishere Primary School Aghara", polling_unit_description: "Ishere Primary School Aghara", lat: "5.90359853", long: "5.729595722", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 15, polling_unit_id: 13, ward_id: 1, lga_id: 22, uniquewardid: 224, polling_unit_number: "DT2201013", polling_unit_name: "Effurun 2 in Uvwie", polling_unit_description: "Effurun 2 in Uvwie", lat: "5.904090609", long: "5.729854354", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 16, polling_unit_id: 5, ward_id: 7, lga_id: 6, uniquewardid: 59, polling_unit_number: "DT0607005", polling_unit_name: "School in Ethiope West", polling_unit_description: "School in Ethiope West", lat: "5.895063582", long: "5.730405695", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 17, polling_unit_id: 9, ward_id: 1, lga_id: 34, uniquewardid: 242, polling_unit_number: "DT3401009", polling_unit_name: "Agbasa 1", polling_unit_description: "Agbasa 1", lat: "5.904748983", long: "5.725361522", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 20, polling_unit_id: 1, ward_id: 9, lga_id: 35, uniquewardid: 262, polling_unit_number: "DT3501001", polling_unit_name: "Asumbo Town Hall1", polling_unit_description: "Asumbo Town Hall1", lat: "5.879748019", long: "5.73172331", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 21, polling_unit_id: 3, ward_id: 2, lga_id: 22, uniquewardid: 224, polling_unit_number: "DT2202003", polling_unit_name: "Eki-Otoi", polling_unit_description: "Eki-Otoi", lat: "5.876600455", long: "5.729696257", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 22, polling_unit_id: 3, ward_id: 7, lga_id: 6, uniquewardid: 59, polling_unit_number: "DT0607003", polling_unit_name: "Polling 3 in Agbara", polling_unit_description: "Polling 3 in Agbara", lat: "5.900635513", long: "5.72786891", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 31, polling_unit_id: 12, ward_id: 3, lga_id: 34, uniquewardid: 244, polling_unit_number: "DT340312", polling_unit_name: "GRA Ward", polling_unit_description: "GRA Ward", lat: "5.94474279", long: "5.749946582", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" },
  { uniqueid: 35, polling_unit_id: 10, ward_id: 9, lga_id: 35, uniquewardid: 262, polling_unit_number: "DT3509010", polling_unit_name: "Emami Quarter 1", polling_unit_description: "Emami Quarter 1", lat: "5.869546618", long: "5.752899868", entered_by_user: "admin", date_entered: "2011-04-27 09:00:00", user_ip_address: "192.168.1.110" }
];

// Real results from the SQL database
export const mockResults: AnnouncedPuResult[] = [
  // Results for Polling Unit 8 (Sapele Ward 8)
  { result_id: 1, polling_unit_uniqueid: 8, party_abbreviation: "PDP", party_score: 74867, entered_by_user: "admin", date_entered: "2011-04-27 13:54:57", user_ip_address: "192.168.1.101" },
  { result_id: 2, polling_unit_uniqueid: 8, party_abbreviation: "DPP", party_score: 39857, entered_by_user: "admin", date_entered: "2011-04-27 13:54:57", user_ip_address: "192.168.1.101" },
  { result_id: 3, polling_unit_uniqueid: 8, party_abbreviation: "ACN", party_score: 46780, entered_by_user: "admin", date_entered: "2011-04-27 13:54:57", user_ip_address: "192.168.1.101" },
  { result_id: 4, polling_unit_uniqueid: 8, party_abbreviation: "PPA", party_score: 50330, entered_by_user: "admin", date_entered: "2011-04-27 13:54:57", user_ip_address: "192.168.1.101" },
  { result_id: 5, polling_unit_uniqueid: 8, party_abbreviation: "CDC", party_score: 11307, entered_by_user: "admin", date_entered: "2011-04-27 13:54:57", user_ip_address: "192.168.1.101" },
  { result_id: 6, polling_unit_uniqueid: 8, party_abbreviation: "JP", party_score: 5547, entered_by_user: "admin", date_entered: "2011-04-27 13:54:57", user_ip_address: "192.168.1.101" },
  { result_id: 7, polling_unit_uniqueid: 8, party_abbreviation: "ANPP", party_score: 93811, entered_by_user: "admin", date_entered: "2011-04-27 13:54:57", user_ip_address: "192.168.1.101" },
  { result_id: 8, polling_unit_uniqueid: 8, party_abbreviation: "LABOUR", party_score: 52416, entered_by_user: "admin", date_entered: "2011-04-27 13:54:57", user_ip_address: "192.168.1.101" },
  { result_id: 9, polling_unit_uniqueid: 8, party_abbreviation: "CPP", party_score: 80645, entered_by_user: "admin", date_entered: "2011-04-27 13:54:57", user_ip_address: "192.168.1.101" },
  
  // Results for Polling Unit 9 (Primary School in Aghara)
  { result_id: 10, polling_unit_uniqueid: 9, party_abbreviation: "PDP", party_score: 52353, entered_by_user: "admin", date_entered: "2011-04-27 14:20:23", user_ip_address: "192.168.1.101" },
  { result_id: 11, polling_unit_uniqueid: 9, party_abbreviation: "DPP", party_score: 15411, entered_by_user: "admin", date_entered: "2011-04-27 14:20:23", user_ip_address: "192.168.1.101" },
  { result_id: 12, polling_unit_uniqueid: 9, party_abbreviation: "ACN", party_score: 30137, entered_by_user: "admin", date_entered: "2011-04-27 14:20:23", user_ip_address: "192.168.1.101" },
  { result_id: 13, polling_unit_uniqueid: 9, party_abbreviation: "PPA", party_score: 30149, entered_by_user: "admin", date_entered: "2011-04-27 14:20:23", user_ip_address: "192.168.1.101" },
  { result_id: 14, polling_unit_uniqueid: 9, party_abbreviation: "CDC", party_score: 60337, entered_by_user: "admin", date_entered: "2011-04-27 14:20:23", user_ip_address: "192.168.1.101" },
  { result_id: 15, polling_unit_uniqueid: 9, party_abbreviation: "JP", party_score: 11237, entered_by_user: "admin", date_entered: "2011-04-27 14:20:23", user_ip_address: "192.168.1.101" },
  { result_id: 16, polling_unit_uniqueid: 9, party_abbreviation: "ANPP", party_score: 75174, entered_by_user: "admin", date_entered: "2011-04-27 14:20:23", user_ip_address: "192.168.1.101" },
  { result_id: 17, polling_unit_uniqueid: 9, party_abbreviation: "LABOUR", party_score: 42156, entered_by_user: "admin", date_entered: "2011-04-27 14:20:23", user_ip_address: "192.168.1.101" },
  { result_id: 18, polling_unit_uniqueid: 9, party_abbreviation: "CPP", party_score: 85259, entered_by_user: "admin", date_entered: "2011-04-27 14:20:23", user_ip_address: "192.168.1.101" },
  
  // Results for Polling Unit 10 (Ishere Primary School Aghara)  
  { result_id: 19, polling_unit_uniqueid: 10, party_abbreviation: "PDP", party_score: 51093, entered_by_user: "Omawuli", date_entered: "2011-04-27 17:01:31", user_ip_address: "192.168.1.101" },
  { result_id: 20, polling_unit_uniqueid: 10, party_abbreviation: "DPP", party_score: 20155, entered_by_user: "Omawuli", date_entered: "2011-04-27 17:01:31", user_ip_address: "192.168.1.101" },
  { result_id: 21, polling_unit_uniqueid: 10, party_abbreviation: "ACN", party_score: 9495, entered_by_user: "Omawuli", date_entered: "2011-04-27 17:01:31", user_ip_address: "192.168.1.101" },
  { result_id: 22, polling_unit_uniqueid: 10, party_abbreviation: "PPA", party_score: 42179, entered_by_user: "Omawuli", date_entered: "2011-04-27 17:01:31", user_ip_address: "192.168.1.101" },
  { result_id: 23, polling_unit_uniqueid: 10, party_abbreviation: "CDC", party_score: 82406, entered_by_user: "Omawuli", date_entered: "2011-04-27 17:01:31", user_ip_address: "192.168.1.101" },
  { result_id: 24, polling_unit_uniqueid: 10, party_abbreviation: "JP", party_score: 85494, entered_by_user: "Omawuli", date_entered: "2011-04-27 17:01:31", user_ip_address: "192.168.1.101" },
  { result_id: 25, polling_unit_uniqueid: 10, party_abbreviation: "ANPP", party_score: 80250, entered_by_user: "Omawuli", date_entered: "2011-04-27 17:01:31", user_ip_address: "192.168.1.101" },
  { result_id: 26, polling_unit_uniqueid: 10, party_abbreviation: "LABOUR", party_score: 44770, entered_by_user: "Omawuli", date_entered: "2011-04-27 17:01:31", user_ip_address: "192.168.1.101" },
  { result_id: 27, polling_unit_uniqueid: 10, party_abbreviation: "CPP", party_score: 83099, entered_by_user: "Omawuli", date_entered: "2011-04-27 17:01:31", user_ip_address: "192.168.1.101" }
];

// Global results storage for the StoreResults component
export let storedResults: AnnouncedPuResult[] = [...mockResults];

export const addNewResults = (results: Omit<AnnouncedPuResult, 'result_id'>[]) => {
  const newResults = results.map((result, index) => ({
    ...result,
    result_id: storedResults.length + index + 1
  }));
  storedResults = [...storedResults, ...newResults];
  return newResults;
};

export const mockWards: Ward[] = [
  {
    uniqueid: 1,
    ward_id: 1,
    ward_name: "Ward 1",
    lga_id: 1,
    ward_description: "Ward 1 Oshimili North",
    entered_by_user: "admin",
    date_entered: "2011-05-20",
    user_ip_address: "127.0.0.1"
  },
  {
    uniqueid: 2,
    ward_id: 2,
    ward_name: "Ward 2",
    lga_id: 1,
    ward_description: "Ward 2 Oshimili North",
    entered_by_user: "admin",
    date_entered: "2011-05-20",
    user_ip_address: "127.0.0.1"
  }
];