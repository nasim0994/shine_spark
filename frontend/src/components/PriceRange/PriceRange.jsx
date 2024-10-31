import { Range, getTrackBackground } from "react-range";

const PriceRangeSlider = ({ values, setValues, MIN, MAX, STEP }) => {
  return (
    <div className="w-72 rounded-lg border bg-white p-4 shadow-md">
      <h2 className="text-lg font-semibold">Price</h2>

      <div className="my-6">
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 w-full rounded"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#B3B3B3", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="h-6 w-6 cursor-pointer rounded-full border-2 border-white bg-gray-400 shadow-md"
              style={{ ...props.style }}
            />
          )}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <div>Min ৳ {values[0].toLocaleString()}</div>
        <div>Max ৳ {values[1].toLocaleString()}</div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
