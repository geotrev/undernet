import React from 'react';
import './Article.scss';

import Markdown from 'react-markdown';

const Article = (props) => {
  return (
    <article className="article-wrapper collapsed column">
      <Markdown source={props.children} escapeHtml={false} />
    </article>
  );
}

export default Article;
