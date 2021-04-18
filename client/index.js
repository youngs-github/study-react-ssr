import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from '../src/app';
import routes from '../src/route';
import { StyleContext } from '../src/styles';
import { getClientStore } from '../src/store';

// css处理
const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

const Pages = (
  <Provider store={getClientStore()}>
    <StyleContext.Provider value={{ insertCss }}>
      <BrowserRouter>
        <App>
          <Switch>
            {routes.map((r) => (
              <Route {...r}></Route>
            ))}
          </Switch>
        </App>
      </BrowserRouter>
    </StyleContext.Provider>
  </Provider>
);

// 判断是否ssr
if (window.__ctx__) {
  ReactDOM.hydrate(Pages, document.getElementById('root'));
} else {
  ReactDOM.render(Pages, document.getElementById('root'));
}
