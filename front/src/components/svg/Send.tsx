export default function Send({
  color,
  handleClick,
}: {
  color?: string;
  handleClick?: any;
}) {
  return (
    <svg
      onClick={handleClick || null}
      width="21"
      height="19"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.00999999 18.5L21 9.5L0.00999999 0.5L0 7.5L15 9.5L0 11.5L0.00999999 18.5Z"
        fill={color || "#7F8C8D"}
      />
    </svg>
  );
}
