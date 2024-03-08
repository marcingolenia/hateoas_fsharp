open Vide
open type Html
open Browser

let rootComponent =
    vide {
        let! count = ofMutable {0}
        div.class'("main-view") {
            Home.render count.Value
            button.class'("btn").onclick(fun _ -> count.Value <- count.Value + 1) {
                $"Click me! {count.Value} times"
            }
        }
    }

VideApp.ForHost(document.getElementById "app").CreateAndStartWithUntypedState(rootComponent) |> ignore




    // <h1 className="text-3xl font-bold underline text-center">Hello world!</h1> 
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>