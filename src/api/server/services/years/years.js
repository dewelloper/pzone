import { ObjectID } from 'mongodb';
import url from 'url';
import settings from '../../lib/settings';
import { db } from '../../lib/mongo';
import utils from '../../lib/utils';
import parse from '../../lib/parse';
import SettingsService from '../settings/settings';

const DEFAULT_SORT = { is_system: -1, date_created: 1 };

class YearsService {
	constructor() {}

	async getYears(params = {}) {
		const items = await db
			.collection('tt_cars')
			.distinct('startyear', { brand: params.marks, model: params.models });
		return items;
	}
}

export default new YearsService();
