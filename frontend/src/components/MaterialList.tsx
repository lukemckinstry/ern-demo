import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchMaterials, selectMaterial } from '../redux/features/materials';
import { Material } from '../redux/models';
import CircleIcon from '@mui/icons-material/Circle';

let MaterialList = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const materials = useAppSelector((state) => state.materials.materials);
  const materialsStatus = useAppSelector((state) => state.materials.status);
  const selectedMaterial = useAppSelector(
    (state) => state.materials.selectedMaterial
  );

  const dispatch = useAppDispatch();

  const doSelectMaterial = (material: Material) => {
    if (selectedMaterial && material.id === selectedMaterial.id) {
      dispatch(selectMaterial(null));
      return;
    }
    dispatch(selectMaterial(material));
  };

  useEffect(() => {
    if (materialsStatus === 'idle') {
      dispatch(fetchMaterials());
    }
  }, [materialsStatus, dispatch]);

  const renderMaterial = (material: Material) => {
    return (
      <div
        className="material-list-item-container"
        key={material.id}
        ref={wrapperRef}
        onClick={() => doSelectMaterial(material)}
        style={{
          backgroundColor:
            selectedMaterial && material.id === selectedMaterial.id
              ? '#4542f5'
              : '#1d1f24'
        }}
      >
        <div className="material-list-item-container-left">
          <CircleIcon
            sx={{ color: material.color || '#FFFFFF', fontSize: 32 }}
          />
        </div>
        <div className="material-list-item-container-right">
          <div>{material.name}</div>
          <div>
            {material.volume} m<sup>3</sup>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="materials-list">
      {materialsStatus === 'loading'
        ? 'loading...'
        : materialsStatus === 'succeeded' || materialsStatus === 'idle'
        ? materials.map(renderMaterial)
        : 'error'}
    </div>
  );
};

export default MaterialList;
