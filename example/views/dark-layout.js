export default function (body, state) {
  const { title } = state;

  return /*html*/ `
<!doctype html>
<head>
  <meta charset="utf-8" />
  <title>${title || 'Default title'}</title>
  <link rel="icon" href="https://fav.farm/🎩" />
  <style>
    body {
      text-align: center;
      background: Black;
      filter: invert(100%) hue-rotate(180deg);
    }
  </style>
</head>
<body>${body}</body>
      `;
}
