export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  duration: string;
  estimatedFee?: string;
  category: 'cosmetic' | 'restorative' | 'preventive' | 'orthodontics';
  longDescription: string;
}

export interface Dentist {
  id: string;
  name: string;
  role: string;
  credentials: string;
  specialty: string;
  education: string[];
  bio: string;
  avatar: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  treatment: string;
  verified: boolean;
}

export interface DentalConcern {
  id: string;
  title: string;
  description: string;
  recommendedServiceIds: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  dentistId: string;
  date: string;
  timeSlot: string;
  note?: string;
  status: 'confirmed' | 'pending';
  timestamp: number;
}
