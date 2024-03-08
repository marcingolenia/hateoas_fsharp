module Tests

open Browser
open Expect
open Expect.Dom
open Fable.Core.Testing
open WebTestRunner

let render _component =
    let container = Container.New()
    Sutil.Program.mount(container.El, _component) |> ignore
    container.El

describe "Initial board should have" <| fun () ->
    it "Queue column" <| fun () -> promise {
        let sut = render App.app
        let button = sut.getByRole("button", "Hello daisy")
        let a =  button.dispatchEvent(Event.Create("Click"))
        Assert.AreEqual(sut.textContent, "Hello daisy")
    }