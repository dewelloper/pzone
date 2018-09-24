import security from '../lib/security';
import YearsService from '../services/years/years';

class YearsRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get(
			'/v1/Years',
			security.checkUserScope.bind(this, security.scope.READ_Years),
			this.getYears.bind(this)
		);
	}

	getYears(req, res, next) {
		YearsService.getYears(req.query)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}
}

export default YearsRoute;
