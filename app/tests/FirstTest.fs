module Tests

open Expect
open Expect.Dom
open WebTestRunner

let render _component =
    let container = Container.New()
    Sutil.DOM.mountOn _component container.El |> ignore
    container

describe "Initial board should have" <| fun () ->
    it "Queue column" <| fun () -> promise {
        use sut = render App.app
        sut.El |> Expect.innerText "Queue"
    }
    
//    it "In progress column" <| fun () -> promise {
//        use sut = render App.app
//        sut.El |> Expect.innerText "Hello World from sutil."
//    }
//    
//    it "Done column" <| fun () -> promise {
//        use sut = render App.app
//        sut.El |> Expect.innerText "Hello World from sutil."
//    }