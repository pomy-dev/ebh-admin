import supabase from "@/utils/supabase/supabase";

// CRUD operations for properties
export async function insertProperty(data) {
  const response = await supabase.from("properties").insert([data]).select('*').single();
  if (response.error) {
    console.error("Error inserting property:", response.error);
    return response.error;
  }
  return response.data; // returns full object with `data` and `error`
}

export async function getAllProperties() {
  const { data, error } = await supabase.from("properties").select("*");
  if (error) return error;
  return data;
}

export async function getPropertyById(id) {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}

export async function updateProperty(id, updates) {
  const { data, error } = await supabase
    .from("properties")
    .update(updates)
    .eq("id", id);
  return { data, error };
}

export async function deleteProperty(id) {
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) {
    console.error("Error deleting property:", error);
    return error;
  }
}

// CRUD operations for units
export async function insertUnit(units) {
  const response = await supabase.from("property_apartments").insert([units]).select('*').single();
  const data = await supabase.from("property_apartments").insert([units]).select('*');
  if (response.error) {
    console.error("Error inserting unit:", response.error);
    return response.error;
  }
  console.log('Response from insertUnit:', response);
  console.log('Data from insertUnit:', data);
  return response.data; // returns full object with `data` and `error`
}

export async function getUnitsByPropertyId(id) {
  const { data, error } = await supabase
    .from("property_apartments")
    .select("*, properties(monthly_rent, property_name, street_address, city, states, zip_code, amenities)")
    .eq("property_id", id);
  if (error) {
    console.error("Error fetching units:", error);
    return error;
  }
  console.log('Data from getUnitsByPropertyId:', data);
  return data;
}
