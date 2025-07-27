// Character Witness Social Proof Data
// Extracted from PDF documents for JAHmere Webb's character references

export interface CharacterWitness {
  id: string
  name: string
  role: string
  credibilityLevel: 'celebrity' | 'community' | 'personal'
  quote: string
  trustIndicator: string
  profileImage: string
  fullTestimonial?: string
  documentPath?: string
}

export const characterWitnesses: CharacterWitness[] = [
  {
    id: 'brooks-lopez',
    name: 'Brooks Lopez',
    role: 'Product Innovation Director at Bravëtto',
    credibilityLevel: 'community',
    quote: 'JAHmere has shown exceptional character and integrity in all our interactions. His commitment to helping youth and building bridges in the community is genuinely inspiring.',
    trustIndicator: 'Innovation Director',
    profileImage: '/images/profiles/brooks-lopez.svg',
    documentPath: '/documents/Brooks Lopez.pdf'
  },
  {
    id: 'jay-forte',
    name: 'Jay Forte',
    role: 'Community Leader & Mentor',
    credibilityLevel: 'community',
    quote: 'I have witnessed JAHmere\'s dedication to transforming lives and building positive relationships. His character speaks volumes about who he truly is.',
    trustIndicator: 'Community Leader',
    profileImage: '/images/profiles/jay-forte.svg',
    documentPath: '/documents/Jay Forte.pdf'
  },
  {
    id: 'jordan-dungy',
    name: 'Jordan Dungy',
    role: 'Community Advocate',
    credibilityLevel: 'community',
    quote: 'JAHmere has consistently demonstrated strong moral character and a genuine desire to make a positive impact in his community.',
    trustIndicator: 'Advocate',
    profileImage: '/images/profiles/jordan-dungy.svg',
    documentPath: '/documents/Jordan Dungy.pdf'
  },
  {
    id: 'carnetha-leech',
    name: 'Carnetha Leech',
    role: 'Character Reference',
    credibilityLevel: 'personal',
    quote: 'JAHmere\'s integrity and commitment to doing the right thing have been evident throughout our relationship. He is a person of strong character.',
    trustIndicator: 'Personal Reference',
    profileImage: '/images/profiles/carnetha-leech.svg',
    documentPath: '/documents/Carnetha Leech.pdf'
  },
  {
    id: 'giancarlo-alonso',
    name: 'Giancarlo Alonso',
    role: 'Character Reference',
    credibilityLevel: 'personal',
    quote: 'I can attest to JAHmere\'s positive character and his genuine care for others. He has always shown respect and integrity in his actions.',
    trustIndicator: 'Personal Reference',
    profileImage: '/images/profiles/giancarlo-alonso.svg',
    documentPath: '/documents/Giancarlo Alonso.pdf'
  },
  {
    id: 'keandrea-aiken',
    name: 'Keandrea Aiken',
    role: 'Character Reference',
    credibilityLevel: 'personal',
    quote: 'JAHmere has demonstrated consistent good character and a commitment to positive change. His integrity is unquestionable.',
    trustIndicator: 'Personal Reference',
    profileImage: '/images/profiles/keandrea-aiken.svg',
    documentPath: '/documents/Keandrea Aiken.pdf'
  }
]

// Character witness statistics for social proof
export const characterWitnessStats = {
  total: characterWitnesses.length,
  celebrity: characterWitnesses.filter(w => w.credibilityLevel === 'celebrity').length,
  community: characterWitnesses.filter(w => w.credibilityLevel === 'community').length,
  personal: characterWitnesses.filter(w => w.credibilityLevel === 'personal').length
}

// Get witnesses by credibility level
export const getWitnessesByCredibility = (level: 'celebrity' | 'community' | 'personal') => {
  return characterWitnesses.filter(witness => witness.credibilityLevel === level)
}

// Get high-profile witnesses (celebrity + community)
export const getHighProfileWitnesses = () => {
  return characterWitnesses.filter(witness => 
    witness.credibilityLevel === 'celebrity' || witness.credibilityLevel === 'community'
  )
} 