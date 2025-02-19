





import React, { useEffect, useState } from "react";
import { fetchUomData, createUom, updateUom, deleteUom } from "../services/uomService";
import { UOM } from "../types/uomtypes";

const UOMMaster: React.FC = () => {
  const [uomData, setUomData] = useState<UOM[]>([]);
  const [newUom, setNewUom] = useState<UOM>({ code: "", name: "", status: "" });
  const [editingUom, setEditingUom] = useState<UOM | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null); // Track which item is being deleted
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(false); // Trigger re-fetch

  useEffect(() => {
    const loadUoms = async () => {
      const result = await fetchUomData();
      if (result.error) {
        setError(result.error);
      } else {
        setUomData(result.data || []);
      }
    };
    loadUoms();
  }, [reloadFlag]);

  const handleAddUom = async () => {
    if (!newUom.code || !newUom.name || !newUom.status) {
      alert("Please fill in all fields");
      return;
    }

    setIsAdding(true);
    const result = await createUom(newUom);
    if (result.error) {
      setError(result.error);
    } else {
      setNewUom({ code: "", name: "", status: "" });
      setReloadFlag((prev) => !prev);
    }
    setIsAdding(false);
  };

  const handleEditUom = async () => {
    if (!editingUom?._id) {
      alert("UOM ID is missing!");
      return;
    }

    setIsUpdating(true);
    const result = await updateUom(editingUom._id, editingUom);
    if (result.error) {
      setError(result.error);
    } else {
      setEditingUom(null);
      setReloadFlag((prev) => !prev);
    }
    setIsUpdating(false);
  };

  const handleDeleteUom = async (id: string) => {
    setDeletingId(id); // Track the item being deleted
    const result = await deleteUom(id);
    if (!result.error) {
      setReloadFlag((prev) => !prev);
    } else {
      setError(result.error);
    }
    setDeletingId(null);
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
        <button onClick={handleAddUom} disabled={isAdding}>{isAdding ? "Adding..." : "Add UOM"}</button>
      </div>

      {/* Edit UOM Form */}
      {editingUom && (
        <div>
          <h3>Edit UOM</h3>
          <input type="text" value={editingUom.code} onChange={(e) => setEditingUom({ ...editingUom, code: e.target.value })} />
          <input type="text" value={editingUom.name} onChange={(e) => setEditingUom({ ...editingUom, name: e.target.value })} />
          <input type="text" value={editingUom.status} onChange={(e) => setEditingUom({ ...editingUom, status: e.target.value })} />
          <button onClick={handleEditUom} disabled={isUpdating}>{isUpdating ? "Updating..." : "Update UOM"}</button>
          <button onClick={() => setEditingUom(null)}>Cancel</button>
        </div>
      )}

      {/* UOM List */}
      <ul style={{marginTop:"20px"}}>
        {uomData.map((u) => (
          <li key={u._id} style={{marginBottom:"10px"}}>
            {u.code} - {u.name} - {u.status}
            <button onClick={() => setEditingUom(u)} style={{margin:"0 20px",padding:"2px"}}>Edit</button>
            <button onClick={() => handleDeleteUom(u._id!)} disabled={deletingId === u._id} style={{margin:"0 20px",padding:"5px"}}>
              {deletingId === u._id ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UOMMaster;
