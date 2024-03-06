open Vide
open type Html
open Browser

let rootComponent =
    vide {
        div.class'("main-view") {
            h1.class'("text-3xl font-bold underline text-center") { "Test" }
            p {
                img.src("https://vide-dev.io/logo-vide.svg").width("150px")
            }
            hr 
            "The whole Vide wookd" 
            button.class'("btn") {"Hello daisy"}
        }
    }

VideApp.ForHost(document.getElementById "app").CreateAndStartWithUntypedState(rootComponent) |> ignore




    // <h1 className="text-3xl font-bold underline text-center">Hello world!</h1> 
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>