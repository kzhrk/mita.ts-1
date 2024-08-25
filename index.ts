import type { Pet, ShowPetById200Response } from './sample/typescript-axios';
import type { paths } from './sample/openapi-typescript/schema';

const pet: Pet = {
	id: 1,
	name: '',
}
const response: ShowPetById200Response = {
  id: 1,
  name: '',
  tag: '',
}

type PetByOpenAPITypeScript = paths['/pets/{petId}']['get']['responses']['200']['content']['application/json'];
const pet2: PetByOpenAPITypeScript = pet;
