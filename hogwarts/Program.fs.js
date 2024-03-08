import { MutableValue$1__set_Value_2B595, MutableValue$1__get_Value, ofMutable, DelayedMutableBuilder__Yield_7D26204D, DelayedMutableBuilder__Delay_1505, DelayedMutableBuilder__Run_FCFD9EF, Vide_VideBaseBuilder__VideBaseBuilder_Bind_272CC16A } from "./fable_modules/Vide.Common.UI.0.0.34/MutableValue.fs.js";
import { disposeSafe, getEnumerator, uncurry2, uncurry3 } from "./fable_modules/fable-library-js.4.14.0/Util.js";
import { NodeModifierContext$1, YieldingNodeBuilder$2__Yield_Z721C83C5, YieldingNodeBuilder$2__Yield_Z719B22F1, NodeBuilder$2__Delay_Z3A82A394, ComponentRetCnBaseBuilder$2__Yield_Z719B22F1 } from "./fable_modules/Vide.Common.UI.0.0.34/NodeModel.fs.js";
import { HtmlGARenderRetCnBuilderExtensions_onclick_7214F6BF, HtmlGARenderRetCnBuilderExtensions_class$0027_Z798B567B } from "./fable_modules/Vide.UI.Fable.0.0.34/Api.fs.js";
import { HtmlElementBuilders_button_$ctor, HtmlElementBuilders_div_$ctor } from "./fable_modules/Vide.UI.Fable.0.0.34/./Api.fs.js";
import { BuilderBricks_combine } from "./fable_modules/Vide.Common.UI.0.0.34/../Vide.Common.0.0.34/Core.fs.js";
import { render } from "./pages/Home.fs.js";
import { NodeBuilder$2__get_PostEvalModifiers, NodeContext$1__RemoveObsoleteChildren, NodeBuilder$2__get_CreateContext, NodeBuilder$2__get_PreEvalModifiers, NodeBuilder$2__get_InitModifiers, NodeBuilder$2__get_CreateThisElement, NodeContext$1__ShowChild_2B595 } from "./fable_modules/Vide.Common.UI.0.0.34/./NodeModel.fs.js";
import { HostContext$1 } from "./fable_modules/Vide.Common.UI.0.0.34/Host.fs.js";
import { VideApp_ForHost_171AE942, VideBuilderInstance_vide } from "./fable_modules/Vide.UI.Fable.0.0.34/Fable.fs.js";
import { VideAppFactory$1__CreateAndStartWithUntypedState_Z6E8691D9 } from "./fable_modules/Vide.Common.UI.0.0.34/App.fs.js";

export const rootComponent = Vide_VideBaseBuilder__VideBaseBuilder_Bind_272CC16A(VideBuilderInstance_vide, DelayedMutableBuilder__Run_FCFD9EF(ofMutable, DelayedMutableBuilder__Delay_1505(ofMutable, () => DelayedMutableBuilder__Yield_7D26204D(ofMutable, 0))), uncurry3((_arg) => {
    let builder$0040_2, v_5, clo_6, thisBuilder_1;
    const count = _arg;
    return ComponentRetCnBaseBuilder$2__Yield_Z719B22F1(VideBuilderInstance_vide, uncurry2((builder$0040_2 = HtmlGARenderRetCnBuilderExtensions_class$0027_Z798B567B(HtmlElementBuilders_div_$ctor(), "main-view"), (v_5 = NodeBuilder$2__Delay_Z3A82A394(builder$0040_2, uncurry3(() => BuilderBricks_combine(uncurry2(YieldingNodeBuilder$2__Yield_Z719B22F1(builder$0040_2, uncurry2(render(MutableValue$1__get_Value(count))))), uncurry2(NodeBuilder$2__Delay_Z3A82A394(builder$0040_2, uncurry3(() => {
        let builder$0040_3, v, clo, thisBuilder;
        return YieldingNodeBuilder$2__Yield_Z719B22F1(builder$0040_2, uncurry2((builder$0040_3 = HtmlGARenderRetCnBuilderExtensions_onclick_7214F6BF(HtmlGARenderRetCnBuilderExtensions_class$0027_Z798B567B(HtmlElementBuilders_button_$ctor(), "btn"), (_arg_1) => {
            MutableValue$1__set_Value_2B595(count, MutableValue$1__get_Value(count) + 1);
        }), (v = NodeBuilder$2__Delay_Z3A82A394(builder$0040_3, uncurry3(() => YieldingNodeBuilder$2__Yield_Z721C83C5(builder$0040_3, `Click me! ${MutableValue$1__get_Value(count)} times`))), (clo = ((thisBuilder = builder$0040_3, (s) => ((parentCtx) => {
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
        })))));
    })))))), (clo_6 = ((thisBuilder_1 = builder$0040_2, (s_3) => ((parentCtx_1) => {
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
}));

VideAppFactory$1__CreateAndStartWithUntypedState_Z6E8691D9(VideApp_ForHost_171AE942(document.getElementById("app")), uncurry2(rootComponent));

