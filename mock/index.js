const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

app.use(async (ctx, next) => {
  if (ctx.path.startsWith('/api')) {
    ctx.set('Content-Type', 'application/json');
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTION');
  }
  await next();
});

// /api/home-list
router.get('/api/home-list', (ctx) => {
  ctx.body = {
    list: [
      {
        id: 1,
        name: '张三'
      },
      {
        id: 2,
        name: '李四'
      },
      {
        id: 3,
        name: '王五'
      }
    ]
  };
  ctx.status = 200;
});

// /api/about-list
router.get('/api/about-list', (ctx) => {
  ctx.body = {
    list: [
      {
        id: 1,
        name: '张二'
      },
      {
        id: 2,
        name: '李三'
      },
      {
        id: 3,
        name: '王四'
      }
    ]
  };
  ctx.status = 200;
});

// /api/user-list
router.get('/api/user-list', (ctx) => {
  ctx.body = {
    list: [
      {
        id: 1,
        name: '张大'
      },
      {
        id: 2,
        name: '李二'
      },
      {
        id: 3,
        name: '王三'
      }
    ]
  };
  ctx.status = 200;
});

app.use(router.routes());

app.listen(3010, () => {
  console.log('mock服务已启动, 端口:', 3010);
});
