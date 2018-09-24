import security from '../lib/security';
import FuelsService from '../services/fuels/fuels';

class FuelsRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get(
			'/v1/Fuels',
			security.checkUserScope.bind(this, security.scope.READ_Fuels),
			this.getFuels.bind(this)
		);
	}

	getFuels(req, res, next) {
		FuelsService.getFuels(req.query)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}
}

export default FuelsRoute;
