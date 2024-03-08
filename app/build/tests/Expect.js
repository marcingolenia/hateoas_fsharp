import { value as value_1, some, unwrap, map, defaultArg } from "./fable_modules/fable-library-js.4.14.0/Option.js";
import { join } from "./fable_modules/fable-library-js.4.14.0/String.js";
import { choose } from "./fable_modules/fable-library-js.4.14.0/List.js";
import { tryFind, empty, singleton, append, delay, toList } from "./fable_modules/fable-library-js.4.14.0/Seq.js";
import { class_type } from "./fable_modules/fable-library-js.4.14.0/Reflection.js";
import { defaultOf, compare, equals } from "./fable_modules/fable-library-js.4.14.0/Util.js";
import { PromiseBuilder__While_2044D34, PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "./fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { promise } from "./fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";

function ExpectUtil_quote(v) {
    if (typeof v === "string") {
        const s = v;
        return ("\"" + s) + "\"";
    }
    else {
        return v;
    }
}

export class AssertionError$1 extends Error {
    constructor(assertion, description, actual, expected, brief, extra) {
        super((() => {
            const brief_1 = defaultArg(brief, false);
            return join("", choose((x) => x, toList(delay(() => append(singleton("Expected "), delay(() => append(singleton(map((v) => (`'${v}' `), description)), delay(() => append(!brief_1 ? singleton(map((v_1) => (`${ExpectUtil_quote(v_1)} `), actual)) : empty(), delay(() => append(singleton(`to ${assertion}`), delay(() => append(!brief_1 ? singleton(map((v_2) => (` ${ExpectUtil_quote(v_2)} `), expected)) : empty(), delay(() => singleton(map((v_3) => (`. ${v_3}`), extra))))))))))))))));
        })());
        super.stack = "<stack hidden>";
        this["actual@"] = actual;
        this["expected@"] = expected;
    }
    get actual() {
        const __ = this;
        return __["actual@"];
    }
    set actual(v) {
        const __ = this;
        __["actual@"] = v;
    }
    get expected() {
        const __ = this;
        return __["expected@"];
    }
    set expected(v) {
        const __ = this;
        __["expected@"] = v;
    }
}

export function AssertionError$1_$reflection(gen0) {
    return class_type("Expect.AssertionError`1", [gen0], AssertionError$1, class_type("Expect.JsError", void 0, Error));
}

export function AssertionError$1_$ctor_6BFB8532(assertion, description, actual, expected, brief, extra) {
    return new AssertionError$1(assertion, description, actual, expected, brief, extra);
}

export class AssertionError {
    constructor() {
    }
}

export function AssertionError_$reflection() {
    return class_type("Expect.AssertionError", void 0, AssertionError);
}

export function AssertionError_Throw_786A6432(assertion, description, actual, expected, brief, extra) {
    const error = new AssertionError$1(assertion, unwrap(description), actual, expected, unwrap(brief), unwrap(extra));
    throw error;
}

export function Expect_equal(expected, actual) {
    if (!equals(actual, expected)) {
        AssertionError_Throw_786A6432("equal", void 0, some(actual), some(expected));
    }
}

export function Expect_notEqual(expected, actual) {
    if (!!equals(actual, expected)) {
        AssertionError_Throw_786A6432("not equal", void 0, some(actual), some(expected));
    }
}

export function Expect_greaterThan(expected, actual) {
    if (!(compare(actual, expected) > 0)) {
        AssertionError_Throw_786A6432("be greater than", void 0, some(actual), some(expected));
    }
}

export function Expect_lessThan(expected, actual) {
    if (!(compare(actual, expected) < 0)) {
        AssertionError_Throw_786A6432("be less than", void 0, some(actual), some(expected));
    }
}

export function Expect_greaterOrEqual(expected, actual) {
    if (!(compare(actual, expected) >= 0)) {
        AssertionError_Throw_786A6432("be greater than or equal to", void 0, some(actual), some(expected));
    }
}

export function Expect_lessOrEqual(expected, actual) {
    if (!(compare(actual, expected) <= 0)) {
        AssertionError_Throw_786A6432("be less than or equal to", void 0, some(actual), some(expected));
    }
}

export function Expect_betweenInclusive(lowerBound, upperBound, actual) {
    if (!((compare(lowerBound, actual) <= 0) && (compare(actual, upperBound) <= 0))) {
        AssertionError_Throw_786A6432(`be between inclusive ${lowerBound} and ${upperBound}`, void 0, some(actual));
    }
}

export function Expect_betweenExclusive(lowerBound, upperBound, actual) {
    if (!((compare(lowerBound, actual) < 0) && (compare(actual, upperBound) < 0))) {
        AssertionError_Throw_786A6432(`be between exclusive ${lowerBound} and ${upperBound}`, void 0, some(actual));
    }
}

export function Expect_isTrue(msg, condition, argument) {
    if (!condition(argument)) {
        AssertionError_Throw_786A6432("be true", msg);
    }
}

export function Expect_isFalse(msg, condition, argument) {
    if (condition(argument)) {
        AssertionError_Throw_786A6432("be false", msg);
    }
}

export function Expect_map(f, x) {
    return f(x);
}

export function Expect_some(msg, x) {
    if (x == null) {
        return AssertionError_Throw_786A6432("be some", msg);
    }
    else {
        const x_1 = value_1(x);
        return x_1;
    }
}

export function Expect_find(msg, condition, items) {
    const _arg = tryFind(condition, items);
    if (_arg == null) {
        return AssertionError_Throw_786A6432("be found", msg);
    }
    else {
        const x = value_1(_arg);
        return x;
    }
}

export function Expect_errorAnd(msg, f, argument) {
    let e_1;
    try {
        f(argument);
        e_1 = void 0;
    }
    catch (e) {
        e_1 = e;
    }
    if (e_1 == null) {
        return AssertionError_Throw_786A6432("fail", msg);
    }
    else {
        const e_2 = e_1;
        return e_2;
    }
}

export function Expect_error(msg, f, argument) {
    Expect_errorAnd(msg, f, argument);
}

export function Expect_successAnd(msg, f, argument) {
    try {
        return f(argument);
    }
    catch (e) {
        return AssertionError_Throw_786A6432("succeed", msg, void 0, void 0, void 0, "Error: " + e.message);
    }
}

export function Expect_success(msg, f, argument) {
    Expect_successAnd(msg, f, argument);
}

export function Expect_beforeTimeout(msg, ms, pr) {
    let pr_2;
    const pr_3 = Promise.race([pr.then((value) => value), (pr_2 = (new Promise(resolve => setTimeout(resolve, ms))), pr_2.then(() => "timeout"))]);
    return pr_3.then((_arg_1) => {
        let s;
        let matchResult, s_1, v;
        if (typeof _arg_1 === "string") {
            if ((s = _arg_1, s === "timeout")) {
                matchResult = 0;
                s_1 = _arg_1;
            }
            else {
                matchResult = 1;
                v = _arg_1;
            }
        }
        else {
            matchResult = 1;
            v = _arg_1;
        }
        switch (matchResult) {
            case 0:
                return AssertionError_Throw_786A6432(`happen before ${ms}ms timeout`, msg);
            default:
                return v;
        }
    });
}

/**
 * Retry an action every X milliseconds until timeout
 */
export function Expect_retryUntilWith(msg, intervalMs, timeoutMs, action) {
    return PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let totalMs = 0;
        let success = false;
        let res = defaultOf();
        return PromiseBuilder__While_2044D34(promise, () => !success, PromiseBuilder__Delay_62FBFDE1(promise, () => ((PromiseBuilder__Delay_62FBFDE1(promise, () => {
            res = action();
            success = true;
            return Promise.resolve();
        }).catch((_arg) => {
            return Promise.resolve();
        })).then(() => PromiseBuilder__Delay_62FBFDE1(promise, () => (!success ? (((totalMs >= timeoutMs) ? ((AssertionError_Throw_786A6432(`happen before ${timeoutMs}ms timeout`, msg), Promise.resolve())) : (Promise.resolve())).then(() => PromiseBuilder__Delay_62FBFDE1(promise, () => ((new Promise(resolve => setTimeout(resolve, intervalMs))).then(() => {
            totalMs = ((totalMs + intervalMs) | 0);
            return Promise.resolve();
        }))))) : (Promise.resolve()))))))).then(() => PromiseBuilder__Delay_62FBFDE1(promise, () => (Promise.resolve(res))));
    }));
}

/**
 * Retry an action every 200ms with a timeout of 2000ms
 */
export function Expect_retryUntil(msg, action) {
    return Expect_retryUntilWith(msg, 200, 2000, action);
}

