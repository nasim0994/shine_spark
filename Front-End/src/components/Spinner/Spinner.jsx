export default function Spinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
