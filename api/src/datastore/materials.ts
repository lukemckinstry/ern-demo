import { MaterialType } from "../utils/models";

export class Materials {
  materials: MaterialType[];

  constructor() {
    this.materials = [];
  }

  list() {
    return this.materials;
  }

  create(newMaterial: MaterialType) {
    this.materials.push(newMaterial);
    return newMaterial;
  }

  delete(id: string) {
    const newArray = this.materials.filter((a) => a.id != id);
    this.materials = newArray;
    return id;
  }

  update(newMaterial: MaterialType) {
    const id = newMaterial.id;
    const newArray = this.materials.filter((a) => a.id != id);
    this.materials = newArray;
    this.materials.push(newMaterial);
    return id;
  }
}
