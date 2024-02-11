module HouseAllocation.Views
open Giraffe.ViewEngine
open HouseAllocation.Domain
open HouseAllocation.Dtos

let index (houses: House list)=
    html [] [
        head [] [
            title [] [ str "Giraffe Sample" ]
        ]
        body [] [
            h1 [] [ str "I |> F#" ]
            p [ _class "some-css-class"; _id "someId" ] [
                str "Hello World"
            ]
        ]
    ]


