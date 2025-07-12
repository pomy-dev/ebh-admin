import supabase from "@/utils/supabase/supabase";
import { uploadFileToStorage } from "@/utils/uploads";

// CRUD operations for properties
export async function insertProperty(data) {
  const response = await supabase
    .from("properties")
    .insert([data])
    .select("*")
    .single();
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
  // Check if the property was found
  if (error) {
    console.error("Error fetching property by ID:", error);
    return error;
  }

  return data;
}

export async function updateProperty(id, updates) {
  const { data, error } = await supabase
    .from("properties")
    .update(updates)
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error updating property:", error);
    return error;
  }

  return data;
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
  console.log("Inserting unit:", units);
  const images = units.images || [];
  const unitImages = await Promise.all(
    images.map(async (image) => {
      const imgPublicUrl = await uploadFileToStorage("apartments", image);
      if (!imgPublicUrl) {
        console.error("Failed to upload image");
        return null;
      }
      return imgPublicUrl; // Return the public URL of the uploaded image
    })
  );

  const response = await supabase
    .from("property_apartments")
    .insert([
      {
        unit: units.unitNumber,
        property_id: units.propertyId,
        status: units.status,
        numberOfbedRooms: units.bedrooms,
        numberOfBath: units.bathrooms,
        monthly_rent: units.monthlyRent,
        squareFeet: units.squareFeet,
        unitImages: unitImages.filter((url) => url !== null),
      },
    ])
    .select("*")
    .single();

  if (response.error) {
    console.error("Error inserting unit:", response.error);
    return response.error;
  }

  return response.data; // returns full object with `data` and `error`
}

export async function getUnitsByPropertyId(id) {
  const { data, error } = await supabase
    .from("property_apartments")
    .select(
      "*, properties(property_name, street_address, city, states, zip_code, amenities, rules)"
    )
    .eq("property_id", id);
  if (error) {
    console.error("Error fetching units:", error);
    return error;
  }
  console.log("Data from getUnitsByPropertyId:", data);
  return data;
}

export async function updateUnit(id, updates) {
  const images = updates.unitImages || [];
  const unitImages = await Promise.all(
    images.map(async (image) => {
      // Check if the image is a URL or a file object
      if (typeof image === 'string' && image.startsWith('https://')) {
        return image; // If it's already a URL, return it directly
      } else {
        return await uploadFileToStorage('apartments', image);
      } // Return the public URL of the uploaded image
    })
  );

  const { data, error } = await supabase
    .from("property_apartments")
    .update({
      unit: updates.unit,
      status: updates.status,
      numberOfbedRooms: updates.numberOfbedRooms,
      numberOfBath: updates.numberOfBath,
      monthly_rent: updates.monthly_rent,
      squareFeet: updates.squareFeet,
      unitImages: unitImages.filter(url => url !== null),
      updated_at: new Date().toISOString()
    }).eq("id", id)
    .select().single();

  if (error) {
    console.error("Error updating unit:", error);
    return error;
  }
  return data;
}
