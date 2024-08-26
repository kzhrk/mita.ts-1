import type { GetItems200ResponseInner } from './sample/openapi-generator';
import type { paths, operations } from './sample/openapi-typescript/schema';

const openApiGeneratorItem: GetItems200ResponseInner = {
	id: 1,
	name: '',
}

type Item = paths['/items/{itemId}']['get']['responses']['200']['content']['application/json'];
type Item2 = operations['getItem']['responses']['200']['content']['application/json'];

const openApiTypeScriptItem: Item = openApiGeneratorItem;
const openApiTypeScriptItem2: Item2 = openApiGeneratorItem;
