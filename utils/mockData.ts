import { Property, Payment, Fault, Tenant } from '@/types';
import { RentalApplication } from '@/types';

export const properties: Property[] = [
  {
    id: '1',
    name: 'Sunset Apartments',
    address: '123 Sunset Blvd, Los Angeles, CA 90028',
    units: 50,
    occupied: 45,
    available: 5,
    monthlyRent: 2500,
    imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'
  },
  {
    id: '2',
    name: 'Ocean View Complex',
    address: '456 Beach Road, Miami, FL 33139',
    units: 75,
    occupied: 70,
    available: 5,
    monthlyRent: 3000,
    imageUrl: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg'
  },
  {
    id: '3',
    name: 'City Heights',
    address: '789 Downtown Ave, New York, NY 10001',
    units: 100,
    occupied: 92,
    available: 8,
    monthlyRent: 3500,
    imageUrl: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg'
  }
];

export const payments: Payment[] = [
  {
    id: '1',
    tenantName: 'John Doe',
    amount: 2500,
    date: '2024-03-01',
    status: 'paid',
    propertyName: 'Sunset Apartments'
  },
  {
    id: '2',
    tenantName: 'Jane Smith',
    amount: 3000,
    date: '2024-03-02',
    status: 'pending',
    propertyName: 'Ocean View Complex'
  },
  {
    id: '3',
    tenantName: 'Mike Johnson',
    amount: 3500,
    date: '2024-02-28',
    status: 'overdue',
    propertyName: 'City Heights'
  },
  {
    id: '4',
    tenantName: 'Sarah Wilson',
    amount: 2500,
    date: '2024-03-01',
    status: 'paid',
    propertyName: 'Sunset Apartments'
  },
  {
    id: '5',
    tenantName: 'David Brown',
    amount: 3000,
    date: '2024-03-03',
    status: 'paid',
    propertyName: 'Ocean View Complex'
  },
  {
    id: '6',
    tenantName: 'Emily Davis',
    amount: 3500,
    date: '2024-03-01',
    status: 'pending',
    propertyName: 'City Heights'
  }
];

export const faults: Fault[] = [
  {
    id: '1',
    title: 'Leaking Faucet',
    description: 'Kitchen sink faucet is constantly dripping',
    status: 'open',
    priority: 'medium',
    dateReported: '2024-03-01',
    propertyName: 'Sunset Apartments',
    unit: '12B'
  },
  {
    id: '2',
    title: 'AC Not Working',
    description: 'Air conditioning unit not cooling properly',
    status: 'in-progress',
    priority: 'high',
    dateReported: '2024-03-02',
    propertyName: 'Ocean View Complex',
    unit: '45A'
  },
  {
    id: '3',
    title: 'Light Fixture Replacement',
    description: 'Bathroom light fixture needs replacement',
    status: 'resolved',
    priority: 'low',
    dateReported: '2024-02-28',
    propertyName: 'City Heights',
    unit: '23C'
  }
];

export const tenants: Tenant[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    propertyName: 'Sunset Apartments',
    unit: '12B',
    monthlyRent: 2500,
    leaseStart: '2023-06-01',
    leaseEnd: '2024-05-31',
    status: 'active',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '(555) 987-6543',
      relationship: 'Spouse'
    },
    paymentHistory: {
      totalPaid: 22500,
      lastPayment: '2024-03-01',
      outstandingBalance: 0
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '(555) 234-5678',
    propertyName: 'Ocean View Complex',
    unit: '45A',
    monthlyRent: 3000,
    leaseStart: '2023-08-15',
    leaseEnd: '2024-08-14',
    status: 'active',
    emergencyContact: {
      name: 'Robert Smith',
      phone: '(555) 876-5432',
      relationship: 'Father'
    },
    paymentHistory: {
      totalPaid: 21000,
      lastPayment: '2024-02-01',
      outstandingBalance: 3000
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '(555) 345-6789',
    propertyName: 'City Heights',
    unit: '23C',
    monthlyRent: 3500,
    leaseStart: '2023-09-01',
    leaseEnd: '2024-08-31',
    status: 'active',
    emergencyContact: {
      name: 'Lisa Johnson',
      phone: '(555) 765-4321',
      relationship: 'Sister'
    },
    paymentHistory: {
      totalPaid: 21000,
      lastPayment: '2024-01-28',
      outstandingBalance: 7000
    }
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '(555) 456-7890',
    propertyName: 'Sunset Apartments',
    unit: '8A',
    monthlyRent: 2500,
    leaseStart: '2023-07-01',
    leaseEnd: '2024-06-30',
    status: 'active',
    emergencyContact: {
      name: 'Mark Wilson',
      phone: '(555) 654-3210',
      relationship: 'Brother'
    },
    paymentHistory: {
      totalPaid: 20000,
      lastPayment: '2024-03-01',
      outstandingBalance: 0
    }
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '(555) 567-8901',
    propertyName: 'Ocean View Complex',
    unit: '67B',
    monthlyRent: 3000,
    leaseStart: '2023-10-01',
    leaseEnd: '2024-09-30',
    status: 'active',
    emergencyContact: {
      name: 'Mary Brown',
      phone: '(555) 543-2109',
      relationship: 'Mother'
    },
    paymentHistory: {
      totalPaid: 15000,
      lastPayment: '2024-03-03',
      outstandingBalance: 0
    }
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 678-9012',
    propertyName: 'City Heights',
    unit: '89D',
    monthlyRent: 3500,
    leaseStart: '2023-11-15',
    leaseEnd: '2024-11-14',
    status: 'active',
    emergencyContact: {
      name: 'Tom Davis',
      phone: '(555) 432-1098',
      relationship: 'Father'
    },
    paymentHistory: {
      totalPaid: 14000,
      lastPayment: '2024-02-15',
      outstandingBalance: 3500
    }
  },
  {
    id: '7',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@email.com',
    phone: '(555) 789-0123',
    propertyName: 'Sunset Apartments',
    unit: '34C',
    monthlyRent: 2500,
    leaseStart: '2023-05-01',
    leaseEnd: '2024-04-30',
    status: 'pending',
    emergencyContact: {
      name: 'Maria Rodriguez',
      phone: '(555) 321-0987',
      relationship: 'Spouse'
    },
    paymentHistory: {
      totalPaid: 25000,
      lastPayment: '2024-03-01',
      outstandingBalance: 0
    }
  },
  {
    id: '8',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    phone: '(555) 890-1234',
    propertyName: 'Ocean View Complex',
    unit: '12F',
    monthlyRent: 3000,
    leaseStart: '2022-12-01',
    leaseEnd: '2023-11-30',
    status: 'expired',
    emergencyContact: {
      name: 'John Thompson',
      phone: '(555) 210-9876',
      relationship: 'Brother'
    },
    paymentHistory: {
      totalPaid: 36000,
      lastPayment: '2023-11-01',
      outstandingBalance: 0
    }
  }
];

export const applications: RentalApplication[] = [
  {
    id: '1',
    propertyId: '1',
    propertyName: 'Sunset Apartments',
    unitId: '1',
    unitNumber: '12B',
    status: 'pending',
    priority: 'high',
    submittedDate: '2024-03-15T10:30:00Z',

    applicant: {
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1990-05-15',
      ssn: '1234',
      emergencyContact: {
        name: 'Linda Chen',
        phone: '(555) 987-6543',
        relationship: 'Mother'
      }
    },

    employment: {
      employer: 'Tech Solutions Inc.',
      position: 'Software Engineer',
      monthlyIncome: 8500,
      supervisorContact: 'supervisor@techsolutions.com'
    },

    references: [
      {
        name: 'Sarah Johnson',
        relationship: 'Colleague',
        contact: 'sarah.johnson@email.com'
      },
      {
        name: 'David Wilson',
        relationship: 'Friend',
        contact: '(555) 555-6666'
      }
    ],

    additional: {
      pets: {
        hasPets: true,
        petDetails: 'One small dog (Golden Retriever, 2 years old, house trained)'
      },
      moveInDate: '2024-04-01',
      additionalOccupants: [],
      specialRequests: 'Would prefer a unit with balcony if available'
    },

    documents: [
      {
        id: '1',
        name: 'Driver_License.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'Pay_Stubs_March.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-15T10:32:00Z'
      },
      {
        id: '3',
        name: 'Credit_Report.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-15T10:35:00Z'
      }
    ]
  },
  {
    id: '2',
    propertyId: '2',
    propertyName: 'Ocean View Complex',
    status: 'under-review',
    priority: 'medium',
    submittedDate: '2024-03-14T14:20:00Z',

    applicant: {
      firstName: 'Emma',
      lastName: 'Rodriguez',
      email: 'emma.rodriguez@email.com',
      phone: '(555) 234-5678',
      dateOfBirth: '1988-09-22',
      ssn: '5678',
      emergencyContact: {
        name: 'Carlos Rodriguez',
        phone: '(555) 876-5432',
        relationship: 'Father'
      }
    },

    employment: {
      employer: 'Miami General Hospital',
      position: 'Registered Nurse',
      monthlyIncome: 6800,
      supervisorContact: 'nursing@miamigeneral.com'
    },

    references: [
      {
        name: 'Dr. James Miller',
        relationship: 'Supervisor',
        contact: '(555) 444-5555',
      },
      {
        name: 'Lisa Thompson',
        relationship: 'Colleague',
        contact: 'lisa.thompson@email.com'
      }
    ],

    additional: {
      pets: {
        hasPets: false
      },
      moveInDate: '2024-04-15',
      additionalOccupants: [
        {
          name: 'Sofia Rodriguez',
          relationship: 'Daughter',
          age: 8
        }
      ]
    },

    documents: [
      {
        id: '4',
        name: 'ID_Card.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-14T14:20:00Z'
      },
      {
        id: '5',
        name: 'Employment_Letter.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-14T14:22:00Z'
      }
    ]
  },
  {
    id: '3',
    propertyId: '3',
    propertyName: 'City Heights',
    status: 'approved',
    priority: 'low',
    submittedDate: '2024-03-10T09:15:00Z',

    applicant: {
      firstName: 'Robert',
      lastName: 'Kim',
      email: 'robert.kim@email.com',
      phone: '(555) 345-6789',
      dateOfBirth: '1985-12-03',
      ssn: '9012',
      emergencyContact: {
        name: 'Jennifer Kim',
        phone: '(555) 765-4321',
        relationship: 'Spouse'
      }
    },

    employment: {
      employer: 'Financial Advisors LLC',
      position: 'Senior Financial Analyst',
      monthlyIncome: 9200,
      supervisorContact: 'hr@financialadvisors.com'
    },

    references: [
      {
        name: 'Michael Chang',
        relationship: 'Supervisor',
        contact: 'm.chang@financialadvisors.com'
      },
      {
        name: 'Amanda Lee',
        relationship: 'Friend',
        contact: '(555) 888-9999',
      }
    ],

    additional: {
      pets: {
        hasPets: false
      },
      moveInDate: '2024-04-01',
      additionalOccupants: [
        {
          name: 'Jennifer Kim',
          relationship: 'Spouse',
          age: 32
        }
      ]
    },

    documents: [
      {
        id: '6',
        name: 'Passport.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-10T09:15:00Z'
      },
      {
        id: '7',
        name: 'Bank_Statements.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-10T09:18:00Z'
      },
      {
        id: '8',
        name: 'Reference_Letter.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-10T09:20:00Z'
      }
    ],

    review: {
      reviewedBy: 'Property Manager',
      reviewedAt: '2024-03-12T16:30:00Z',
      decision: 'approved',
      notes: 'Excellent credit score and stable employment. Strong references from previous landlord.',
      conditions: ['First month rent and security deposit due before move-in']
    }
  },
  {
    id: '4',
    propertyId: '1',
    propertyName: 'Sunset Apartments',
    unitNumber: '12B',
    status: 'rejected',
    priority: 'low',
    submittedDate: '2024-03-08T11:45:00Z',

    applicant: {
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@email.com',
      phone: '(555) 456-7890',
      dateOfBirth: '1992-07-18',
      ssn: '3456',
      emergencyContact: {
        name: 'Mary Johnson',
        phone: '(555) 654-3210',
        relationship: 'Mother'
      }
    },

    employment: {
      employer: 'Freelance Graphic Design',
      position: 'Graphic Designer',
      monthlyIncome: 3200,
      supervisorContact: 'self-employed'
    },

    references: [
      {
        name: 'Tom Wilson',
        relationship: 'Client',
        contact: 'tom.wilson@email.com'
      }
    ],

    additional: {
      pets: {
        hasPets: true,
        petDetails: 'Two cats'
      },
      moveInDate: '2024-04-01',
      additionalOccupants: []
    },

    documents: [
      {
        id: '9',
        name: 'License.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-08T11:45:00Z'
      }
    ],

    review: {
      reviewedBy: 'Property Manager',
      reviewedAt: '2024-03-11T14:20:00Z',
      decision: 'rejected',
      notes: 'Income does not meet 3x rent requirement. Credit score below minimum threshold. Insufficient documentation provided.'
    }
  },
  {
    id: '5',
    propertyId: '1',
    propertyName: 'Sunset Apartments',
    unitNumber: '12B',
    status: 'pending',
    priority: 'medium',
    submittedDate: '2024-03-16T08:20:00Z',

    applicant: {
      firstName: 'Jessica',
      lastName: 'Martinez',
      email: 'jessica.martinez@email.com',
      phone: '(555) 567-8901',
      dateOfBirth: '1991-03-12',
      ssn: '7890',
      emergencyContact: {
        name: 'Roberto Martinez',
        phone: '(555) 098-7654',
        relationship: 'Father'
      }
    },

    employment: {
      employer: 'Marketing Solutions Inc.',
      position: 'Marketing Manager',
      monthlyIncome: 7200,
      supervisorContact: 'hr@marketingsolutions.com'
    },

    references: [
      {
        name: 'Mark Thompson',
        relationship: 'Supervisor',
        contact: '(555) 111-2222'
      },
      {
        name: 'Anna Rodriguez',
        relationship: 'Friend',
        contact: '(555) 333-4444'
      }
    ],

    additional: {
      pets: {
        hasPets: false
      },
      moveInDate: '2024-04-15',
      additionalOccupants: []
    },

    documents: [
      {
        id: '10',
        name: 'Drivers_License.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-16T08:20:00Z'
      },
      {
        id: '11',
        name: 'Employment_Verification.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-16T08:22:00Z'
      }
    ]
  },
  {
    id: '6',
    propertyId: '1',
    propertyName: 'Sunset Apartments',
    unitNumber: '12B',
    status: 'under-review',
    priority: 'high',
    submittedDate: '2024-03-17T15:45:00Z',

    applicant: {
      firstName: 'Daniel',
      lastName: 'Park',
      email: 'daniel.park@email.com',
      phone: '(555) 678-9012',
      dateOfBirth: '1987-11-28',
      ssn: '2468',
      emergencyContact: {
        name: 'Susan Park',
        phone: '(555) 789-0123',
        relationship: 'Mother'
      }
    },

    employment: {
      employer: 'Tech Innovations LLC',
      position: 'Senior Developer',
      monthlyIncome: 9500,
      supervisorContact: 'manager@techinnovations.com'
    },

    references: [
      {
        name: 'Kevin Lee',
        relationship: 'Supervisor',
        contact: 'k.lee@techinnovations.com'
      },
      {
        name: 'Michelle Chang',
        relationship: 'Colleague',
        contact: '(555) 888-9999'
      }
    ],

    additional: {
      pets: {
        hasPets: true,
        petDetails: 'One cat (indoor, spayed, 3 years old)'
      },
      moveInDate: '2024-04-01',
      additionalOccupants: []
    },

    documents: [
      {
        id: '12',
        name: 'Passport.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-17T15:45:00Z'
      },
      {
        id: '13',
        name: 'Pay_Stubs_Recent.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-17T15:47:00Z'
      },
      {
        id: '14',
        name: 'Credit_Report_2024.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-03-17T15:50:00Z'
      }
    ]
  }
];