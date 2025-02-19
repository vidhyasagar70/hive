import React, { useEffect, useState } from "react";
import { fetchUomData, createUom, updateUom, deleteUom } from "../services/uomService";
import { UOM } from "../types/uomtypes";

const UOMMaster: React.FC = () => {
  const [uomData, setUomData] = useState<UOM[]>([]);
  const [newUom, setNewUom] = useState<UOM>({ code: "", name: "", status: "" });
  const [editingUom, setEditingUom] = useState<UOM | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUoms = async () => {
      setIsLoading(true);
      const result = await fetchUomData();
      if (result.error) {
        setError(result.error);
      } else {
        setUomData(result.data || []);
      }
      setIsLoading(false);
    };

    loadUoms();
  }, []);

  const handleAddUom = async () => {
    if (!newUom.code || !newUom.name || !newUom.status) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const result = await createUom(newUom);
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setUomData([...uomData, result.data]);
      setNewUom({ code: "", name: "", status: "" });
    }
    setIsLoading(false);
  };
  const handleEditUom = async () => {
    if (!editingUom?._id) {
      console.error("Editing UOM ID is missing!");
      alert("UOM ID is missing!");
      return;
    }
  
    console.log("Editing UOM:", editingUom);
  
    setIsLoading(true);
    const result = await updateUom(editingUom._id, editingUom);
  
    if (result.error) {
      console.error("Update Error:", result.error);
      setError(result.error);
    } else {
      console.log("UOM updated successfully:", result.data);
      setUomData(uomData.map((u) => (u._id === editingUom._id ? (result.data as UOM) : u)));
      setEditingUom(null);
    }
  
    setIsLoading(false);
  };
  

  const handleDeleteUom = async (id: string) => {
    setIsLoading(true);
    const result = await deleteUom(id);
    if (!result.error) {
      setUomData(uomData.filter((u) => u._id !== id));
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>UOM Master</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Add UOM Form */}
      <div>
        <input type="text" placeholder="Code" value={newUom.code} onChange={(e) => setNewUom({ ...newUom, code: e.target.value })} />
        <input type="text" placeholder="Name" value={newUom.name} onChange={(e) => setNewUom({ ...newUom, name: e.target.value })} />
        <input type="text" placeholder="Status" value={newUom.status} onChange={(e) => setNewUom({ ...newUom, status: e.target.value })} />
        <button onClick={handleAddUom} disabled={isLoading}>{isLoading ? "Adding..." : "Add UOM"}</button>
      </div>

      {/* Edit UOM Form */}
      {editingUom && (
        <div>
          <h3>Edit UOM</h3>
          <input type="text" value={editingUom.code} onChange={(e) => setEditingUom({ ...editingUom, code: e.target.value })} />
          <input type="text" value={editingUom.name} onChange={(e) => setEditingUom({ ...editingUom, name: e.target.value })} />
          <input type="text" value={editingUom.status} onChange={(e) => setEditingUom({ ...editingUom, status: e.target.value })} />
          <button onClick={handleEditUom} disabled={isLoading}>{isLoading ? "Updating..." : "Update UOM"}</button>
          <button onClick={() => setEditingUom(null)}>Cancel</button>
        </div>
      )}

      {/* UOM List */}
      <ul>
        {uomData.map((u) => (
          <li key={u._id}>
            {u.code} - {u.name} - {u.status}
            <button onClick={() => setEditingUom(u)}>Edit</button>
            <button onClick={() => handleDeleteUom(u._id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UOMMaster;
