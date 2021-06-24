const Koa = require("koa");
const path = require("path");
const Router = require("koa-router");
const views = require("koa-views");
const serve = require("koa-static");
const globalRouter = require("./src/router");
const globalDB = require("./src/db");
const nunjucks = require("nunjucks");
const bodyParser = require('koa-body');
const cors = require('@koa/cors');
const { koaSwagger } = require('koa2-swagger-ui');
const errorCatcher = require('./src/middlewares/errorCatcher');
const port = process.env.PORT || 3001;

const app = new Koa();
const router = new Router();

const passport = require('./src/libs/passport/koaPassport');
passport.initialize();

const nunjucksEnvironment = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(path.join(__dirname, "/src/pages"))
);

const render = views(path.join(__dirname, "/src/pages"), {
  extention: "html",
  options: {
    nunjucksEnv: nunjucksEnvironment,
  },
  map: {
    html: "nunjucks",
  },
});

app.use(serve('docs'));
app.use(koaSwagger({
  routePrefix: '/docs',
  hideTopbar: true,
  swaggerOptions: {
    url: 'http://localhost:3001/docs.yml',
  },
}));

app.use(errorCatcher);
var options = {
    origin: '*'
};

app.use(cors(options));
app.use(bodyParser({
  formidable:{
    uploadDir: __dirname + '/uploads'},
  multipart: true,
  urlencoded: true,
  formLimit: '2mb',
}));

app.use(render);
app.use(serve(path.join(__dirname, '/src/public')));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err) {
      ctx.throw(400, err.message);
    }
    ctx.throw(400, 'Something wrong');
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
});

//router.use('/users', require('./src/users/users.router'));

app.use(router.middleware());

router.use("/", globalRouter.router.routes());
app.use(router.routes());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});