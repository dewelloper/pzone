import security from '../lib/security';
import ModelsService from '../services/models/models';

class ModelsRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get(
			'/v1/Models',
			security.checkUserScope.bind(this, security.scope.READ_Models),
			this.getModels.bind(this)
		);
	}

	getModels(req, res, next) {
		ModelsService.getModels(req.query)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}
}

export default ModelsRoute;
