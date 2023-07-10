import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import MaterialList from './MaterialList';
import {
  createMaterial,
  updateMaterial,
  selectMaterial,
  deleteMaterial
} from '../redux/features/materials';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { CompactPicker } from 'react-color';
import CircleIcon from '@mui/icons-material/Circle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

let MaterialManager = () => {
  const selectedMaterial = useAppSelector(
    (state) => state.materials.selectedMaterial
  );
  const materials = useAppSelector((state) => state.materials.materials);

  const dispatch = useAppDispatch();

  const [materialName, setMaterialName] = useState<string>(
    selectedMaterial?.name || ''
  );
  const [materialVolume, setMaterialVolume] = useState<number>(
    selectedMaterial?.volume || 0
  );
  const [materialColor, setMaterialColor] = useState<string>(
    selectedMaterial?.color || ''
  );
  const [materialCost, setMaterialCost] = useState<number>(
    selectedMaterial?.volume || 0
  );
  const [materialCostInput, setMaterialCostInput] = useState<string>('0');
  const [materialDelivery, setMaterialDelivery] = useState<string>(
    selectedMaterial?.delivery || new Date().toISOString()
  );
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [costErrorFlag, setCostErrorFlag] = useState<boolean>(false);

  const handleMaterialNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaterialName(e.currentTarget.value);
  };
  const handleMaterialColorChange = (color: any) => {
    setShowColorPicker(false);
    setMaterialColor(color.hex);
  };
  const handleMaterialVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = parseInt(e.currentTarget.value) || 0;
    setMaterialVolume(val);
  };
  const handleMaterialCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCostErrorFlag(false);
    setMaterialCostInput(e.currentTarget.value);
  };
  const handleMaterialCostBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = parseFloat(e.currentTarget.value);
    if (!val) {
      setCostErrorFlag(true);
      return;
    }
    setCostErrorFlag(false);
    setMaterialCostInput(val.toString());
    setMaterialCost(val);
  };
  const handleMaterialDeliveryChange = (date: string | undefined) => {
    if (!date) {
      return;
    }
    setMaterialDelivery(date);
  };

  const handleAdd = () => {
    if (costErrorFlag) {
      return;
    }
    const data = {
      name: materialName,
      volume: materialVolume,
      color: materialColor,
      cost: materialCost,
      delivery: materialDelivery
    };
    const args = {
      material: data
    };
    dispatch(createMaterial(args));
    dispatch(selectMaterial(null));
    resetForm();
  };

  const handleUpdate = () => {
    if (!selectedMaterial) {
      return;
    }
    const changes = {
      name: materialName,
      volume: materialVolume,
      color: materialColor,
      cost: materialCost,
      delivery: materialDelivery
    };
    const args = {
      material: selectedMaterial,
      changes: changes
    };
    dispatch(updateMaterial(args));
  };

  const handleDelete = () => {
    if (!selectedMaterial) {
      return;
    }
    const args = {
      material: selectedMaterial
    };
    dispatch(deleteMaterial(args));
    dispatch(selectMaterial(null));
    resetForm();
  };

  const resetForm = () => {
    setMaterialName('');
    setMaterialVolume(0);
    setMaterialColor('');
    setMaterialCost(0);
    setMaterialCostInput('0');
    setMaterialDelivery(new Date().toISOString());
  };

  useEffect(() => {
    setMaterialName(selectedMaterial?.name || '');
    setMaterialVolume(selectedMaterial?.volume || 0);
    setMaterialColor(selectedMaterial?.color || '');
    setMaterialCost(selectedMaterial?.cost || 0);
    setMaterialCostInput(selectedMaterial?.cost?.toString() || '0');
    setMaterialDelivery(selectedMaterial?.delivery || new Date().toISOString());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMaterial]);

  const materialValue = materials.reduce(
    (acc, val) => acc + val.cost * val.volume,
    0
  );

  const materialDeliveryDate: Date =
    typeof materialDelivery === 'string'
      ? new Date(materialDelivery)
      : new Date();

  return (
    <React.Fragment>
      <div className="page-container">
        <div className="container-header">
          <div className="container-header-upper">Materials</div>
          <div className="container-header-lower">
            {selectedMaterial ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                color="success"
                sx={{ borderRadius: 34, marginRight: 2 }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ borderRadius: 34, marginRight: 2 }}
                onClick={handleAdd}
              >
                Add
              </Button>
            )}
            {selectedMaterial && (
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                sx={{ borderRadius: 34 }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
        <div className="outer-container">
          <div className="material-left-column">
            <div className="material-list-container">
              <MaterialList />
            </div>
            <div className="material-value-display">
              <div className="material-value-top">Total Cost:</div>
              <div className="material-value-bottom">${materialValue}</div>
            </div>
          </div>
          <div className="material-detail-container">
            <div className="material-detail-form-row">
              <div className="material-detail-form-section">
                <div className="material-detail-form-label">Name</div>
                <TextField
                  inputProps={{ inputMode: 'text' }}
                  value={materialName}
                  onChange={handleMaterialNameChange}
                  size="small"
                  sx={{
                    input: { color: 'white' },
                    background: '#57606e',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div className="material-detail-form-section">
                <div
                  className="form-color-picker-container"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  <div className="material-detail-form-label">Color</div>
                  <div className="color-picker-main">
                    <div className="color-picker-left">
                      <CircleIcon sx={{ color: materialColor, fontSize: 44 }} />
                    </div>
                    <div className="color-picker-right">{materialColor}</div>
                    {showColorPicker && (
                      <CompactPicker
                        color={materialColor}
                        onChangeComplete={handleMaterialColorChange}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="material-detail-form-row">
              <div className="material-detail-form-section">
                <div className="material-detail-form-label">
                  {' '}
                  {`Volume (m`}
                  <sup>3</sup>
                  {`)`}
                </div>
                <TextField
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={materialVolume}
                  onChange={handleMaterialVolumeChange}
                  size="small"
                  sx={{
                    input: { color: 'white' },
                    background: '#57606e',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div className="material-detail-form-section">
                <div className="material-detail-form-label">
                  {`Cost (USD per m`}
                  <sup>3</sup>
                  {`)`}
                </div>
                <TextField
                  value={materialCostInput}
                  error={costErrorFlag}
                  onChange={handleMaterialCostChange}
                  onBlur={handleMaterialCostBlur}
                  helperText={costErrorFlag ? 'invalid input' : ''}
                  size="small"
                  sx={{
                    input: { color: 'white' },
                    background: '#57606e',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
            <div className="material-detail-form-row">
              <div className="material-detail-form-section">
                <div className="material-detail-form-label">Delivery Date</div>
                <DatePicker
                  selected={materialDeliveryDate}
                  onChange={(date) =>
                    handleMaterialDeliveryChange(date?.toISOString())
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MaterialManager;
