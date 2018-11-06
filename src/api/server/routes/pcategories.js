import security from '../lib/security';
import PcategoriesService from '../services/pcategories/pcategories';

class PcategoriesRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get(
			'/v1/Pcategories',
			security.checkUserScope.bind(this, security.scope.READ_PCATEGORIES),
			this.getPcategories.bind(this)
		);
	}

	getPcategories(req, res, next) {
		PcategoriesService.getPcategories(req.query)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}
}

export default PcategoriesRoute;
