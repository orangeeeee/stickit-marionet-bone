underscore.jsのtemplateの記載方法を変更する。

template setting soruce of underscore.js
```javascript
  
  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };


```

変更するロジック

    _.templateSettings = {
        evaluate: /\{\{([\s\S]+?)\}\}/g,
        interpolate: /\{\{=([\s\S]+?)\}\}/g,
        escape: /\{\{-([\s\S]+?)\}\}/g
    };



\s	スペース、タブ、改ページ、改行を含む 1 個のホワイトスペース文字にマッチします。
\S	ホワイトスペース以外の 1 文字にマッチします。
+	直前の文字の 1 回以上の繰り返しにマッチします。{1,} に相当します。
?	直前の文字の 0 回か 1 回の出現にマッチします。{0,1} に相当します。