import { YieldingNodeBuilder$2__Yield_7DBBFB5C, NodeModifierContext$1, YieldingNodeBuilder$2__Yield_Z721C83C5, YieldingNodeBuilder$2__Yield_Z719B22F1, NodeBuilder$2__Delay_Z3A82A394, ComponentRetCnBaseBuilder$2__Yield_Z719B22F1 } from "./fable_modules/Vide.Common.UI.0.0.34/NodeModel.fs.js";
import { disposeSafe, getEnumerator, uncurry3, uncurry2 } from "./fable_modules/fable-library-js.4.14.0/Util.js";
import { imgExtensions_src_Z2A144E4A, imgExtensions_width_Z2A144E4A, HtmlGARenderRetCnBuilderExtensions_class$0027_Z798B567B } from "./fable_modules/Vide.UI.Fable.0.0.34/Api.fs.js";
import { HtmlElementBuilders_button_$ctor, HtmlElementBuilders_hr_$ctor, HtmlElementBuilders_img_$ctor, HtmlElementBuilders_p_$ctor, HtmlElementBuilders_h1_$ctor, HtmlElementBuilders_div_$ctor } from "./fable_modules/Vide.UI.Fable.0.0.34/./Api.fs.js";
import { BuilderBricks_combine } from "./fable_modules/Vide.Common.UI.0.0.34/../Vide.Common.0.0.34/Core.fs.js";
import { NodeBuilder$2__get_PostEvalModifiers, NodeContext$1__RemoveObsoleteChildren, NodeBuilder$2__get_CreateContext, NodeBuilder$2__get_PreEvalModifiers, NodeBuilder$2__get_InitModifiers, NodeBuilder$2__get_CreateThisElement, NodeContext$1__ShowChild_2B595 } from "./fable_modules/Vide.Common.UI.0.0.34/./NodeModel.fs.js";
import { HostContext$1 } from "./fable_modules/Vide.Common.UI.0.0.34/Host.fs.js";
import { VideApp_ForHost_171AE942, VideBuilderInstance_vide } from "./fable_modules/Vide.UI.Fable.0.0.34/Fable.fs.js";
import { VideAppFactory$1__CreateAndStartWithUntypedState_Z6E8691D9 } from "./fable_modules/Vide.Common.UI.0.0.34/App.fs.js";

export const rootComponent = ComponentRetCnBaseBuilder$2__Yield_Z719B22F1(VideBuilderInstance_vide, uncurry2((() => {
    const builder$0040_1 = HtmlGARenderRetCnBuilderExtensions_class$0027_Z798B567B(HtmlElementBuilders_div_$ctor(), "main-view");
    const v_13 = NodeBuilder$2__Delay_Z3A82A394(builder$0040_1, uncurry3(() => {
        let builder$0040_2, v, clo, thisBuilder;
        return BuilderBricks_combine(uncurry2(YieldingNodeBuilder$2__Yield_Z719B22F1(builder$0040_1, uncurry2((builder$0040_2 = HtmlGARenderRetCnBuilderExtensions_class$0027_Z798B567B(HtmlElementBuilders_h1_$ctor(), "text-3xl font-bold underline text-center"), (v = NodeBuilder$2__Delay_Z3A82A394(builder$0040_2, uncurry3(() => YieldingNodeBuilder$2__Yield_Z721C83C5(builder$0040_2, "Test"))), (clo = ((thisBuilder = builder$0040_2, (s) => ((parentCtx) => {
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
        })))))), uncurry2(NodeBuilder$2__Delay_Z3A82A394(builder$0040_1, uncurry3(() => {
            let builder$0040_3, v_5, clo_6, thisBuilder_1;
            return BuilderBricks_combine(uncurry2(YieldingNodeBuilder$2__Yield_Z719B22F1(builder$0040_1, uncurry2((builder$0040_3 = HtmlElementBuilders_p_$ctor(), (v_5 = NodeBuilder$2__Delay_Z3A82A394(builder$0040_3, uncurry3(() => YieldingNodeBuilder$2__Yield_7DBBFB5C(builder$0040_3, imgExtensions_width_Z2A144E4A(imgExtensions_src_Z2A144E4A(HtmlElementBuilders_img_$ctor(), "https://vide-dev.io/logo-vide.svg"), "150px")))), (clo_6 = ((thisBuilder_1 = builder$0040_3, (s_3) => ((parentCtx_1) => {
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
            })))))), uncurry2(NodeBuilder$2__Delay_Z3A82A394(builder$0040_1, uncurry3(() => BuilderBricks_combine(uncurry2(YieldingNodeBuilder$2__Yield_7DBBFB5C(builder$0040_1, HtmlElementBuilders_hr_$ctor())), uncurry2(NodeBuilder$2__Delay_Z3A82A394(builder$0040_1, uncurry3(() => BuilderBricks_combine(uncurry2(YieldingNodeBuilder$2__Yield_Z721C83C5(builder$0040_1, "The whole Vide wookd")), uncurry2(NodeBuilder$2__Delay_Z3A82A394(builder$0040_1, uncurry3(() => {
                let builder$0040_4, v_9, clo_8, thisBuilder_2;
                return YieldingNodeBuilder$2__Yield_Z719B22F1(builder$0040_1, uncurry2((builder$0040_4 = HtmlGARenderRetCnBuilderExtensions_class$0027_Z798B567B(HtmlElementBuilders_button_$ctor(), "btn"), (v_9 = NodeBuilder$2__Delay_Z3A82A394(builder$0040_4, uncurry3(() => YieldingNodeBuilder$2__Yield_Z721C83C5(builder$0040_4, "Hello daisy"))), (clo_8 = ((thisBuilder_2 = builder$0040_4, (s_4) => ((parentCtx_2) => {
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
                })))));
            }))))))))))));
        }))));
    }));
    let clo_10;
    const thisBuilder_3 = builder$0040_1;
    clo_10 = ((s_5) => ((parentCtx_3) => {
        let patternInput_6;
        if (s_5 != null) {
            const ms_3 = s_5[0];
            const fs_3 = s_5[1];
            patternInput_6 = [ms_3, fs_3];
        }
        else {
            patternInput_6 = [void 0, void 0];
        }
        const s_1_3 = patternInput_6[0];
        const cs_5 = patternInput_6[1];
        let patternInput_2_3;
        if (s_1_3 != null) {
            const thisElement_4 = s_1_3;
            NodeContext$1__ShowChild_2B595(parentCtx_3.ctx, thisElement_4);
            patternInput_2_3 = [thisElement_4, cs_5];
        }
        else {
            const s_2_3 = cs_5;
            const newElement_3 = NodeBuilder$2__get_CreateThisElement(thisBuilder_3)(parentCtx_3.host)(parentCtx_3.ctx);
            const arg_11 = NodeBuilder$2__get_InitModifiers(thisBuilder_3);
            ((node_5) => {
                const enumerator_5 = getEnumerator(arg_11);
                try {
                    while (enumerator_5["System.Collections.IEnumerator.MoveNext"]()) {
                        const m_5 = enumerator_5["System.Collections.Generic.IEnumerator`1.get_Current"]();
                        m_5(new NodeModifierContext$1(node_5, parentCtx_3.host));
                    }
                }
                finally {
                    disposeSafe(enumerator_5);
                }
            })(newElement_3);
            patternInput_2_3 = [newElement_3, s_2_3];
        }
        const thisElement_1_3 = patternInput_2_3[0];
        const cs_1_3 = patternInput_2_3[1];
        const arg_2_3 = NodeBuilder$2__get_PreEvalModifiers(thisBuilder_3);
        ((node_1_3) => {
            const enumerator_1_3 = getEnumerator(arg_2_3);
            try {
                while (enumerator_1_3["System.Collections.IEnumerator.MoveNext"]()) {
                    const m_1_3 = enumerator_1_3["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    m_1_3(new NodeModifierContext$1(node_1_3, parentCtx_3.host));
                }
            }
            finally {
                disposeSafe(enumerator_1_3);
            }
        })(thisElement_1_3);
        let thisCtx_3;
        const newCtx_3 = NodeBuilder$2__get_CreateContext(thisBuilder_3)(parentCtx_3.host)(thisElement_1_3);
        thisCtx_3 = (new HostContext$1(parentCtx_3.host, newCtx_3));
        const patternInput_3_3 = v_13(cs_1_3)(thisCtx_3);
        const cv_3 = patternInput_3_3[0];
        const cs_2_3 = patternInput_3_3[1];
        NodeContext$1__RemoveObsoleteChildren(thisCtx_3.ctx);
        const arg_4_3 = NodeBuilder$2__get_PostEvalModifiers(thisBuilder_3);
        ((node_2_3) => {
            const enumerator_2_3 = getEnumerator(arg_4_3);
            try {
                while (enumerator_2_3["System.Collections.IEnumerator.MoveNext"]()) {
                    const m_2_3 = enumerator_2_3["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    m_2_3(new NodeModifierContext$1(node_2_3, parentCtx_3.host));
                }
            }
            finally {
                disposeSafe(enumerator_2_3);
            }
        })(thisElement_1_3);
        const result_3 = cv_3;
        const state_3 = [thisElement_1_3, cs_2_3];
        return [result_3, state_3];
    }));
    return (arg_12) => {
        const clo_1_8 = clo_10(arg_12);
        return clo_1_8;
    };
})()));

VideAppFactory$1__CreateAndStartWithUntypedState_Z6E8691D9(VideApp_ForHost_171AE942(document.getElementById("app")), uncurry2(rootComponent));

