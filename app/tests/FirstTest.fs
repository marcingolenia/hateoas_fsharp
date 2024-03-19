module Tests

open Browser
open Expect.Dom
open Fable.Core.Testing
open Fable.Mocha
open WebTestRunner

let render _component =
    let container = Container.New()
    Sutil.Program.mount(container.El, _component) |> ignore
    container.El

describe "Home screen" <| fun () ->
    it "should list available options" <| fun () -> promise {
        // Arrange + Act
        let sut = render (Home.view Home.readOptionsMock) 
        //let button = sut.getByRole("button", "Counter = 0")
        //button.dispatchEvent(Event.Create("click")) |> ignore
        // Assert
        do! Promise.sleep(0)
        sut.getByRole("link", "Show Houses") |> ignore
        //Assert.AreEqual(sut.textContent, "Counter = 1")
    }