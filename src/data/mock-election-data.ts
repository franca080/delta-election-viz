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

// Mock data for Delta State (state_id: 25)
export const mockLGAs: LGA[] = [
  {
    uniqueid: 1,
    lga_id: 1,
    lga_name: "Oshimili North",
    state_id: 25,
    lga_description: "Oshimili North Local Government Area",
    entered_by_user: "admin",
    date_entered: "2011-05-20",
    user_ip_address: "127.0.0.1"
  },
  {
    uniqueid: 2,
    lga_id: 2,
    lga_name: "Oshimili South",
    state_id: 25,
    lga_description: "Oshimili South Local Government Area",
    entered_by_user: "admin",
    date_entered: "2011-05-20",
    user_ip_address: "127.0.0.1"
  },
  {
    uniqueid: 3,
    lga_id: 3,
    lga_name: "Aniocha North",
    state_id: 25,
    lga_description: "Aniocha North Local Government Area",
    entered_by_user: "admin",
    date_entered: "2011-05-20",
    user_ip_address: "127.0.0.1"
  },
  {
    uniqueid: 4,
    lga_id: 4,
    lga_name: "Aniocha South",
    state_id: 25,
    lga_description: "Aniocha South Local Government Area",
    entered_by_user: "admin",
    date_entered: "2011-05-20",
    user_ip_address: "127.0.0.1"
  },
  {
    uniqueid: 5,
    lga_id: 5,
    lga_name: "Warri North",
    state_id: 25,
    lga_description: "Warri North Local Government Area",
    entered_by_user: "admin",
    date_entered: "2011-05-20",
    user_ip_address: "127.0.0.1"
  },
  {
    uniqueid: 6,
    lga_id: 6,
    lga_name: "Warri South",
    state_id: 25,
    lga_description: "Warri South Local Government Area",
    entered_by_user: "admin",
    date_entered: "2011-05-20",
    user_ip_address: "127.0.0.1"
  }
];

export const mockParties: Party[] = [
  { id: 1, partyid: "PDP", partyname: "People's Democratic Party" },
  { id: 2, partyid: "APC", partyname: "All Progressives Congress" },
  { id: 3, partyid: "LP", partyname: "Labour Party" },
  { id: 4, partyid: "APGA", partyname: "All Progressives Grand Alliance" },
  { id: 5, partyid: "NNPP", partyname: "New Nigeria Peoples Party" },
  { id: 6, partyid: "YPP", partyname: "Young Progressive Party" }
];

export const mockPollingUnits: PollingUnit[] = [
  {
    uniqueid: 1,
    polling_unit_id: 8,
    ward_id: 1,
    lga_id: 1,
    uniquewardid: 1,
    polling_unit_number: "08",
    polling_unit_name: "Ward 1 Unit 1",
    polling_unit_description: "Primary School Polling Unit",
    lat: "6.1950",
    long: "6.6988",
    entered_by_user: "admin",
    date_entered: "2011-05-20 10:00:00",
    user_ip_address: "127.0.0.1"
  },
  {
    uniqueid: 2,
    polling_unit_id: 9,
    ward_id: 1,
    lga_id: 1,
    uniquewardid: 1,
    polling_unit_number: "09",
    polling_unit_name: "Ward 1 Unit 2",
    polling_unit_description: "Community Hall Polling Unit",
    lat: "6.1955",
    long: "6.6985",
    entered_by_user: "admin",
    date_entered: "2011-05-20 10:05:00",
    user_ip_address: "127.0.0.1"
  },
  {
    uniqueid: 3,
    polling_unit_id: 10,
    ward_id: 2,
    lga_id: 1,
    uniquewardid: 2,
    polling_unit_number: "10",
    polling_unit_name: "Ward 2 Unit 1",
    polling_unit_description: "Secondary School Polling Unit",
    lat: "6.2000",
    long: "6.7000",
    entered_by_user: "admin",
    date_entered: "2011-05-20 10:10:00",
    user_ip_address: "127.0.0.1"
  }
];

export const mockResults: AnnouncedPuResult[] = [
  // Results for Polling Unit 1
  { result_id: 1, polling_unit_uniqueid: 1, party_abbreviation: "PDP", party_score: 150, entered_by_user: "admin", date_entered: "2011-05-20 15:00:00", user_ip_address: "127.0.0.1" },
  { result_id: 2, polling_unit_uniqueid: 1, party_abbreviation: "APC", party_score: 120, entered_by_user: "admin", date_entered: "2011-05-20 15:00:00", user_ip_address: "127.0.0.1" },
  { result_id: 3, polling_unit_uniqueid: 1, party_abbreviation: "LP", party_score: 85, entered_by_user: "admin", date_entered: "2011-05-20 15:00:00", user_ip_address: "127.0.0.1" },
  { result_id: 4, polling_unit_uniqueid: 1, party_abbreviation: "APGA", party_score: 45, entered_by_user: "admin", date_entered: "2011-05-20 15:00:00", user_ip_address: "127.0.0.1" },
  
  // Results for Polling Unit 2
  { result_id: 5, polling_unit_uniqueid: 2, party_abbreviation: "PDP", party_score: 200, entered_by_user: "admin", date_entered: "2011-05-20 15:30:00", user_ip_address: "127.0.0.1" },
  { result_id: 6, polling_unit_uniqueid: 2, party_abbreviation: "APC", party_score: 180, entered_by_user: "admin", date_entered: "2011-05-20 15:30:00", user_ip_address: "127.0.0.1" },
  { result_id: 7, polling_unit_uniqueid: 2, party_abbreviation: "LP", party_score: 95, entered_by_user: "admin", date_entered: "2011-05-20 15:30:00", user_ip_address: "127.0.0.1" },
  { result_id: 8, polling_unit_uniqueid: 2, party_abbreviation: "APGA", party_score: 55, entered_by_user: "admin", date_entered: "2011-05-20 15:30:00", user_ip_address: "127.0.0.1" },
  
  // Results for Polling Unit 3
  { result_id: 9, polling_unit_uniqueid: 3, party_abbreviation: "PDP", party_score: 175, entered_by_user: "admin", date_entered: "2011-05-20 16:00:00", user_ip_address: "127.0.0.1" },
  { result_id: 10, polling_unit_uniqueid: 3, party_abbreviation: "APC", party_score: 160, entered_by_user: "admin", date_entered: "2011-05-20 16:00:00", user_ip_address: "127.0.0.1" },
  { result_id: 11, polling_unit_uniqueid: 3, party_abbreviation: "LP", party_score: 90, entered_by_user: "admin", date_entered: "2011-05-20 16:00:00", user_ip_address: "127.0.0.1" },
  { result_id: 12, polling_unit_uniqueid: 3, party_abbreviation: "APGA", party_score: 50, entered_by_user: "admin", date_entered: "2011-05-20 16:00:00", user_ip_address: "127.0.0.1" }
];

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