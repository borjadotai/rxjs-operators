import { useEffect, useMemo, useRef, useState } from "react";
import { Subject, Subscription, timer } from "rxjs";
import {
  concatMap,
  exhaustMap,
  mapTo,
  mergeMap,
  switchMap,
  tap
} from "rxjs/operators";

function longRunningOp(value: string) {
  return timer(2000).pipe(mapTo(value));
}

export type operators = "SwitchMap" | "ConcatMap" | "MergeMap" | "ExhaustMap";
export default function useSubscription() {
  const [operator, setOperator] = useState<operators>("SwitchMap");

  const sub: Subject<string> = useMemo(() => new Subject(), []);
  let subscription: { current: Subscription | undefined } = useRef();
  function deregister() {
    if (subscription.current) {
      subscription.current.unsubscribe();
      subscription.current = undefined;
    }
  }

  useEffect(() => {
    deregister();
    if (operator === "SwitchMap") {
      subscription.current = sub
        .pipe(
          tap((value) => console.log("--> sent out", value)),
          switchMap((value) => longRunningOp(value))
        )
        .subscribe((value) => console.log("<-- received", value));
    }
    if (operator === "ConcatMap") {
      subscription.current = sub
        .pipe(
          tap((value) => console.log("--> sent out", value)),
          concatMap((value) => longRunningOp(value))
        )
        .subscribe((value) => console.log("<-- received", value));
    }
    if (operator === "MergeMap") {
      subscription.current = sub
        .pipe(
          tap((value) => console.log("--> sent out", value)),
          mergeMap((value) => longRunningOp(value))
        )
        .subscribe((value) => console.log("<-- received", value));
    }
    if (operator === "ExhaustMap") {
      subscription.current = sub
        .pipe(
          tap((value) => console.log("--> sent out", value)),
          exhaustMap((value) => longRunningOp(value))
        )
        .subscribe((value) => console.log("<-- received", value));
    }
  }, [sub, operator]);

  return { operator, setOperator, sub };
}
