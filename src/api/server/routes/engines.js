import security from '../lib/security';
import EnginesService from '../services/engines/engines';

class EnginesRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get(
			'/v1/Engines',
			security.checkUserScope.bind(this, security.scope.READ_Engines),
			this.getEngines.bind(this)
		);
	}

	getEngines(req, res, next) {
		EnginesService.getEngines(req.query)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}
}

export default EnginesRoute;
