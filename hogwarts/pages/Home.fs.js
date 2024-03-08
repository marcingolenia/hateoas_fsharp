import { Record } from "../fable_modules/fable-library-js.4.14.0/Types.js";
import { anonRecord_type, int32_type, obj_type, record_type, string_type } from "../fable_modules/fable-library-js.4.14.0/Reflection.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../fable_modules/Fable.Promise.2.2.2/Promise.fs.js";
import { unwrap, map, defaultArg, some } from "../fable_modules/fable-library-js.4.14.0/Option.js";
import { ApiBaseUrl } from "../Settings.fs.js";
import { promise as promise_3 } from "../fable_modules/Fable.Promise.2.2.2/PromiseImpl.fs.js";
import { PromiseBuilder__Delay_62FBFDE1 as PromiseBuilder__Delay_62FBFDE1_1, PromiseBuilder__Run_212F1D4B as PromiseBuilder__Run_212F1D4B_1 } from "../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.2.2.2/Promise.fs.js";
import { promise as promise_4 } from "../fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.2.2.2/PromiseImpl.fs.js";
import { FetchError } from "../fable_modules/Thoth.Fetch.3.0.1/Fetch.fs.js";
import { FSharpResult$2 } from "../fable_modules/fable-library-js.4.14.0/Result.js";
import { Helper_message, Helper_fetch, Helper_withContentTypeJson, Helper_withProperties } from "../fable_modules/Thoth.Fetch.3.0.1/./Fetch.fs.js";
import { fetch$, Types_RequestProperties } from "../fable_modules/Fable.Fetch.2.6.0/Fetch.fs.js";
import { keyValueList } from "../fable_modules/fable-library-js.4.14.0/MapUtil.js";
import { cons, ofArray, empty } from "../fable_modules/fable-library-js.4.14.0/List.js";
import { Auto_generateBoxedEncoderCached_437914C6 } from "../fable_modules/Thoth.Json.6.0.0/./Encode.fs.js";
import { toString } from "../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.6.0.0/Encode.fs.js";
import { Auto_generateBoxedDecoderCached_Z6670B51 } from "../fable_modules/Thoth.Json.6.0.0/./Decode.fs.js";
import { fromString } from "../fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.6.0.0/Decode.fs.js";
import { disposeSafe, getEnumerator, uncurry3, uncurry2 } from "../fable_modules/fable-library-js.4.14.0/Util.js";
import { BuilderBricks_combine } from "../fable_modules/Vide.Common.UI.0.0.34/../Vide.Common.0.0.34/Core.fs.js";
import { YieldingNodeBuilder$2__Yield_Z719B22F1, NodeModifierContext$1, NodeModelBaseBuilder__Bind_Z46C0E6ED, NodeModelBaseBuilder__Delay_73B7AEE9, YieldingNodeBuilder$2__Yield_Z721C83C5, NodeModelBaseBuilder__Combine_Z636E7D3A, NodeBuilder$2__Delay_Z3A82A394, ComponentRetCnBaseBuilder$2__Yield_Z719B22F1 } from "../fable_modules/Vide.Common.UI.0.0.34/NodeModel.fs.js";
import { HtmlElementBuilders_h1_$ctor, HtmlElementBuilders_div_$ctor, HtmlElementBuilders_p_$ctor } from "../fable_modules/Vide.UI.Fable.0.0.34/./Api.fs.js";
import { singleton } from "../fable_modules/fable-library-js.4.14.0/AsyncBuilder.js";
import { awaitPromise } from "../fable_modules/fable-library-js.4.14.0/Async.js";
import { NodeBuilder$2__get_PostEvalModifiers, NodeContext$1__RemoveObsoleteChildren, NodeBuilder$2__get_CreateContext, NodeBuilder$2__get_PreEvalModifiers, NodeBuilder$2__get_InitModifiers, NodeBuilder$2__get_CreateThisElement, NodeContext$1__ShowChild_2B595 } from "../fable_modules/Vide.Common.UI.0.0.34/./NodeModel.fs.js";
import { HostContext$1 } from "../fable_modules/Vide.Common.UI.0.0.34/Host.fs.js";
import { VideBuilderInstance_vide } from "../fable_modules/Vide.UI.Fable.0.0.34/Fable.fs.js";
import { HtmlGARenderRetCnBuilderExtensions_class$0027_Z798B567B } from "../fable_modules/Vide.UI.Fable.0.0.34/Api.fs.js";

export class Book extends Record {
    constructor(Name) {
        super();
        this.Name = Name;
    }
}

export function Book_$reflection() {
    return record_type("Home.Book", [], Book, () => [["Name", string_type]]);
}

export function handleError(err) {
    switch (err.tag) {
        case 1:
            return "err";
        case 0:
            return "Not Implemented";
        case 3:
            return "Not Implemented";
        default: {
            const err_1 = err.fields[0];
            return err_1.statusText;
        }
    }
}

export function getBookById2(id) {
    return PromiseBuilder__Run_212F1D4B(promise_3, PromiseBuilder__Delay_62FBFDE1(promise_3, () => {
        let data_1, caseStrategy_1, extra_1;
        console.log(some(id));
        const url = `${ApiBaseUrl}/accommodation/houses/Gryffindor`;
        return ((data_1 = void 0, (caseStrategy_1 = void 0, (extra_1 = void 0, (() => {
            let properties_2;
            try {
                const properties_3 = Helper_withProperties(void 0, (properties_2 = ofArray([new Types_RequestProperties(0, ["GET"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_1, empty()), 0)])]), defaultArg(map((data_1_1) => {
                    let encoder;
                    return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(obj_type, caseStrategy_1, extra_1), toString(0, encoder(data_1_1)))]), properties_2);
                }, data_1), properties_2)));
                const pr = PromiseBuilder__Run_212F1D4B_1(promise_4, PromiseBuilder__Delay_62FBFDE1_1(promise_4, () => (Helper_fetch(url, properties_3).then((_arg) => {
                    let response_1, decoder_1_1, decode;
                    const response = _arg;
                    return ((response_1 = response, (decoder_1_1 = defaultArg(void 0, Auto_generateBoxedDecoderCached_Z6670B51(anonRecord_type(["capacity", int32_type], ["name", string_type]), unwrap(caseStrategy_1), unwrap(extra_1))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_4, PromiseBuilder__Delay_62FBFDE1_1(promise_4, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_4, PromiseBuilder__Delay_62FBFDE1_1(promise_4, () => (response_1.text().then((_arg_1) => {
                        let matchValue, msg, value_1_1;
                        const body_1_1 = _arg_1;
                        return Promise.resolve((matchValue = decode(body_1_1), (matchValue.tag === 1) ? ((msg = matchValue.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg])]))) : ((value_1_1 = matchValue.fields[0], new FSharpResult$2(0, [value_1_1])))));
                    })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_1])])))).then((_arg_1_1) => {
                        const result = _arg_1_1;
                        return Promise.resolve(result);
                    }))))))));
                }))));
                return pr.then(void 0, ((arg) => (new FSharpResult$2(1, [new FetchError(3, [arg])]))));
            }
            catch (exn) {
                return PromiseBuilder__Run_212F1D4B_1(promise_4, PromiseBuilder__Delay_62FBFDE1_1(promise_4, () => (Promise.resolve(new FSharpResult$2(1, [new FetchError(0, [exn])])))));
            }
        })())))).then((_arg_2) => {
            let ddd, err;
            const asd = _arg_2;
            return Promise.resolve((asd.tag === 0) ? ((ddd = asd.fields[0], ddd)) : ((err = asd.fields[0], (console.log(some(handleError(err))), {
                capacity: 2,
                name: "",
            }))));
        });
    }));
}

export function getBookById3(id) {
    return PromiseBuilder__Run_212F1D4B(promise_3, PromiseBuilder__Delay_62FBFDE1(promise_3, () => {
        const url = `${ApiBaseUrl}/accommodation/houses/Gryffindor`;
        return PromiseBuilder__Run_212F1D4B_1(promise_4, PromiseBuilder__Delay_62FBFDE1_1(promise_4, () => {
            let data_2, caseStrategy_2, extra_2;
            return ((data_2 = void 0, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                let properties_4;
                try {
                    const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["GET"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_2, empty()), 0)])]), defaultArg(map((data_1_1) => {
                        let encoder;
                        return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(obj_type, caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                    }, data_2), properties_4)));
                    const pr = PromiseBuilder__Run_212F1D4B_1(promise_4, PromiseBuilder__Delay_62FBFDE1_1(promise_4, () => (Helper_fetch(url, properties_3).then((_arg) => {
                        let response_1, decoder_1_1, decode;
                        const response = _arg;
                        return ((response_1 = response, (decoder_1_1 = defaultArg(void 0, Auto_generateBoxedDecoderCached_Z6670B51(anonRecord_type(["capacity", int32_type], ["name", string_type]), unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_4, PromiseBuilder__Delay_62FBFDE1_1(promise_4, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_4, PromiseBuilder__Delay_62FBFDE1_1(promise_4, () => (response_1.text().then((_arg_1) => {
                            let matchValue, msg, value_1_1;
                            const body_1_1 = _arg_1;
                            return Promise.resolve((matchValue = decode(body_1_1), (matchValue.tag === 1) ? ((msg = matchValue.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg])]))) : ((value_1_1 = matchValue.fields[0], new FSharpResult$2(0, [value_1_1])))));
                        })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_1])])))).then((_arg_1_1) => {
                            const result = _arg_1_1;
                            return Promise.resolve(result);
                        }))))))));
                    }))));
                    return pr.then(void 0, ((arg) => (new FSharpResult$2(1, [new FetchError(3, [arg])]))));
                }
                catch (exn) {
                    return PromiseBuilder__Run_212F1D4B_1(promise_4, PromiseBuilder__Delay_62FBFDE1_1(promise_4, () => (Promise.resolve(new FSharpResult$2(1, [new FetchError(0, [exn])])))));
                }
            })())))).then((_arg_2) => {
                const result_1 = _arg_2;
                let response_1_1;
                if (result_1.tag === 1) {
                    const error = result_1.fields[0];
                    throw new Error(Helper_message(error));
                }
                else {
                    const response_2 = result_1.fields[0];
                    response_1_1 = response_2;
                }
                return Promise.resolve(response_1_1);
            });
        })).then((_arg_3) => {
            const asd = _arg_3;
            return Promise.resolve(asd);
        });
    }));
}

export function getBookById(id) {
    return PromiseBuilder__Run_212F1D4B(promise_3, PromiseBuilder__Delay_62FBFDE1(promise_3, () => {
        const url = `${ApiBaseUrl}/health`;
        return fetch$(url, empty()).then((_arg) => {
            const asd = _arg;
            return asd.text();
        });
    }));
}

export function render(count) {
    let builder$0040_1, v, clo, thisBuilder, builder$0040_3, v_9, clo_8, thisBuilder_2;
    return BuilderBricks_combine(uncurry2(ComponentRetCnBaseBuilder$2__Yield_Z719B22F1(VideBuilderInstance_vide, uncurry2((builder$0040_1 = HtmlElementBuilders_p_$ctor(), (v = NodeBuilder$2__Delay_Z3A82A394(builder$0040_1, uncurry3(() => NodeModelBaseBuilder__Combine_Z636E7D3A(builder$0040_1, uncurry2(YieldingNodeBuilder$2__Yield_Z721C83C5(builder$0040_1, `${count} loading 1sst number ...`)), NodeModelBaseBuilder__Delay_73B7AEE9(builder$0040_1, () => NodeModelBaseBuilder__Bind_Z46C0E6ED(builder$0040_1, singleton.Delay(() => singleton.Bind(awaitPromise(getBookById2(count)), (_arg) => {
        const b = _arg;
        return singleton.Bind(awaitPromise(getBookById3(5)), (_arg_1) => {
            const b3 = _arg_1;
            return singleton.Bind(awaitPromise(getBookById(5)), (_arg_2) => {
                const a = _arg_2;
                console.log(some(a));
                console.log(some(b3));
                return singleton.Return(42);
            });
        });
    })), uncurry3((_arg_3) => {
        const res1 = _arg_3 | 0;
        return YieldingNodeBuilder$2__Yield_Z721C83C5(builder$0040_1, `${res1}`);
    })))))), (clo = ((thisBuilder = builder$0040_1, (s) => ((parentCtx) => {
        let patternInput;
        if (s != null) {
            const ms = s[0];
            const fs = s[1];
            patternInput = [ms, fs];
        }
        else {
            patternInput = [void 0, void 0];
        }
        const s_1 = patternInput[0];
        const cs = patternInput[1];
        let patternInput_2;
        if (s_1 != null) {
            const thisElement = s_1;
            NodeContext$1__ShowChild_2B595(parentCtx.ctx, thisElement);
            patternInput_2 = [thisElement, cs];
        }
        else {
            const s_2 = cs;
            const newElement = NodeBuilder$2__get_CreateThisElement(thisBuilder)(parentCtx.host)(parentCtx.ctx);
            const arg = NodeBuilder$2__get_InitModifiers(thisBuilder);
            ((node) => {
                const enumerator = getEnumerator(arg);
                try {
                    while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                        const m = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                        m(new NodeModifierContext$1(node, parentCtx.host));
                    }
                }
                finally {
                    disposeSafe(enumerator);
                }
            })(newElement);
            patternInput_2 = [newElement, s_2];
        }
        const thisElement_1 = patternInput_2[0];
        const cs_1 = patternInput_2[1];
        const arg_2 = NodeBuilder$2__get_PreEvalModifiers(thisBuilder);
        ((node_1) => {
            const enumerator_1 = getEnumerator(arg_2);
            try {
                while (enumerator_1["System.Collections.IEnumerator.MoveNext"]()) {
                    const m_1 = enumerator_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    m_1(new NodeModifierContext$1(node_1, parentCtx.host));
                }
            }
            finally {
                disposeSafe(enumerator_1);
            }
        })(thisElement_1);
        let thisCtx;
        const newCtx = NodeBuilder$2__get_CreateContext(thisBuilder)(parentCtx.host)(thisElement_1);
        thisCtx = (new HostContext$1(parentCtx.host, newCtx));
        const patternInput_3 = v(cs_1)(thisCtx);
        const cv = patternInput_3[0];
        const cs_2 = patternInput_3[1];
        NodeContext$1__RemoveObsoleteChildren(thisCtx.ctx);
        const arg_4 = NodeBuilder$2__get_PostEvalModifiers(thisBuilder);
        ((node_2) => {
            const enumerator_2 = getEnumerator(arg_4);
            try {
                while (enumerator_2["System.Collections.IEnumerator.MoveNext"]()) {
                    const m_2 = enumerator_2["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    m_2(new NodeModifierContext$1(node_2, parentCtx.host));
                }
            }
            finally {
                disposeSafe(enumerator_2);
            }
        })(thisElement_1);
        const result = cv;
        const state = [thisElement_1, cs_2];
        return [result, state];
    }))), (arg_6) => {
        const clo_1_2 = clo(arg_6);
        return clo_1_2;
    })))))), uncurry2(ComponentRetCnBaseBuilder$2__Yield_Z719B22F1(VideBuilderInstance_vide, uncurry2((builder$0040_3 = HtmlElementBuilders_div_$ctor(), (v_9 = NodeBuilder$2__Delay_Z3A82A394(builder$0040_3, uncurry3(() => {
        let builder$0040_4, v_5, clo_6, thisBuilder_1;
        return YieldingNodeBuilder$2__Yield_Z719B22F1(builder$0040_3, uncurry2((builder$0040_4 = HtmlGARenderRetCnBuilderExtensions_class$0027_Z798B567B(HtmlElementBuilders_h1_$ctor(), "text-3xl font-bold underline text-center"), (v_5 = NodeBuilder$2__Delay_Z3A82A394(builder$0040_4, uncurry3(() => YieldingNodeBuilder$2__Yield_Z721C83C5(builder$0040_4, "Home"))), (clo_6 = ((thisBuilder_1 = builder$0040_4, (s_3) => ((parentCtx_1) => {
            let patternInput_4;
            if (s_3 != null) {
                const ms_1 = s_3[0];
                const fs_1 = s_3[1];
                patternInput_4 = [ms_1, fs_1];
            }
            else {
                patternInput_4 = [void 0, void 0];
            }
            const s_1_1 = patternInput_4[0];
            const cs_3 = patternInput_4[1];
            let patternInput_2_1;
            if (s_1_1 != null) {
                const thisElement_2 = s_1_1;
                NodeContext$1__ShowChild_2B595(parentCtx_1.ctx, thisElement_2);
                patternInput_2_1 = [thisElement_2, cs_3];
            }
            else {
                const s_2_1 = cs_3;
                const newElement_1 = NodeBuilder$2__get_CreateThisElement(thisBuilder_1)(parentCtx_1.host)(parentCtx_1.ctx);
                const arg_7 = NodeBuilder$2__get_InitModifiers(thisBuilder_1);
                ((node_3) => {
                    const enumerator_3 = getEnumerator(arg_7);
                    try {
                        while (enumerator_3["System.Collections.IEnumerator.MoveNext"]()) {
                            const m_3 = enumerator_3["System.Collections.Generic.IEnumerator`1.get_Current"]();
                            m_3(new NodeModifierContext$1(node_3, parentCtx_1.host));
                        }
                    }
                    finally {
                        disposeSafe(enumerator_3);
                    }
                })(newElement_1);
                patternInput_2_1 = [newElement_1, s_2_1];
            }
            const thisElement_1_1 = patternInput_2_1[0];
            const cs_1_1 = patternInput_2_1[1];
            const arg_2_1 = NodeBuilder$2__get_PreEvalModifiers(thisBuilder_1);
            ((node_1_1) => {
                const enumerator_1_1 = getEnumerator(arg_2_1);
                try {
                    while (enumerator_1_1["System.Collections.IEnumerator.MoveNext"]()) {
                        const m_1_1 = enumerator_1_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
                        m_1_1(new NodeModifierContext$1(node_1_1, parentCtx_1.host));
                    }
                }
                finally {
                    disposeSafe(enumerator_1_1);
                }
            })(thisElement_1_1);
            let thisCtx_1;
            const newCtx_1 = NodeBuilder$2__get_CreateContext(thisBuilder_1)(parentCtx_1.host)(thisElement_1_1);
            thisCtx_1 = (new HostContext$1(parentCtx_1.host, newCtx_1));
            const patternInput_3_1 = v_5(cs_1_1)(thisCtx_1);
            const cv_1 = patternInput_3_1[0];
            const cs_2_1 = patternInput_3_1[1];
            NodeContext$1__RemoveObsoleteChildren(thisCtx_1.ctx);
            const arg_4_1 = NodeBuilder$2__get_PostEvalModifiers(thisBuilder_1);
            ((node_2_1) => {
                const enumerator_2_1 = getEnumerator(arg_4_1);
                try {
                    while (enumerator_2_1["System.Collections.IEnumerator.MoveNext"]()) {
                        const m_2_1 = enumerator_2_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
                        m_2_1(new NodeModifierContext$1(node_2_1, parentCtx_1.host));
                    }
                }
                finally {
                    disposeSafe(enumerator_2_1);
                }
            })(thisElement_1_1);
            const result_1 = cv_1;
            const state_1 = [thisElement_1_1, cs_2_1];
            return [result_1, state_1];
        }))), (arg_8) => {
            const clo_1_4 = clo_6(arg_8);
            return clo_1_4;
        })))));
    })), (clo_8 = ((thisBuilder_2 = builder$0040_3, (s_4) => ((parentCtx_2) => {
        let patternInput_5;
        if (s_4 != null) {
            const ms_2 = s_4[0];
            const fs_2 = s_4[1];
            patternInput_5 = [ms_2, fs_2];
        }
        else {
            patternInput_5 = [void 0, void 0];
        }
        const s_1_2 = patternInput_5[0];
        const cs_4 = patternInput_5[1];
        let patternInput_2_2;
        if (s_1_2 != null) {
            const thisElement_3 = s_1_2;
            NodeContext$1__ShowChild_2B595(parentCtx_2.ctx, thisElement_3);
            patternInput_2_2 = [thisElement_3, cs_4];
        }
        else {
            const s_2_2 = cs_4;
            const newElement_2 = NodeBuilder$2__get_CreateThisElement(thisBuilder_2)(parentCtx_2.host)(parentCtx_2.ctx);
            const arg_9 = NodeBuilder$2__get_InitModifiers(thisBuilder_2);
            ((node_4) => {
                const enumerator_4 = getEnumerator(arg_9);
                try {
                    while (enumerator_4["System.Collections.IEnumerator.MoveNext"]()) {
                        const m_4 = enumerator_4["System.Collections.Generic.IEnumerator`1.get_Current"]();
                        m_4(new NodeModifierContext$1(node_4, parentCtx_2.host));
                    }
                }
                finally {
                    disposeSafe(enumerator_4);
                }
            })(newElement_2);
            patternInput_2_2 = [newElement_2, s_2_2];
        }
        const thisElement_1_2 = patternInput_2_2[0];
        const cs_1_2 = patternInput_2_2[1];
        const arg_2_2 = NodeBuilder$2__get_PreEvalModifiers(thisBuilder_2);
        ((node_1_2) => {
            const enumerator_1_2 = getEnumerator(arg_2_2);
            try {
                while (enumerator_1_2["System.Collections.IEnumerator.MoveNext"]()) {
                    const m_1_2 = enumerator_1_2["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    m_1_2(new NodeModifierContext$1(node_1_2, parentCtx_2.host));
                }
            }
            finally {
                disposeSafe(enumerator_1_2);
            }
        })(thisElement_1_2);
        let thisCtx_2;
        const newCtx_2 = NodeBuilder$2__get_CreateContext(thisBuilder_2)(parentCtx_2.host)(thisElement_1_2);
        thisCtx_2 = (new HostContext$1(parentCtx_2.host, newCtx_2));
        const patternInput_3_2 = v_9(cs_1_2)(thisCtx_2);
        const cv_2 = patternInput_3_2[0];
        const cs_2_2 = patternInput_3_2[1];
        NodeContext$1__RemoveObsoleteChildren(thisCtx_2.ctx);
        const arg_4_2 = NodeBuilder$2__get_PostEvalModifiers(thisBuilder_2);
        ((node_2_2) => {
            const enumerator_2_2 = getEnumerator(arg_4_2);
            try {
                while (enumerator_2_2["System.Collections.IEnumerator.MoveNext"]()) {
                    const m_2_2 = enumerator_2_2["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    m_2_2(new NodeModifierContext$1(node_2_2, parentCtx_2.host));
                }
            }
            finally {
                disposeSafe(enumerator_2_2);
            }
        })(thisElement_1_2);
        const result_2 = cv_2;
        const state_2 = [thisElement_1_2, cs_2_2];
        return [result_2, state_2];
    }))), (arg_10) => {
        const clo_1_6 = clo_8(arg_10);
        return clo_1_6;
    })))))));
}

