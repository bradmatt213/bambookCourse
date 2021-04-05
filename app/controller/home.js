'use strict';
const BaseController = require('./base');
class HomeController extends BaseController {
    async index() {
        const { ctx } = this;
        ctx.body = {
            msg: "hello huihui"
        }
    }
}

module.exports = HomeController;
