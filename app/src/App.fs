module App

open Sutil
open Sutil.CoreElements

let app =
    let count = Store.make 0
    Html.div [
        Html.button [
            class' "btn"
            Bind.el(count, fun n -> text $"Counter = {n}")
            onClick (fun _ -> count <~= (fun n -> n+1)) []
        ]
        Home.view(Home.readOptions)
    ]
