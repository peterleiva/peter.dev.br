type LoadingSpinnerProps = {
  /**
   * spinner size in pixels
   */
  size?: number;
  /**
   * stroke width
   */
  width?: number;
};

export default function LoadingSpinner({
  size = 24,
  width = size / 12,
}: LoadingSpinnerProps) {
  return (
    <div className="lds-dual-ring">
      <style jsx>{`
        .lds-dual-ring {
          display: inline-block;
          width: ${size}px;
          height: ${size}px;
        }
        .lds-dual-ring::after {
          content: ' ';
          display: block;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: ${width}px solid #fff;
          border-color: #fff transparent #fff transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
