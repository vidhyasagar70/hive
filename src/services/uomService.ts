import { UOM, ApiResponse } from "../types/uomtypes";

// Helper function to get the auth token from localStorage
const getAuthToken = () => localStorage.getItem("authToken") || "";

// Get API URL from .env file
const API_URL = process.env.REACT_APP_API_URL || "https://api-agamhive.agamvanigam.com";

// Fetch UOMs
export async function fetchUomData(): Promise<ApiResponse<UOM[]>> {
  const token = getAuthToken();
  if (!token) return { error: "Unauthorized. Please log in." };

  try {
    const response = await fetch(`${API_URL}/uoms`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const jsonResponse = await response.json();
    if (!response.ok) {
      return { error: jsonResponse.msg || "Failed to fetch UOMs." };
    }

    return { data: jsonResponse.data.data || [] };
  } catch (error) {
    return { error: "Network error. Please try again." };
  }
}

// Create a new UOM
export async function createUom(uom: UOM): Promise<ApiResponse<UOM>> {
  const token = getAuthToken();
  if (!token) return { error: "Unauthorized. Please log in." };

  try {
    const response = await fetch(`${API_URL}/uoms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(uom),
    });

    const data = await response.json();
    return response.ok ? { data } : { error: data?.msg || "Failed to create UOM." };
  } catch (error) {
    return { error: "Network error. Please check your connection and try again." };
  }
}

// Update a UOM
export async function updateUom(id: string, uom: UOM): Promise<ApiResponse<UOM>> {
    const token = getAuthToken();
    if (!token) return { error: "Unauthorized. Please log in." };
  
    // ✅ Ensure request format exactly matches Swagger
    const requestBody = {
      code: uom.code,
      name: uom.name,
      status: uom.status,
      updatedAt: new Date().toISOString(), // Some APIs require timestamps
    };
  
    console.log(`🔄 Updating UOM at: ${API_URL}/users/${id}`);
    console.log("📤 Request Body:", JSON.stringify(requestBody, null, 2));
    console.log("🔑 Auth Token:", token);
  
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
      console.log("📥 API Response:", data);
  
      if (!response.ok) {
        console.error("❌ Update Failed:", data?.msg || "Unknown error");
        return { error: data?.msg || "Failed to update UOM." };
      }
  
      return { data };
    } catch (error) {
      console.error("❌ Network error:", error);
      return { error: "Network error. Please try again." };
    }
  }
  

// Delete a UOM
export async function deleteUom(id: string): Promise<ApiResponse<null>> {
  const token = getAuthToken();
  if (!token) return { error: "Unauthorized. Please log in." };

  try {
    const response = await fetch(`${API_URL}/uoms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok ? { data: null } : { error: "Failed to delete UOM." };
  } catch (error) {
    return { error: "Network error. Please try again." };
  }
}
