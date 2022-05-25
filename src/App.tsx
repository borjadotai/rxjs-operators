import "./styles.css";
import useSubscription, { operators } from "./useSubscription";

export default function App() {
  const { operator, setOperator, sub } = useSubscription();

  function fireEvent() {
    console.log("Using: ", operator);
    sub.next("first");
    sub.next("second");
    console.log("-------");
  }

  return (
    <div className="App">
      <h1>RxJS Operators</h1>
      <h4>
        Trigger events using different operators and see how each of them work
        on the console!
      </h4>
      <select
        name="operator"
        onChange={(e) => setOperator(e.currentTarget.value as operators)}
      >
        <option value="SwitchMap">SwitchMap</option>
        <option value="ConcatMap">ConcatMap</option>
        <option value="MergeMap">MergeMap</option>
        <option value="ExhaustMap">ExhaustMap</option>
      </select>
      <button style={{ marginLeft: "1rem" }} onClick={fireEvent}>
        Fire two events!
      </button>
    </div>
  );
}
