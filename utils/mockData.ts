import { Property, Payment, Fault, Tenant } from '@/types';
import { RentalApplication } from '@/types';

export const properties: Property[] = [];

export const payments: Payment[] = [];

export const faults: Fault[] = [];

export const tenants: Tenant[] = [];

export const applications: RentalApplication[] =[];
//  [
//   {
//     id: '1',
//     propertyId: '1',
//     propertyName: 'Sunset Apartments',
//     unitId: '1',
//     unitNumber: '12B',
//     status: 'pending',
//     priority: 'high',
//     submittedDate: '2024-03-15T10:30:00Z',

//     applicant: {
//       firstName: 'Michael',
//       lastName: 'Chen',
//       email: 'michael.chen@email.com',
//       phone: '(555) 123-4567',
//       dateOfBirth: '1990-05-15',
//       ssn: '1234',
//       emergencyContact: {
//         name: 'Linda Chen',
//         phone: '(555) 987-6543',
//         relationship: 'Mother'
//       }
//     },

//     employment: {
//       employer: 'Tech Solutions Inc.',
//       position: 'Software Engineer',
//       monthlyIncome: 8500,
//       supervisorContact: 'supervisor@techsolutions.com'
//     },

//     references: [
//       {
//         name: 'Sarah Johnson',
//         relationship: 'Colleague',
//         contact: 'sarah.johnson@email.com'
//       },
//       {
//         name: 'David Wilson',
//         relationship: 'Friend',
//         contact: '(555) 555-6666'
//       }
//     ],

//     additional: {
//       pets: {
//         hasPets: true,
//         petDetails: 'One small dog (Golden Retriever, 2 years old, house trained)'
//       },
//       moveInDate: '2024-04-01',
//       additionalOccupants: [],
//       specialRequests: 'Would prefer a unit with balcony if available'
//     },

//     documents: [
//       {
//         id: '1',
//         name: 'Driver_License.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-15T10:30:00Z'
//       },
//       {
//         id: '2',
//         name: 'Pay_Stubs_March.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-15T10:32:00Z'
//       },
//       {
//         id: '3',
//         name: 'Credit_Report.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-15T10:35:00Z'
//       }
//     ]
//   },
//   {
//     id: '2',
//     propertyId: '2',
//     propertyName: 'Ocean View Complex',
//     status: 'under-review',
//     priority: 'medium',
//     submittedDate: '2024-03-14T14:20:00Z',

//     applicant: {
//       firstName: 'Emma',
//       lastName: 'Rodriguez',
//       email: 'emma.rodriguez@email.com',
//       phone: '(555) 234-5678',
//       dateOfBirth: '1988-09-22',
//       ssn: '5678',
//       emergencyContact: {
//         name: 'Carlos Rodriguez',
//         phone: '(555) 876-5432',
//         relationship: 'Father'
//       }
//     },

//     employment: {
//       employer: 'Miami General Hospital',
//       position: 'Registered Nurse',
//       monthlyIncome: 6800,
//       supervisorContact: 'nursing@miamigeneral.com'
//     },

//     references: [
//       {
//         name: 'Dr. James Miller',
//         relationship: 'Supervisor',
//         contact: '(555) 444-5555',
//       },
//       {
//         name: 'Lisa Thompson',
//         relationship: 'Colleague',
//         contact: 'lisa.thompson@email.com'
//       }
//     ],

//     additional: {
//       pets: {
//         hasPets: false
//       },
//       moveInDate: '2024-04-15',
//       additionalOccupants: [
//         {
//           name: 'Sofia Rodriguez',
//           relationship: 'Daughter',
//           age: 8
//         }
//       ]
//     },

//     documents: [
//       {
//         id: '4',
//         name: 'ID_Card.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-14T14:20:00Z'
//       },
//       {
//         id: '5',
//         name: 'Employment_Letter.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-14T14:22:00Z'
//       }
//     ]
//   },
//   {
//     id: '3',
//     propertyId: '3',
//     propertyName: 'City Heights',
//     status: 'approved',
//     priority: 'low',
//     submittedDate: '2024-03-10T09:15:00Z',

//     applicant: {
//       firstName: 'Robert',
//       lastName: 'Kim',
//       email: 'robert.kim@email.com',
//       phone: '(555) 345-6789',
//       dateOfBirth: '1985-12-03',
//       ssn: '9012',
//       emergencyContact: {
//         name: 'Jennifer Kim',
//         phone: '(555) 765-4321',
//         relationship: 'Spouse'
//       }
//     },

//     employment: {
//       employer: 'Financial Advisors LLC',
//       position: 'Senior Financial Analyst',
//       monthlyIncome: 9200,
//       supervisorContact: 'hr@financialadvisors.com'
//     },

//     references: [
//       {
//         name: 'Michael Chang',
//         relationship: 'Supervisor',
//         contact: 'm.chang@financialadvisors.com'
//       },
//       {
//         name: 'Amanda Lee',
//         relationship: 'Friend',
//         contact: '(555) 888-9999',
//       }
//     ],

//     additional: {
//       pets: {
//         hasPets: false
//       },
//       moveInDate: '2024-04-01',
//       additionalOccupants: [
//         {
//           name: 'Jennifer Kim',
//           relationship: 'Spouse',
//           age: 32
//         }
//       ]
//     },

//     documents: [
//       {
//         id: '6',
//         name: 'Passport.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-10T09:15:00Z'
//       },
//       {
//         id: '7',
//         name: 'Bank_Statements.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-10T09:18:00Z'
//       },
//       {
//         id: '8',
//         name: 'Reference_Letter.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-10T09:20:00Z'
//       }
//     ],

//     review: {
//       reviewedBy: 'Property Manager',
//       reviewedAt: '2024-03-12T16:30:00Z',
//       decision: 'approved',
//       notes: 'Excellent credit score and stable employment. Strong references from previous landlord.',
//       conditions: ['First month rent and security deposit due before move-in']
//     }
//   },
//   {
//     id: '4',
//     propertyId: '1',
//     propertyName: 'Sunset Apartments',
//     unitNumber: '12B',
//     status: 'rejected',
//     priority: 'low',
//     submittedDate: '2024-03-08T11:45:00Z',

//     applicant: {
//       firstName: 'Alex',
//       lastName: 'Johnson',
//       email: 'alex.johnson@email.com',
//       phone: '(555) 456-7890',
//       dateOfBirth: '1992-07-18',
//       ssn: '3456',
//       emergencyContact: {
//         name: 'Mary Johnson',
//         phone: '(555) 654-3210',
//         relationship: 'Mother'
//       }
//     },

//     employment: {
//       employer: 'Freelance Graphic Design',
//       position: 'Graphic Designer',
//       monthlyIncome: 3200,
//       supervisorContact: 'self-employed'
//     },

//     references: [
//       {
//         name: 'Tom Wilson',
//         relationship: 'Client',
//         contact: 'tom.wilson@email.com'
//       }
//     ],

//     additional: {
//       pets: {
//         hasPets: true,
//         petDetails: 'Two cats'
//       },
//       moveInDate: '2024-04-01',
//       additionalOccupants: []
//     },

//     documents: [
//       {
//         id: '9',
//         name: 'License.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-08T11:45:00Z'
//       }
//     ],

//     review: {
//       reviewedBy: 'Property Manager',
//       reviewedAt: '2024-03-11T14:20:00Z',
//       decision: 'rejected',
//       notes: 'Income does not meet 3x rent requirement. Credit score below minimum threshold. Insufficient documentation provided.'
//     }
//   },
//   {
//     id: '5',
//     propertyId: '1',
//     propertyName: 'Sunset Apartments',
//     unitNumber: '12B',
//     status: 'pending',
//     priority: 'medium',
//     submittedDate: '2024-03-16T08:20:00Z',

//     applicant: {
//       firstName: 'Jessica',
//       lastName: 'Martinez',
//       email: 'jessica.martinez@email.com',
//       phone: '(555) 567-8901',
//       dateOfBirth: '1991-03-12',
//       ssn: '7890',
//       emergencyContact: {
//         name: 'Roberto Martinez',
//         phone: '(555) 098-7654',
//         relationship: 'Father'
//       }
//     },

//     employment: {
//       employer: 'Marketing Solutions Inc.',
//       position: 'Marketing Manager',
//       monthlyIncome: 7200,
//       supervisorContact: 'hr@marketingsolutions.com'
//     },

//     references: [
//       {
//         name: 'Mark Thompson',
//         relationship: 'Supervisor',
//         contact: '(555) 111-2222'
//       },
//       {
//         name: 'Anna Rodriguez',
//         relationship: 'Friend',
//         contact: '(555) 333-4444'
//       }
//     ],

//     additional: {
//       pets: {
//         hasPets: false
//       },
//       moveInDate: '2024-04-15',
//       additionalOccupants: []
//     },

//     documents: [
//       {
//         id: '10',
//         name: 'Drivers_License.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-16T08:20:00Z'
//       },
//       {
//         id: '11',
//         name: 'Employment_Verification.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-16T08:22:00Z'
//       }
//     ]
//   },
//   {
//     id: '6',
//     propertyId: '1',
//     propertyName: 'Sunset Apartments',
//     unitNumber: '12B',
//     status: 'under-review',
//     priority: 'high',
//     submittedDate: '2024-03-17T15:45:00Z',

//     applicant: {
//       firstName: 'Daniel',
//       lastName: 'Park',
//       email: 'daniel.park@email.com',
//       phone: '(555) 678-9012',
//       dateOfBirth: '1987-11-28',
//       ssn: '2468',
//       emergencyContact: {
//         name: 'Susan Park',
//         phone: '(555) 789-0123',
//         relationship: 'Mother'
//       }
//     },

//     employment: {
//       employer: 'Tech Innovations LLC',
//       position: 'Senior Developer',
//       monthlyIncome: 9500,
//       supervisorContact: 'manager@techinnovations.com'
//     },

//     references: [
//       {
//         name: 'Kevin Lee',
//         relationship: 'Supervisor',
//         contact: 'k.lee@techinnovations.com'
//       },
//       {
//         name: 'Michelle Chang',
//         relationship: 'Colleague',
//         contact: '(555) 888-9999'
//       }
//     ],

//     additional: {
//       pets: {
//         hasPets: true,
//         petDetails: 'One cat (indoor, spayed, 3 years old)'
//       },
//       moveInDate: '2024-04-01',
//       additionalOccupants: []
//     },

//     documents: [
//       {
//         id: '12',
//         name: 'Passport.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-17T15:45:00Z'
//       },
//       {
//         id: '13',
//         name: 'Pay_Stubs_Recent.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-17T15:47:00Z'
//       },
//       {
//         id: '14',
//         name: 'Credit_Report_2024.pdf',
//         type: 'pdf',
//         url: '#',
//         uploadedAt: '2024-03-17T15:50:00Z'
//       }
//     ]
//   }
// ];