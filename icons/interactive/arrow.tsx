interface Props {
  rotate?: number;
  size?: number;
}
function Arrow({rotate, size}: Props): JSX.Element {
  const proportion = size ? size / 2 : 0;
  const height = proportion || 8;
  const width = size || 16;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 18 6`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={`rotate(${rotate || 0})`}
    >
      <path
        d="M1 0.999999L8 7M15 1L11.5 4L10.625 4.75"
        stroke="#2B3F6C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
export default Arrow;
