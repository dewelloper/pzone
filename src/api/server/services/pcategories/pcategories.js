import { ObjectID } from 'mongodb';
import url from 'url';
import settings from '../../lib/settings';
import { db } from '../../lib/mongo';
import utils from '../../lib/utils';
import parse from '../../lib/parse';
import SettingsService from '../settings/settings';

const DEFAULT_SORT = { is_system: -1, date_created: 1 };

class PcategoriesService {
	constructor() {}

	
	async getPcategories(params = {}) {
		const items = await db.collection('productCategories').find({}, {_id: 1, name: 1 }).toArray();
		return items;
	}
}

export default new PcategoriesService();
