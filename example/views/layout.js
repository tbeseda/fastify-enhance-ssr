export default function (body, state) {
  return /*html*/ `
    <!doctype html>
    <head>
      <meta charset="utf-8" />
      <title>Default title</title>
      <link rel="icon" href="https://fav.farm/✨" />
      <style>
        body {
          text-align: center;
        }
      </style>
    </head>
    <body>${body}</body>
  `;
}
