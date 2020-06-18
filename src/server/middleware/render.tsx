import escapeStringRegexp from 'escape-string-regexp';
import { Request, Response } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import App from '../../App';
import { StaticRouter } from 'react-router-dom';

const renderMiddleware = () => (req: Request, res: Response) => {
  let html = req.html || '';
  const routerContext = {};
  const sheet = new ServerStyleSheet();
  const htmlContent = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter location={req.url} context={routerContext}>
        <App />
      </StaticRouter>
    )
  );
  const htmlReplacements: StringMap = {
    HTML_CONTENT: htmlContent,
    STYLE_TAGS: sheet.getStyleTags()
  };

  Object.keys(htmlReplacements).forEach(key => {
    const value = htmlReplacements[key];
    html = html.replace(
      new RegExp('__' + escapeStringRegexp(key) + '__', 'g'),
      value
    );
  });

  // @ts-ignore
  if (routerContext.url) {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    // @ts-ignore
    res.redirect(302, routerContext.url);
  } else {
    res.send(html);
  }
};

export default renderMiddleware;
