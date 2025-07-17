// services/supabaseApartmentService.ts
import supabase from "@/utils/supabase/supabase";

import { RentalApplication } from "../types";

export const getPropertyApartments = async () => {
  const { data, error } = await supabase
    .from('tenants_applications')
    .select(`
      *,
      users(
      name,
      email,
      user_number
      ),
      property_apartments (
        unit,
        property_id,
        properties (
          name
        )
      )
    `);

  if (error) throw error;
  return data;
};


export const makeDecition = async (id: string, decision: "approved" | "rejected" | "pending" | "under-review", conditions?: string[]) => {
  // 1. Fetch the approved application with its unit and property info
  const { data: approvedApp, error: fetchError } = await supabase
    .from('tenants_applications')
    .select(`
      *,
      property_apartments (
        unit,
        property_id
      )
    `)
    .eq('id', id)
    .single();

  if (fetchError || !approvedApp) {
    return { data: null, error: fetchError || new Error("Application not found") };
  }

  const unit = approvedApp.property_apartments?.unit;
  const property_id = approvedApp.property_apartments?.property_id;
  const apartment_id = approvedApp.apartment_id;

  // 2. Update the current application
  const { data: updated, error: updateError } = await supabase
    .from('tenants_applications')
    .update({ aproval_status: decision, conditions: conditions , updated_at: new Date().toISOString()})
    .eq('id', id);

  if (updateError) {
    return { data: null, error: updateError };
  }

  // 3. Auto-reject others if decision is "approved"
  if (decision === 'approved' && unit && property_id) {
    const { data: otherApps, error: fetchOthersError } = await supabase
      .from('tenants_applications')
      .select(`
        *,
        property_apartments (
          unit,
          property_id
        )
      `).eq('apartment_id', apartment_id);

    if (fetchOthersError || !otherApps) {
      return { data: updated, error: fetchOthersError };
    }

    const toReject = otherApps.filter(app =>
      app.id !== id &&
      ['pending', 'under-review'].includes(app.aproval_status) &&
      app.property_apartments?.unit === unit &&
      app.property_apartments?.property_id === property_id
    );

    const idsToReject = toReject.map(app => app.id);

    if (idsToReject.length > 0) {
      const { error: rejectError } = await supabase
        .from('tenants_applications')
        .update({
          aproval_status: 'rejected',
          conditions: [`Automatically rejected - Unit ${unit} was awarded to another applicant.`],
          // reviewed_by: 'System Auto-Rejection',
          updated_at: new Date().toISOString()
        })
        .in('id', idsToReject);

      if (rejectError) {
        return { data: updated, error: rejectError };
      }
    }
  }

  return { data: updated, error: null };
};







export async function fetchApplicationsWithProperties(): Promise<RentalApplication[]> {
  const { data: applications, error } = await supabase
    .from("tenants_applications")
    .select(`
      *,
      users(
      name,
      email,
      user_number
      ),
      property_apartments (
        unit,
        property_id,
        properties (
          property_name
        )
      )
    `);

  if (error) {
    console.error("Error fetching applications:", error.message);
    return [];
  }

  return applications.map(app => {
    const [firstName, ...rest] = (app.users.name || "").split(" ");
    const lastName = rest.join(" ");

    // Parse references if stored as JSON string (common)
      let referencesArray: [] = [];
    try {
      if (typeof app.references === 'string') {
        referencesArray = JSON.parse(app.references);
      } else if (Array.isArray(app.references)) {
        referencesArray = app.references;
      } else {
        referencesArray = [];
      }
    } catch {
      referencesArray = [];
    }

    return {
      id: app.id,
      status: app.aproval_status || "pending",
      priority: "medium",
      submittedDate: app.created_at,
      propertyId: app.property_apartments?.property_id,
      propertyName: app.property_apartments?.properties?.property_name|| "",
      unitId: undefined, // Add if needed
      unitNumber: app.property_apartments?.unit,

      applicant: {
        firstName,
        lastName,
        email: app.users.email,
        phone: app.users.user_number,
        dateOfBirth: app.date_of_birth || "", // Add this to your table if needed
        ssn: app.ssn || "", // Last 4 digits only
        emergencyContact: {
          name: app.emergency_name || "",
          phone: app.emergency_contact || "",
          relationship: app.emergency_relationship || "",
        },
      },

      employment: {
        employer: app.employer_name || "",
        position: app.job_position || "",
        monthlyIncome: app.monthly_income || 0,
        supervisorContact: app.supervisor_contact || "",
      },

      references: referencesArray || [],

      additional: {
        pets: {
          hasPets: app.has_pets || false,
          petDetails: app.pet_details || "",
        },
        moveInDate: app.move_in_date || "",
        additionalOccupants: app.additional_occupants || [],
        specialRequests: app.special_requests || "",
      },

      documents: [], // Add actual documents logic if you store them

      review: app.conditions?.length
        ? {
            reviewedBy: "Property Manager",
            reviewedAt: app.updated_at,
            decision: app.aproval_status,
            notes: "Imported from Supabase",
            conditions: app.conditions,
          }
        : undefined,

      conditions: app.conditions || [],
    };
  });
}


