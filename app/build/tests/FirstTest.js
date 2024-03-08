import { Browser_Types_Element__Element_getByRole_Z384F8060, Expect_Dom_Container__Container_New_Static_6DFDD678 } from "./fable_modules/Fable.Expect.1.1.0/Expect.Dom.fs.js";
import { Program_mount_Z427DD8DF } from "./fable_modules/Sutil.2.0.11/Program.fs.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "./fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { app } from "./src/App.js";
import { assertEqual } from "./fable_modules/fable-library-js.4.14.0/Util.js";
import { promise } from "./fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";

export function render(_component) {
    const container = Expect_Dom_Container__Container_New_Static_6DFDD678();
    Program_mount_Z427DD8DF(container.El, _component);
    return container.El;
}

describe("Initial board should have", () => {
    it("Queue column", () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        const sut = render(app);
        const button = Browser_Types_Element__Element_getByRole_Z384F8060(sut, "button", "Hello daisy");
        const a = button.dispatchEvent(new Event("Click"));
        assertEqual(sut.textContent, "Hello daisy");
        return Promise.resolve();
    })));
});

