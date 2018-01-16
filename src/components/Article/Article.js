import React from 'react';
import './Article.scss';

import Markdown from 'react-markdown';

const Article = (props) => {
  return (
    <article className="article-wrapper">
      <Markdown source={props.children} escapeHtml={false} />
    </article>
  );
}

export default Article;
