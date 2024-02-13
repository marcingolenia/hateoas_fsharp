module HouseAllocation.Views
open Giraffe
open Giraffe.ViewEngine
open HouseAllocation.Domain
open Htmx

let index (houses: House list)=
    html [] [
        head [] [
            title [] [ str "Giraffe Sample" ]
            button [_hxGet "/accommodation/houses/test"; _hxTarget "#TestContainer"] [str "Click me"]
        ]
        body [] [
            h1 [] [ str "I |> F#" ]
            div [_id "TestContainer"] []
            p [ _class "some-css-class"; _id "someId" ] [
                str "Hello World"
            ]
        ]
        script [_src "https://unpkg.com/htmx.org@1.9.10"; _integrity "sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"; _crossorigin "anonymous" ] []
    ]


let test =
    div [] [
        h2 [] [str "Huj"]
    ]