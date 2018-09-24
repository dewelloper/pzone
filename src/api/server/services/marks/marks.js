import { ObjectID } from 'mongodb';
import url from 'url';
import settings from '../../lib/settings';
import { db } from '../../lib/mongo';
import utils from '../../lib/utils';
import parse from '../../lib/parse';
import SettingsService from '../settings/settings';

const DEFAULT_SORT = { is_system: -1, date_created: 1 };

class MarksService {
	constructor() {}

	getFilter(params = {}) {
		let filter = {};
		const id = parse.getObjectIDIfValid(params.id);
		const tags = parse.getString(params.tags);
		if (id) {
			filter._id = new ObjectID(id);
		}
		if (tags && tags.length > 0) {
			filter.tags = tags;
		}
		return filter;
	}

	getSortQuery({ sort }) {
		if (sort && sort.length > 0) {
			const fields = sort.split(',');
			return Object.assign(
				...fields.map(field => ({
					[field.startsWith('-') ? field.slice(1) : field]: field.startsWith(
						'-'
					)
						? -1
						: 1
				}))
			);
		} else {
			return DEFAULT_SORT;
		}
	}

	async getMarks(params = {}) {
		const items = await db.collection('tt_cars').distinct('brand');
		return items;
	}

	getSingleMark(id) {
		if (!ObjectID.isValid(id)) {
			return Promise.reject('Invalid identifier');
		}
		return this.getMarks({ id: id }).then(Marks => {
			return Marks.length > 0 ? Marks[0] : null;
		});
	}

	addMark(data) {
		return this.getValidDocumentForInsert(data).then(Mark =>
			db
				.collection('Marks')
				.insertMany([Mark])
				.then(res => this.getSingleMark(res.ops[0]._id.toString()))
		);
	}

	updateMark(id, data) {
		if (!ObjectID.isValid(id)) {
			return Promise.reject('Invalid identifier');
		}
		const MarkObjectID = new ObjectID(id);

		return this.getValidDocumentForUpdate(id, data).then(Mark =>
			db
				.collection('Marks')
				.updateOne({ _id: MarkObjectID }, { $set: Mark })
				.then(res => this.getSingleMark(id))
		);
	}

	deleteMark(id) {
		if (!ObjectID.isValid(id)) {
			return Promise.reject('Invalid identifier');
		}
		const MarkObjectID = new ObjectID(id);
		return db
			.collection('Marks')
			.deleteOne({ _id: MarkObjectID, is_system: false })
			.then(deleteResponse => {
				return deleteResponse.deletedCount > 0;
			});
	}

	getValidDocumentForInsert(data) {
		let Mark = {
			is_system: false,
			date_created: new Date()
		};

		Mark.content = parse.getString(data.content);
		Mark.meta_description = parse.getString(data.meta_description);
		Mark.meta_title = parse.getString(data.meta_title);
		Mark.enabled = parse.getBooleanIfValid(data.enabled, true);
		Mark.tags = parse.getArrayIfValid(data.tags) || [];

		let slug =
			!data.slug || data.slug.length === 0 ? data.meta_title : data.slug;
		if (!slug || slug.length === 0) {
			return Promise.resolve(Mark);
		} else {
			return utils.getAvailableSlug(slug, null, false).then(newSlug => {
				Mark.slug = newSlug;
				return Mark;
			});
		}
	}

	getValidDocumentForUpdate(id, data) {
		if (Object.keys(data).length === 0) {
			return Promise.reject('Required fields are missing');
		} else {
			return this.getSingleMark(id).then(prevMarkData => {
				let Mark = {
					date_updated: new Date()
				};

				if (data.content !== undefined) {
					Mark.content = parse.getString(data.content);
				}

				if (data.meta_description !== undefined) {
					Mark.meta_description = parse.getString(data.meta_description);
				}

				if (data.meta_title !== undefined) {
					Mark.meta_title = parse.getString(data.meta_title);
				}

				if (data.enabled !== undefined && !prevMarkData.is_system) {
					Mark.enabled = parse.getBooleanIfValid(data.enabled, true);
				}

				if (data.tags !== undefined) {
					Mark.tags = parse.getArrayIfValid(data.tags) || [];
				}

				if (data.slug !== undefined && !prevMarkData.is_system) {
					let slug = data.slug;
					if (!slug || slug.length === 0) {
						slug = data.meta_title;
					}

					return utils.getAvailableSlug(slug, id, false).then(newSlug => {
						Mark.slug = newSlug;
						return Mark;
					});
				} else {
					return Mark;
				}
			});
		}
	}

	changeProperties(item, domain) {
		if (item) {
			item.id = item._id.toString();
			item._id = undefined;

			if (!item.slug) {
				item.slug = '';
			}

			item.url = url.resolve(domain, `/${item.slug}`);
			item.path = url.resolve('/', item.slug);
		}

		return item;
	}
}

export default new MarksService();
