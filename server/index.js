import fs from 'fs';
import Koa from 'koa';
import path from 'path';
import React from 'react';
import KoaRouter from 'koa-router';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom';

import App from '../src/app';
import routes from '../src/route';
import { StyleContext } from '../src/styles';
import { getServerStore } from '../src/store';

// 服务
const app = new Koa();

// 路由
const router = new KoaRouter();
// 静态文件
router.get('/public/(.*)', (ctx) => {
  ctx.body = fs.readFileSync(path.resolve(__dirname, `..${ctx.path}`));
  if (ctx.path.endsWith('.js')) {
    ctx.set('Content-Type', 'application/javascript');
  } else if (ctx.path.endsWith('.css')) {
    ctx.set('Content-Type', 'text/css');
  } else if (ctx.path.endsWith('.ico')) {
    ctx.set('Content-Type', 'image/vnd.microsoft.icon');
  } else if (ctx.path.endsWith('.jpg') || ctx.path.endsWith('.jpeg')) {
    ctx.set('Content-Type', 'image/jpeg');
  } else if (ctx.path.endsWith('.png')) {
    ctx.set('Content-Type', 'image/png');
  }
});
// 页面路由
router.get('/(.*)', async (ctx) => {
  // 降级渲染
  // if (Math.random() < 0.2) {
  //   console.log('服务端降级渲染...');
  //   ctx.body = fs.readFileSync(
  //     path.resolve(__dirname, '../public/index.csr.html')
  //   );
  //   ctx.set('Content-Type', 'text/html');
  //   return;
  // }
  // store
  const store = getServerStore();
  // 获取数据
  const promises = [];
  routes.some((r) => {
    const match = matchPath(ctx.path, r);
    if (match) {
      const { loadData } = r.component;
      if (loadData) {
        promises.push(loadData(store));
      }
    }
    return match;
  });
  await Promise.all(promises).then(() => {
    // css处理
    const css = new Set();
    const insertCss = (...ss) => ss.forEach((s) => css.add(s._getCss()));
    // 页面
    const Pages = (
      <Provider store={store}>
        <StyleContext.Provider value={{ insertCss }}>
          <StaticRouter location={ctx.path}>
            <App>
              <Switch>
                {routes.map((r) => (
                  <Route {...r}></Route>
                ))}
              </Switch>
            </App>
          </StaticRouter>
        </StyleContext.Provider>
      </Provider>
    );
    // render
    const template = renderToString(Pages);
    // html内容
    ctx.body = `
    <html>
      <head>
        <title>react ssr</title>
        <link rel="shortcut icon" href="./public/favicon.ico">
        <style>${[...css].join('')}</style>
      </head>
      <body>
        <div id="root">${template}</div>
        <script>window.__ctx__ = ${JSON.stringify(store.getState())}</script>
        <script src="./public/bundle.js"></script>
      </body>
    </html>
    `;
  });
});

app.use(router.routes()).listen(3000, () => {
  console.log('服务器已启动, 端口：', 3000);
});
