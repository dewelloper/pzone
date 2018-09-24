import security from '../lib/security';
import MarksService from '../services/marks/marks';

class MarksRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get(
			'/v1/Marks',
			security.checkUserScope.bind(this, security.scope.READ_Marks),
			this.getMarks.bind(this)
		);
		this.router.post(
			'/v1/Marks',
			security.checkUserScope.bind(this, security.scope.WRITE_Marks),
			this.addMark.bind(this)
		);
		this.router.get(
			'/v1/Marks/:id',
			security.checkUserScope.bind(this, security.scope.READ_Marks),
			this.getSingleMark.bind(this)
		);
		this.router.put(
			'/v1/Marks/:id',
			security.checkUserScope.bind(this, security.scope.WRITE_Marks),
			this.updateMark.bind(this)
		);
		this.router.delete(
			'/v1/Marks/:id',
			security.checkUserScope.bind(this, security.scope.WRITE_Marks),
			this.deleteMark.bind(this)
		);
	}

	getMarks(req, res, next) {
		MarksService.getMarks(req.query)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}

	getSingleMark(req, res, next) {
		MarksService.getSingleMark(req.params.id)
			.then(data => {
				if (data) {
					res.send(data);
				} else {
					res.status(404).end();
				}
			})
			.catch(next);
	}

	addMark(req, res, next) {
		MarksService.addMark(req.body)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}

	updateMark(req, res, next) {
		MarksService.updateMark(req.params.id, req.body)
			.then(data => {
				if (data) {
					res.send(data);
				} else {
					res.status(404).end();
				}
			})
			.catch(next);
	}

	deleteMark(req, res, next) {
		MarksService.deleteMark(req.params.id)
			.then(data => {
				res.status(data ? 200 : 404).end();
			})
			.catch(next);
	}
}

export default MarksRoute;
