// Mock data for the real estate platform
// In a real application, this would be fetched from a blockchain or API

export const categories = [
  { 
    id: 'beachside', 
    name: 'Beachside',
    icon: '🏖️',
  },
  { 
    id: 'luxury', 
    name: 'Luxury',
    icon: '💎',
  },
  { 
    id: 'rooftop', 
    name: 'Rooftop',
    icon: '🏙️',
  },
  { 
    id: 'apartment', 
    name: 'Apartment',
    icon: '🏢',
  }
]

export const properties = [
  {
    id: 'prop-001',
    name: 'Oceanfront Villa',
    location: 'Miami, FL',
    price: 185.5,
    area: 350,
    category: 'beachside',
    imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sold: false,
    description: 'Luxurious oceanfront villa with direct beach access and panoramic views of the Atlantic Ocean.',
    features: ['Private Pool', 'Beachfront', '5 Bedrooms', '6 Bathrooms', 'Smart Home'],
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: 'prop-002',
    name: 'Skyline Penthouse',
    location: 'New York, NY',
    price: 320.8,
    area: 280,
    category: 'luxury',
    imageUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sold: false,
    description: 'Stunning penthouse with 360-degree views of the Manhattan skyline, featuring premium finishes and smart home technology.',
    features: ['Rooftop Terrace', '3 Bedrooms', 'Floor-to-ceiling Windows', 'Smart Home', 'Concierge Service'],
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: 'prop-003',
    name: 'Sunset Rooftop Suite',
    location: 'Los Angeles, CA',
    price: 145.2,
    area: 180,
    category: 'rooftop',
    imageUrl: 'https://images.pexels.com/photos/1714430/pexels-photo-1714430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sold: true,
    description: 'Modern rooftop apartment in downtown LA with a private terrace offering spectacular sunset views over the city.',
    features: ['Private Terrace', '2 Bedrooms', 'Open Floor Plan', 'Designer Kitchen', 'Smart Home'],
    owner: '0x8f8dD7DB83f4B5A5f9687D293465D9591ddD6D14'
  },
  {
    id: 'prop-004',
    name: 'Harbor View Apartment',
    location: 'San Francisco, CA',
    price: 215.6,
    area: 220,
    category: 'apartment',
    imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sold: false,
    description: 'Elegant apartment with breathtaking views of the San Francisco Bay and Golden Gate Bridge.',
    features: ['Bay Views', '3 Bedrooms', 'Gourmet Kitchen', 'Building Gym', 'Parking'],
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: 'prop-005',
    name: 'Tropical Beach House',
    location: 'Maui, HI',
    price: 430.0,
    area: 400,
    category: 'beachside',
    imageUrl: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sold: false,
    description: 'Spectacular beachfront property in Maui with direct beach access and stunning views of the Pacific Ocean.',
    features: ['Beach Access', 'Infinity Pool', '4 Bedrooms', 'Outdoor Kitchen', 'Landscaped Gardens'],
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: 'prop-006',
    name: 'Mountain View Chalet',
    location: 'Aspen, CO',
    price: 560.75,
    area: 550,
    category: 'luxury',
    imageUrl: 'https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sold: false,
    description: 'Luxurious mountain chalet with panoramic views of the Rockies, perfect for all seasons.',
    features: ['Mountain Views', 'Hot Tub', '6 Bedrooms', 'Home Theater', 'Wine Cellar'],
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: 'prop-007',
    name: 'Downtown Loft',
    location: 'Chicago, IL',
    price: 127.9,
    area: 175,
    category: 'apartment',
    imageUrl: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sold: false,
    description: 'Stylish urban loft in downtown Chicago with industrial design elements and modern amenities.',
    features: ['High Ceilings', 'Exposed Brick', '2 Bedrooms', 'Building Gym', 'Roof Deck'],
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: 'prop-008',
    name: 'Sky Garden Penthouse',
    location: 'Seattle, WA',
    price: 290.3,
    area: 300,
    category: 'rooftop',
    imageUrl: 'https://images.pexels.com/photos/4119830/pexels-photo-4119830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sold: false,
    description: 'Contemporary penthouse with a private rooftop garden offering panoramic views of the Seattle skyline and Puget Sound.',
    features: ['Rooftop Garden', '3 Bedrooms', 'Home Office', 'Smart Home', 'Private Elevator'],
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  }
]

// Mock user portfolio (properties owned by the user)
export const userPortfolio = [
  {
    id: 'prop-003',
    name: 'Sunset Rooftop Suite',
    location: 'Los Angeles, CA',
    price: 145.2,
    purchasePrice: 122.5,
    purchaseDate: '2023-09-15',
    area: 180,
    category: 'rooftop',
    imageUrl: 'https://images.pexels.com/photos/1714430/pexels-photo-1714430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tokenId: '0x7c39f4...',
    currentValue: 152.8,
    appreciation: '+24.7%'
  }
]

// Mock user listings (properties listed for sale by the user)
export const userListings = [
  {
    id: 'prop-009',
    name: 'Riverside Cottage',
    location: 'Portland, OR',
    price: 165.0,
    listedDate: '2024-02-10',
    area: 210,
    category: 'luxury',
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tokenId: '0x9e23a5...',
    views: 145,
    offers: 3
  },
  {
    id: 'prop-010',
    name: 'Urban Studio',
    location: 'Austin, TX',
    price: 82.5,
    listedDate: '2024-03-05',
    area: 90,
    category: 'apartment',
    imageUrl: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tokenId: '0x3f79b2...',
    views: 78,
    offers: 1
  }
]