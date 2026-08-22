import { CrisisContact } from '../types';

export const OFFLINE_CRISIS_DIRECTORY: CrisisContact[] = [
  {
    countryCode: 'US',
    countryName: 'United States',
    helplineName: '988 Suicide & Crisis Lifeline',
    phoneNumber: '988',
    smsNumber: '988',
    website: 'https://988lifeline.org',
    availableHours: '24/7 (Free & Confidential)',
  },
  {
    countryCode: 'CA',
    countryName: 'Canada',
    helplineName: '988 Suicide Crisis Helpline',
    phoneNumber: '988',
    smsNumber: '988',
    website: 'https://988.ca',
    availableHours: '24/7 (Bilingual EN/FR)',
  },
  {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    helplineName: 'NHS Mental Health / Samaritans',
    phoneNumber: '111',
    smsNumber: '85258', // SHOUT
    website: 'https://www.samaritans.org',
    availableHours: '24/7 (Free)',
  },
  {
    countryCode: 'DE',
    countryName: 'Germany',
    helplineName: 'TelefonSeelsorge',
    phoneNumber: '0800 111 0 111',
    website: 'https://www.telefonseelsorge.de',
    availableHours: '24/7 (Gebührenfrei)',
  },
  {
    countryCode: 'AU',
    countryName: 'Australia',
    helplineName: 'Lifeline Australia',
    phoneNumber: '13 11 14',
    smsNumber: '0477 13 11 14',
    website: 'https://www.lifeline.org.au',
    availableHours: '24/7',
  },
  {
    countryCode: 'GLOBAL',
    countryName: 'International / Other',
    helplineName: 'Befrienders Worldwide & Find A Helpline',
    phoneNumber: '112',
    website: 'https://findahelpline.com',
    availableHours: 'Directory of 100+ countries',
  },
];
