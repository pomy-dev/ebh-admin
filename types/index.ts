export interface Property {
  id: string;
  name: string;
  address: string;
  units: number;
  occupied: number;
  available: number;
  monthlyRent: number;
  imageUrl: string;
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  monthlyRent: number;
  status: 'available' | 'occupied' | 'maintenance';
  tenantId?: string;
  tenantName?: string;
  leaseStart?: string;
  leaseEnd?: string;
  amenities: string[];
  description: string;
  images: string[];
}

export interface RentalApplication {
  id: string;
  propertyId: string;
  propertyName: string;
  unitId?: string;
  unitNumber?: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  priority: 'high' | 'medium' | 'low';
  submittedDate: string;

  // Applicant Information
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    ssn: string; // Last 4 digits only for security
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
  };

  // Employment Information
  employment: {
    employer: string;
    position: string;
    monthlyIncome: number;
    supervisorContact: string;
  };

  // References
  references: {
    name: string;
    relationship: string;
    contact: string;
  }[];

  // Additional Information
  additional: {
    pets: {
      hasPets: boolean;
      petDetails?: string;
    };
    moveInDate: string;
    additionalOccupants: {
      name: string;
      relationship: string;
      age: number;
    }[];
    specialRequests?: string;
  };

  // Documents
  documents: {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedAt: string;
  }[];

  // Review Information
  review?: {
    reviewedBy: string;
    reviewedAt: string;
    decision: 'approved' | 'rejected';
    notes: string;
    conditions?: string[];
  };
}

export interface Payment {
  id: string;
  tenantName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  propertyName: string;
}

export interface Fault {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  dateReported: string;
  propertyName: string;
  unit: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyName: string;
  unit: string;
  monthlyRent: number;
  leaseStart: string;
  leaseEnd: string;
  status: 'active' | 'pending' | 'expired';
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  paymentHistory: {
    totalPaid: number;
    lastPayment: string;
    outstandingBalance: number;
  };
}