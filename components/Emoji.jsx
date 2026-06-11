// Renders emojis as Twemoji SVGs so they look identical everywhere
// (no more default Windows/OS emoji glyphs).
const TWEMOJI_BASE = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg";

const toCodePoint = (symbol) =>
  Array.from(symbol)
    .map((ch) => ch.codePointAt(0).toString(16))
    .filter((cp) => cp !== "fe0f")
    .join("-");

const Emoji = (props) => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    className="emoji"
    src={`${TWEMOJI_BASE}/${toCodePoint(props.symbol)}.svg`}
    alt={props.label ? props.label : props.symbol}
    aria-hidden={props.label ? "false" : "true"}
    draggable="false"
    loading="lazy"
  />
);

export default Emoji;
