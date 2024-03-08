module App

open Sutil
open Sutil.CoreElements

let app() =
    Html.div [
        Html.button [
            class' "btn"
            text "Hello daisy"
        ]
    ]

app() |> Program.mount
