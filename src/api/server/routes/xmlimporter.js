import security from '../lib/security';
import ImporterService from '../services/xmlimporter/importer';

class ImporterRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get(
			'/v1/xmlimporter',
			security.checkUserScope.bind(this, security.scope.READ_IMPORTER),
			this.importFromOuterAPI.bind(this)
		);
	}

	importFromOuterAPI(req, res, next) {
		ImporterService.importFromOuterAPI(req.query)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}
}

export default ImporterRoute;
