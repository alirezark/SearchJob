import { createLogger } from '@/modules/core/logging/logger';
import classnames from 'classnames';
import { DocumentInitialProps } from 'next/document';
import Document, { DocumentContext, DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import createEmotionServer, { EmotionCriticalToChunks } from '@emotion/server/create-instance';
import createEmotionCache from '../utils/createEmotionCache';
import App from 'next/app';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const fileLabel = 'pages/_document';
const logger = createLogger({ fileLabel });

type Props = {
  styles: (EmotionCriticalToChunks | Exclude<React.ReactNode, boolean | null | undefined>)[];
  emotionStyleTags: EmotionJSX.Element[];
};

type DocumentGetInitialPropsOutput = Props & DocumentInitialProps;

type DocumentRenderProps = Props & DocumentProps;

export default class AppDocument extends Document<DocumentRenderProps> {
  render(): JSX.Element {
    const {}: DocumentRenderProps = this.props;

    return (
      <Html>
        <Head>{this.props.emotionStyleTags}</Head>
        <body
          dir="rtl"
          className={classnames(
            // XXX Those variables are added to grant more flexibility if ever needed. They're not used at the moment
            'nrn', // All styles are bound to this, if you remove/rename, it'll break all CSS in src/components/appBootstrap/MultiversalGlobalStyles.tsx
            `${process.env.NEXT_PUBLIC_APP_NAME}`, // From package.json:name

            // Localisation-based styles are very useful (e.g: resize text based on locale or language)
            // For customer/stage/version based styles, could be handy in rare cases
            `stage-${process.env.NEXT_PUBLIC_APP_STAGE}`,
            `${process.env.NEXT_PUBLIC_APP_VERSION_RELEASE}`
          )}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

AppDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentGetInitialPropsOutput> => {
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps: DocumentInitialProps = await Document.getInitialProps(ctx);

  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles: EmotionCriticalToChunks = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...emotionStyleTags, ...React.Children.toArray(initialProps.styles)],
    emotionStyleTags,
  };
};
