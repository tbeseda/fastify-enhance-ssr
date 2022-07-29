export default function HelloYou({ html, state }) {
  const {
    attrs: { name, color, uid },
  } = state;

  return html`

<style>
  h1 { color: DarkSlateGray; }
  ${color ? `:host h1.uid-${uid} { color: ${color}; }` : ''}
</style>

<h1 ${uid ? `class="uid-${uid}"` : ''}>
  Hello, ${name || 'you'}.
</h1>

  `;
}
